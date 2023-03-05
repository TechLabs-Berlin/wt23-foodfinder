import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("secrets/foodfinder-wt23-e1ae21c1954e.json")
firebase_admin.initialize_app(cred)

# connecting to firestore
db = firestore.client()

# Define the collections and their fields
stores_ref = db.collection(u'stores')
store_products_ref = db.collection(u'store_products')
user_products_ref = db.collection(u'user_products')
website_products_ref = db.collection(u'website_products')

# Create indexes for the product_id fields in store_products, user_products, and website_products
store_products_ref.document(u'index_product_id').set({u'__collection__': u'store_products', u'__key__': u'product_id'})
user_products_ref.document(u'index_product_id').set({u'__collection__': u'user_products', u'__key__': u'product_id'})
website_products_ref.document(u'index_product_id').set({u'__collection__': u'website_products', u'__key__': u'product_id'})

# Add documents to the stores collection
stores_ref.add({
    u'google_maps_url': u'string',
    u'store_name': u'Example Store',
    u'address': u'123 Main St',
    u'city': u'Anytown',
    u'state': u'CA',
    u'zip': u'12345',
    u'phone': u'555-123-4567',
    u'hours': {
        u'Monday': u'9am-5pm',
        u'Tuesday': u'9am-5pm',
        u'Wednesday': u'9am-5pm',
        u'Thursday': u'9am-5pm',
        u'Friday': u'9am-5pm',
        u'Saturday': u'10am-2pm',
        u'Sunday': u'Closed'
    },
    u'location': firestore.GeoPoint(37.7749, -122.4194)
})

# Add documents to the store_products collection
store_products_ref.add({
    u'google_maps_url': u'string',
    u'store_name': u'Example Store',
    u'name': u'Example Product',
    u'brand': u'Example Brand',
    u'category': u'Example Category',
    u'description': u'This is an example product.',
    u'image_url': u'https://example.com/product.jpg',
    u'upc': u'123456789012'
})

# Add documents to the user_products collection
user_products_ref.add({
    u'product_id': store_products_ref.document().id,
    u'store_id': stores_ref.document().id,
    u'google_maps_url': u'9999999999',
    u'available': True,
    u'price': 9.99,
    u'quantity': 10,
    u'updated_at': firestore.SERVER_TIMESTAMP,
    u'updated_by': u'user123'
})

# Add documents to the website_products collection
website_products_ref.add({
    u'product_id': store_products_ref.document().id,
    u'store_name': u'Example Store',
    u'website_url': u'https://www.example.com/product',
    u'available': True,
    u'price': 7.99,
    u'updated_at': firestore.SERVER_TIMESTAMP,
    u'updated_by': u'user456'
})




