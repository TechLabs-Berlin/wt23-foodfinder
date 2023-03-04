import { useState, useEffect } from 'react';


function GetLat() {
  const [lat, setLat] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        // Check if geolocation is supported
        if ('geolocation' in window.navigator) {
          // get user's position
          window.navigator.geolocation.getCurrentPosition((position) => {
            const {latitude} = position.coords;
            setLat(latitude);
          });
        } else {
          throw new Error('Geolocation is not supported.');
        }
      } catch (error) {
        console.error(error);
        setLat({ error: error.message });
      }
    };

    fetch();
  }, []);

  return lat
};


function GetLng() {
  const [lng, setLng] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        // Check if geolocation is supported
        if ('geolocation' in window.navigator) {
          // get user's position
          window.navigator.geolocation.getCurrentPosition((position) => {
            const {longitude} = position.coords;
            setLng(longitude);
          });
        } else {
          throw new Error('Geolocation is not supported.');
        }
      } catch (error) {
        console.error(error);
        setLng({ error: error.message });
      }
    };

    fetch();
  }, []);

  return (
    lng
  )
};

export default GetLng;

export { GetLat, GetLng };