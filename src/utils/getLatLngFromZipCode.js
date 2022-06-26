async function getLatLngFromZipCode(zipCode) {
  let geocoder = new window.google.maps.Geocoder();
  let [lat, lng] = [0, 0];
  await geocoder.geocode({ address: zipCode }, function (results, status) {
    if (status === window.google.maps.GeocoderStatus.OK) {
      lat = results[0].geometry.location.lat();
      lng = results[0].geometry.location.lng();
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
  return [lat, lng];
}

export default getLatLngFromZipCode;
