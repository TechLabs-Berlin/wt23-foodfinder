from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client
import math
import os
import requests

app = Flask(__name__)
CORS(app)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

client = create_client(SUPABASE_URL, SUPABASE_KEY)

@app.route('/products/', methods=['GET'])
def respond():
    product_name = request.args.get("product_name", None)

    print(f"Received: {product_name}")

    url = f"https://de.openfoodfacts.org/cgi/search.pl?action=process&json=true&search_terms={product_name}"
    api_response = requests.get(url)

    return jsonify(api_response.json())

@app.route('/available-products/', methods=['GET'])
def get_available_products():
    product_name = request.args.get('product_name')

    query_result = (
        client.from_("product_availability_table")
        .select("product_name, quantity, stores:store_id(store_name, longitude, latitude)")
        .filter("product_name", "ilike", f"%{product_name}%")
        .filter("quantity", "gt", 0)
        .execute()
    )

    return jsonify(query_result.data)

@app.route('/all-stores/', methods=['GET'])
def get_stores():
    stores = client.from_('stores').select('store_id, store_name, longitude, latitude').execute()
    return jsonify(stores.data)

# Function to calculate distance between two coordinates in km
def applyDistanceFormula(startLat, startLng, endLat, endLng):
    R = 6371

    dLat = math.radians(endLat - startLat)
    dLon = math.radians(endLng - startLng)
    lat1 = math.radians(startLat)
    lat2 = math.radians(endLat)

    a = math.sin(dLat / 2) * math.sin(dLat / 2) + \
        math.sin(dLon / 2) * math.sin(dLon / 2) * math.cos(lat1) * math.cos(lat2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    distance = R * c

    return round(distance, 2)

@app.route('/stores/', methods=['GET'])
def get_nearby_stores():

    lat = float(request.args.get('lat'))
    lng = float(request.args.get('lng'))
    radius = float(request.args.get('radius'))

    stores = client.from_('stores').select('store_id, store_name, longitude, latitude').execute()

    stores_data = stores.data

    nearby_stores = []
    for store in stores_data:
        distance = applyDistanceFormula(lat, lng, store['latitude'], store['longitude'])
        if distance <= radius:
            store['distance'] = distance
            nearby_stores.append(store)

    nearby_stores.sort(key=lambda x: x['distance'])

    return jsonify(nearby_stores)

@app.route('/stores-with-products/', methods=['GET'])
def get_stores_with_products():
    lat = float(request.args.get('lat'))
    lng = float(request.args.get('lng'))
    radius = float(request.args.get('radius'))
    product_code = request.args.get('product_code', None)
    product_name = request.args.get('product_name', None)

    stores = client.from_('stores').select('store_id, store_name, longitude, latitude').execute()
    stores_data = stores.data

    nearby_stores = []
    for store in stores_data:
        distance = applyDistanceFormula(lat, lng, store['latitude'], store['longitude'])
        if distance <= radius:
            store['distance'] = distance
            store['products'] = []
            nearby_stores.append(store)

    if product_code:
        query_result = (
            client.from_("product_availability_table")
            .select("store_id, product_code, product_name, quantity, brand, category, description")
            .filter("product_code", "eq", product_code)
            .execute()
        )
        if not query_result.data and product_name:
            query_result = (
                client.from_("product_availability_table")
                .select("store_id, product_code, product_name, quantity, brand, category, description")
                .filter("product_name", "ilike", f"%{product_name}%")
                .execute()
            )
    else:
        query_result = (
            client.from_("product_availability_table")
            .select("store_id, product_code, product_name, quantity, brand, category, description")
            .filter("product_name", "ilike", f"%{product_name}%")
            .execute()
        )

    products_data = query_result.data

    for product in products_data:
        for store in nearby_stores:
            if store['store_id'] == product['store_id']:
                store['products'].append(product)
                break

    return jsonify(nearby_stores)


@app.route('/stores-with-all-products/', methods=['GET'])
def get_stores_with_all_products():
    lat = float(request.args.get('lat'))
    lng = float(request.args.get('lng'))
    radius = float(request.args.get('radius'))

    query_result = (
        client.from_("stores")
        .select(
            "store_id, store_name, longitude, latitude, "
            "product_availability:store_id("
            "product_code, product_name, quantity, brand, category, description)"
        )
        .execute()
    )

    stores_data = query_result.data

    nearby_stores = []
    for store in stores_data:
        distance = applyDistanceFormula(lat, lng, store['latitude'], store['longitude'])
        if distance <= radius:
            store['distance'] = distance
            nearby_stores.append(store)

    nearby_stores.sort(key=lambda x: x['distance'])

    return jsonify(nearby_stores)

@app.route('/update-quantity/', methods=['POST'])
def update_quantity():
    store_id = request.args.get('store_id')
    product_code = request.args.get('product_code')
    new_quantity = request.args.get('new_quantity')

    if store_id and product_code and new_quantity is not None:
        product_exists = client.from_("product_availability_table") \
            .select("product_code") \
            .filter("store_id", "eq", store_id) \
            .filter("product_code", "eq", product_code) \
            .execute()

        if len(product_exists.data) > 0:
            client.from_("product_availability_table") \
                .update({"quantity": new_quantity}) \
                .filter("store_id", "eq", store_id) \
                .filter("product_code", "eq", product_code) \
                .execute()
            return "Quantity updated successfully!", 200
        else:
            client.from_("product_availability_table") \
                .insert({"store_id": store_id, "product_code": product_code, "quantity": new_quantity}) \
                .execute()
            return "New entry created successfully!", 200
    else:
        return "Error: store_id, product_code, and new_quantity are required.", 400

@app.route('/')
def index():
    # A welcome message to test our server
    return "<h1>Welcome to the foodfinder-api!</h1>"


if __name__ == '__main__':
    app.run(threaded=True, port=5000)
