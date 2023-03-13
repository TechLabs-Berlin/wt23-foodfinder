from supabase import create_client

url = ""
key = ""

client = create_client(url, key)

# Get all products
stores = client.from_('stores').select('id, store_name, longitude, latitude').execute()

print(stores)
