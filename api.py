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

    # Retrieve the stores from the Supabase table
    stores = client.from_('stores').select('store_id, store_name, longitude, latitude').execute()

    # Get the data from the APIResponse object
    stores_data = stores.data

    # Calculate the distance from the provided coordinates to each store
    nearby_stores = []
    for store in stores_data:
        distance = applyDistanceFormula(lat, lng, store['latitude'], store['longitude'])
        if distance <= radius:
            store['distance'] = distance
            nearby_stores.append(store)

    # Sort the nearby stores by distance
    nearby_stores.sort(key=lambda x: x['distance'])

    return jsonify(nearby_stores)

@app.route('/')
def index():
    # A welcome message to test our server
    return "<h1>Welcome to the foodfinder-api!</h1>"


if __name__ == '__main__':
    # Threaded option to enable multiple instances for multiple user access support
    app.run(threaded=True, port=5000)