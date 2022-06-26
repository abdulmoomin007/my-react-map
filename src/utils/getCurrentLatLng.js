function getCurrentLatLng() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        resolve([lat, lng]);
      },
      function (err) {
        alert("Error! ", err);
        reject([0, 0]);
      }
    );
  });
}

export default getCurrentLatLng;
