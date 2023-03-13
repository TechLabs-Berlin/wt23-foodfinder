import { createClient } from '@supabase/supabase-js'

const client = createClient('´', '')

async function getStores() {
  const response = await client.from('stores').select('id, store_name, longitude, latitude')
  return response.data
}

// example usage:
const stores = await getStores()
console.log(stores)
