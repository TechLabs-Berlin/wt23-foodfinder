import React from 'react';
import MaxDistance from './MaxDistance';

function StoreFilter() {
let stores = require('./dataStores.json');
console.log(stores[0].name);

return (
    <div>{stores[0].name}</div>
)
}
/*const StoreFilter = stores.map((product, index) => {
    return <ProductItem product={product} key={index} />;
}); */



export default StoreFilter;