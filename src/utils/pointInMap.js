function pointInMap(ref, lat, lng) {
  const currentLocation = { lat, lng };
  // The map, centered at currentLocation
  const map = new window.google.maps.Map(ref, {
    zoom: 10,
    center: currentLocation,
  });
  // The marker, positioned at currentLocation
  new window.google.maps.Marker({
    position: currentLocation,
    map: map,
  });
}

export default pointInMap;
