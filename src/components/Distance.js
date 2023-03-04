import { useState, useEffect } from 'react';
import { GetLat, GetLng } from './GetLatLng';

function DistanceCalc() {

  let startLat = GetLat();
  let startLng = GetLng();
  let endLat = 52.56;
  let endLng = 13.4;

  const dist = DistanceFormula(startLat, startLng, endLat, endLng);

  return dist;
}



function DistanceFormula(startLat, startLng, endLat, endLng) {
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    const R = 6371; // radius Earth
    const dLat = (endLat - startLat) * Math.PI / 180;
    const dLon = (endLng - startLng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(startLat * Math.PI / 180) * Math.cos(endLat * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c;

    setDistance(d.toFixed(2));
  }, [startLat, startLng, endLat, endLng]); // second argument - run at initial render + run after every re-render if data has changed

  return (
      distance
  )
}


export { DistanceCalc, DistanceFormula };
