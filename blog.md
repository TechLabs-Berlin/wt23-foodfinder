<p align="center">
  <img src="https://i.ibb.co/C0FgRXb/Bildschirmfoto-2023-02-18-um-10-55-14-removebg-preview.png" border="0">
</p>

<p align="center">
<p align="center">_______________</p>
</p>

<h5 align="center">
  <a href="#About">About</a>  |
  <a href="#Background">Background</a>  |
  <a href="#UX">UX</a>  |
  <a href="#WD">WD</a>  |
  <a href="#DS">DS</a>  |
  <a href="#Conclusion">Conclusion</a>  |
  <a href="#Deployment">Deployment</a>
</h5>

## About

**Introducing the FoodFinder APP: A Quick and Accurate Way to Find Suitable Products in Your Neighborhood**

Are you tired of spending hours searching for suitable products that meet your dietary restrictions? The FoodFinder APP is here to help! Designed to save you time and effort, the FoodFinder Mobile APP is a straightforward way to find products suitable for your needs as close to you as possible.

Food is an essential aspect of our lives that provides us with the necessary nutrients and energy to function. However, for many individuals with dietary restrictions, finding suitable food options can be a significant challenge. At FoodFinder, we understand this struggle and aim to provide a solution for people with special dietary needs, whether transitioning to veganism or cutting out specific foods from their diets.

Our app lets you search for specific products and displays nearby stores that stock those products.

Furthermore, FoodFinder is continually being updated with new products and stores, so you can rest assured that you'll never run out of options. We understand the importance of having access to a wide range of food choices that align with your dietary restrictions, and that's precisely what FoodFinder aims to provide.

## Background

The FoodFinder APP was developed to address the problem faced by grocery shoppers with dietary restrictions who need a quick and accurate way to find suitable products in their neighborhood. To create the app, we used a tech stack that includes Python, Postgres, SQL, Flask, Heroku, Figma, Miro, Canva, HTML, CSS, JavaScript, React JS, Ionic, and backend Supabase. We also used FoodFinder API and Open Food Facts API to ensure that the app provides up-to-date product information, and Google Maps API to display the locations of stores. 

Features and Benefits:

The FoodFinder APP is designed to make your life easier. Here are some of its key features:
- Store locator: The app automatically retrieves your current location and shows the shops near you.
- Up-to-date product information: The app uses FoodFinder API and Open Food Facts API to ensure that product information is accurate and up-to-date.
- Up-to-date availability information: Thanks to information provided by users, the expected availability of products is updated in real time.
- Time-saving: The app saves you time and effort by providing a quick and accurate way to find suitable products in your neighborhood.

## UX

FoodFinder began as an app to aid those with gluten intolerance and celiac disease. However, we soon realized the necessity to accommodate other dietary restrictions and expanded the app's scope. Further research was conducted on lactose intolerance, allergies, and other dietary needs to add relevant features. 

<p>
 <img src="https://github.com/TechLabs-Berlin/wt23-foodfinder/blob/main/UX/User%20personas%201.png?raw=true" border="0" width="49%">  <img src="https://github.com/TechLabs-Berlin/wt23-foodfinder/blob/main/UX/User%20personas%202.png?raw=true" border="0" width="49%" align="right">
 </p>

Based on this two user personas were created—people who shop for themselves and people who buy it for others, for example, their children. A user journey to map out their pain points and emotions was also developed. Our team worked together on Miro to collaborate and share ideas and we worked on Figma for the wireframes and the prototype of the app which was shared with users for testing. We agreed on creating a simple interface, a happy chosen path that would allow users to fulfill the task of 'find a product near me'. This would help avoid clutter and highlight our two main features the product search and location map. 

Users were then asked to test out a flow like—doing a product search, getting a list of products, choosing one, going to the map, selecting a store, and providing feedback on availability. Users recorded themselves and shared problem areas like transitions, interactions, ability to complete tasks, etc. The feedback helped our team to make it flow even more smoothly. As the only UX person, it was challenging for me to know for sure whether I was headed in the right direction. But thanks to my team, track lead, and study buddies the project was successfully completed. 

<p align="center">
<img src ="https://user-images.githubusercontent.com/117666676/230608463-7d9a2c92-60f8-4f27-8bbb-21738f107ef3.png" width="50%">
</p>
<p align="center">
<img src="https://user-images.githubusercontent.com/117666676/230608559-c2c1b76d-7965-45b9-ae03-7201667055c4.png" width="50%">
</p>
<p align="center">                                                                                                                 
<img src="https://user-images.githubusercontent.com/117666676/230608577-eb534ebe-1d0d-4e22-bbaa-7fc9e0845b74.png" width="50%">
</p>

https://user-images.githubusercontent.com/117666676/230608294-e1136112-4ef1-44fc-acfc-c7d687a49190.mov

## WD

After several Product sessions and mentor recommendations, we decided to utilize the Ionic framework, which allowed us to swiftly develop a functional three-tab mobile app. By implementing this routing structure, we were able to effectively develop and showcase independently the two main features of the app, namely the food search and locations map.

To pass the products from the first tab (search) to the third tab (profile), we employed React's context and local storage. This enabled users to save and access quickly to frequently purchased products and lays the groundwork for a potential shopping list feature in the future.

To fulfill the main user task: “Find a product near to you.” we still needed to showcase availability from the product search in the map without changing tabs. For this stack navigation was implemented. Clicking on a product prompts a new window with the map view. 


After the map is loaded, our system initiates an API call to the FoodFinder API to retrieve a list of stores located within the specified by the user range. The map is then automatically centered on the user's current location, which is obtained through the Navigator.geolocation property. To visually represent the maximal range of the selected area, a circle is displayed on the map. The radius of the circle and the map’s zoom value automatically adjusts based on the user's updates to the maximum distance using the slider. 

In order to help users to locate their desired product quickly, markers are placed on the map with distinct color codes. The color green indicates that the product is highly likely to be available,  yellow - the availability is probable, red - low availability prediction, gray - no available data for the searched product.

After clicking on a marker, users are directed to a feedback screen where they can report whether the searched product was available in the store and provide an estimated quantity. The feedback screen contains three buttons that allow users to quickly and easily report their findings. All reported availability data is transmitted to our database via the API using the HTTP "POST" method.

To ensure accurate data collection, we have assigned values to the reported quantities: “no product” has a value of 0, "some" has a value of 5, and "many" has a value of 10. The API call passes the reported quantity, product ID, and store ID, allowing us to collect and analyze the data.

In addition, we have decided to include an option to display store locations without requiring the selection of a specific product. This feature can be found in the "Stores" tab and allows users to view all available stores, regardless of product availability.
The page provides store location information and details about store opening hours. This information is currently a mockup, and we are considering it a potential future development with real data.

## DS

DATA

To ensure data consistency, we choose appropriate data types for each field and normalize the schema to reduce redundancy. We also created relationships between tables to enable efficient querying and data retrieval.
To test the functionality of our database, we generated sample data that reflected the structure of the schema and used a database management system from Supabase to create the tables and fill them with data. After that, we tested the data retrieval functionality to ensure it was working as expected.

Additionally, we created another dataset containing information about products including name, brand, and labels. We extracted the above mentioned information about the products available at the supermarkets in our dataset as well as some other products by popular bio product brands from the Open Food Facts database https://world.openfoodfacts.org/ and added it to the dataset. Then, we generated some dummy data on availability of those products in stores from the first dataset to apply it for training of the machine learning algorithm. 


We built an API that provides endpoints to access data, including searching for products, discovering available products in stores, and retrieving information about nearby stores.

MODEL

We engaged in brainstorming sessions to determine which machine learning model would be useful for our project. After consulting with some data science mentors from TechLabs, we decided to use the Prophet framework to predict product availability and implement a recommendation system based on content:

Recommendation Model:

Our recommendation model uses a content-based approach that compares the textual features of products such as name, brand, category, and description to identify their similarity. When a desired product is not available, the model recommends the most similar product. However, the model only considers textual features and may not capture all relevant aspects of product similarity, such as price or customer reviews.

For more information on our approach and the implementation of our recommendation system,please refer to the provided link: https://github.com/TechLabs-Berlin/wt23-foodfinder/blob/data-science/data-science/machine-learning/recommendation_system/Product_Recommender_System.ipynb

Availability Prediction Model:

At first, we struggled to find a forecast algorithm because none of them seemed suitable for our goal. However, after the discussion with TechLabs’ mentors, we opted for the forecasting tool by Facebook, Prophet. It forecasts time series data based on an additive regression model where non-linear trends are fit with yearly, weekly, and daily seasonality, plus holiday effects. Prophet was chosen since it provides a reliable forecast even having a reasonable number of missing observations and trends that are nonlinear growth curves, which was the case for us.

By applying it for our purposes, we made it predict the availability for the next 6 months based on the availability data from last year. Based on the forecast number of items available, it returns the answer 'None', 'Few', 'Some', or 'Many'. Although we do keep in mind that it is not possible to obtain this amount of data for one certain product in a particular store, this still would be the best way to demonstrate how availability prediction would work in the best case scenario.

For more information on the implementation of the prediction model, please refer to the provided link:
https://github.com/TechLabs-Berlin/wt23-foodfinder/tree/data-science/data-science/machine-learning/availability_prediction_model

HOSTING

We hosted our data in Supabase and built the backend using Flask to create an API that was deployed on Heroku. This allowed the Web Development Team to access our endpoints. Our API has six endpoints that include searching for products on OpenFoodFacts, retrieving available products and store details, and finding nearby stores based on latitude, longitude, and radius. We also had an endpoint for updating the quantity of a specific product in a store. Our API was built to efficiently retrieve data and provide useful information to users.
For further details on the API, please refer to the following GitHub page: https://github.com/TechLabs-Berlin/wt23-foodfinder/tree/api


## Conclusion

We are happy that we managed to incorporate most of what we set out for our MVP—a web app integrated with a geolocation-based map where users can search for products from a database with the results filtered according to the user's proximity along with the ability to collect data. A useful resource for future development. We worked and learned so much together as a team and the project phase helped us apply the theory and accelerated our learning as individuals. 


In conclusion, FoodFinder is the perfect solution for people with special dietary needs. With our user-friendly app, finding suitable products has never been easier. So if you're looking to transition to a vegan diet or cutting out specific foods, give FoodFinder a try, and let us make your journey a little less daunting.

## Deployment

FoodFinder is deployed on Vercel:

https://wt23-foodfinder-4bb6qf3gc-foodfinder-test.vercel.app/

