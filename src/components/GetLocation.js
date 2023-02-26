import { useState, useEffect } from 'react';


function GetLocation() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        // check if geolocation is allowed
        if ('geolocation' in window.navigator) {
          // get user's position
          window.navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
          });
        } else {
          throw new Error('Geolocation is not supported.');
        }
      } catch (error) {
        console.error(error);
        setLocation({ error: error.message });
      }
    };

    fetch();
  }, []);

  return (
    location,
    console.log(location)
    
  )
};

export default GetLocation;