function applyDistanceFormula(startLat, startLng, endLat, endLng) {
  const R = 6371; // radius Earth

  const dLat = ((endLat - startLat) * Math.PI) / 180;
  const dLon = ((endLng - startLng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((startLat * Math.PI) / 180) *
      Math.cos((endLat * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  return d.toFixed(2);
}

export function getCoordinates(options) {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  );
}

export function calculateDistance() {
  const { latitude, longitude } = getCoordinates();
  let endLat = 52.56;
  let endLng = 13.4;

  const dist = applyDistanceFormula(latitude, longitude, endLat, endLng);
  return dist;
}
