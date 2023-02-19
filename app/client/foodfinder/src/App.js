import React from 'react';
import Maps from './components/Maps';
import UserLoc from './components/Geolocation';


const App = () => {
    return (
    <div>
        <Maps/>
        <UserLoc />
    </div>
    );
};

export default App;