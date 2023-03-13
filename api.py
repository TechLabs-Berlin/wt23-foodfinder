from flask import Flask, request, jsonify
from supabase import create_client
import requests

app = Flask(__name__)

SUPABASE_URL = ""
SUPABASE_KEY = ""

client = create_client(SUPABASE_URL, SUPABASE_KEY)


@app.route('/products/', methods=['GET'])
def respond():
    # Retrieve the name from the url parameter /getmsg/?name=
    product_name = request.args.get("product_name", None)

    # For debugging
    print(f"Received: {product_name}")

    url = f"https://de.openfoodfacts.org/cgi/search.pl?action=process&json=true&search_terms={product_name}"
    api_response = requests.get(url)

    # Return the response in json format
    return jsonify(api_response.json())


@app.route('/stores/', methods=['GET'])
def get_stores():
    stores = client.from_('stores').select('id, store_name, longitude, latitude').execute()
    return jsonify(stores.data)


@app.route('/')
def index():
    # A welcome message to test our server
    return "<h1>Welcome to the foodfinder-api!</h1>"


if __name__ == '__main__':
    # Threaded option to enable multiple instances for multiple user access support
    app.run(threaded=True, port=5000)