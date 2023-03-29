<p align="center">
  <img src="https://i.ibb.co/C0FgRXb/Bildschirmfoto-2023-02-18-um-10-55-14-removebg-preview.png" border="0">
</p>

<p align="center">
<p align="center">_______________</p>
</p>

<h5 align="center">
  <a href="#How it works">The Foodfinder API</a> 
</h5>

## Food Finder API

This API allows you to search for products, find available products in stores, and get nearby store information.

### Routes

1. **/products/** (GET): Search for products on the OpenFoodFacts API based on a given product name.

Live URL: https://foodfinderapi.herokuapp.com/products?product_name=fusilli

Local URL: http://localhost:5000/products?product_name=fusilli

2. **/available-products/** (GET): Retrieve available products from the 'product_availability_table' based on a given product name. It also returns the store details where the product is available.

Live URL: https://foodfinderapi.herokuapp.com/available-products?product_name=fusilli

Local URL: http://localhost:5000/available-products?product_name=fusilli

3. **/all-stores/** (GET): Retrieve all the stores from the 'stores' table, including their store ID, store name, longitude, and latitude.

Live URL: https://foodfinderapi.herokuapp.com/all-stores

Local URL: http://localhost:5000/all-stores

4. **/stores/** (GET): Retrieve nearby stores based on the provided latitude, longitude, and radius. It calculates the distance from the provided coordinates to each store and returns the stores within the specified radius.

Live URL: https://foodfinderapi.herokuapp.com/stores/?lat=52.520008&lng=13.404954&radius=3

Local URL: http://localhost:5000/stores?lat=48.1351&lng=11.5820&radius=5

5. **/stores-with-products/** (GET): Retrieve nearby stores based on the provided latitude, longitude, and radius, along with available products matching the given product code or product name. If the product code is not found, it will search for the product name. Stores within the specified radius will be returned, and the available products will be added to the corresponding stores.

Live URL:  https://foodfinderapi.herokuapp.com/stores-with-products/?lat=52.520008&lng=13.404954&radius=100&product_code=1234565787&product_name=Hafer

Local URL: http://localhost:5000/stores-with-products/?lat=52.520008&lng=13.404954&radius=100&product_code=1234565787&product_name=Hafer

6. **/stores-with-all-products/** (GET): Retrieve nearby stores based on the provided latitude, longitude, and radius, along with all available products in each store. Stores within the specified radius will be returned, and the available products will be added to the corresponding stores.
Example:

Live URL: https://foodfinderapi.herokuapp.com/stores-with-all-products/?lat=52.520008&lng=13.404954&radius=3

Local URL: http://localhost:5000/stores-with-all-products?lat=52.520008&lng=13.404954&radius=3

7. **/update-quantity/** (POST): Update the quantity of a specific product in a specific store. Provide the store_id, product_code, and the new_quantity as parameters.
Example:

Live URL: https://foodfinderapi.herokuapp.com/update-quantity?store_id=1&product_code=123456789&new_quantity=10

Local URL: http://localhost:5000/update-quantity?store_id=1&product_code=123456789&new_quantity=10

8. **/** (GET): A welcome message to test the server and ensure it is running.

Live URL: https://foodfinderapi.herokuapp.com/

Local URL: http://localhost:5000/

Please note that you need to replace `localhost` with the appropriate host (and port number, if different) when deploying the API on a server or hosting platform.
