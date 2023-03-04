// TODO: Replace the hard-coded data with data from the API
const stores = [
  {
    id: "ID of FIrst Place",
    name: "Store 1",
    lat: 40.756795,
    lng: -73.954298,
  },
  {
    id: "ID of Second Place",
    name: "Store 2",
    lat: 40.753167,
    lng: -73.96812,
  },
];

function StoreFilter() {
  console.log(stores[0].name);
  return <div>{stores[0].name}</div>;
}

/*const StoreFilter = stores.map((product, index) => {
    return <ProductItem product={product} key={index} />;
}); */

export default StoreFilter;
