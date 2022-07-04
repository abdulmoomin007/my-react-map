import points from "../dev-data/points";

let markers = [];

class CustomMap {
  constructor(refs, coords, methods, maps) {
    this.refs = refs;
    this.coords = coords;
    this.methods = methods;
    this.maps = maps;
    this.infoWindow = new this.maps.InfoWindow({
      content: this.refs.infoRef.current,
    });
  }

  getCurrentLatLng() {
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

  getDistance({ lat: x1, lng: y1 }, { lat: x2, lng: y2 }) {
    const a = x1 - x2;
    const b = y1 - y2;
    return Math.sqrt(a * a + b * b);
  }

  async getLatLngFromZipCode(zipCode) {
    let geocoder = new this.maps.Geocoder();
    let [lat, lng] = [0, 0];
    await geocoder.geocode({ address: zipCode }, (results, status) => {
      if (status === this.maps.GeocoderStatus.OK) {
        lat = results[0].geometry.location.lat();
        lng = results[0].geometry.location.lng();
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
    return [lat, lng];
  }

  async pointToAddress() {
    const zipCode = this.refs.inputRef.current.value;
    const [lat, lng] = await this.getLatLngFromZipCode(zipCode);
    return [lat, lng];
  }

  pointInMap() {
    this.clearMarkers();

    const currentLocation = this.coords;
    // The map, centered at currentLocation
    const map = new this.maps.Map(this.refs.mapRef.current, {
      zoom: 13,
      center: currentLocation,
      mapTypeControl: false,
      panControl: false,
      zoomControl: false,
      streetViewControl: false,
    });

    this.methods.setList([]);

    points.forEach((point) => {
      const distance = this.getDistance(currentLocation, point);

      if (distance < 0.04) {
        this.methods.setList((list) => [...list, point]);

        markers.push(
          new this.maps.Marker({
            position: point,
            map: map,
            animation: this.maps.Animation.DROP,
          })
        );

        const index = markers.length - 1;
        this.maps.event.addListener(
          markers[index],
          "click",
          this.handleMarkerClick(map, point)
        );
      }
    });

    // The marker, positioned at currentLocation
    this.methods.setList((list) => [...list, currentLocation]);
    markers.push(
      new this.maps.Marker({
        position: currentLocation,
        map: map,
        animation: this.maps.Animation.DROP,
      })
    );

    this.maps.event.addListener(
      markers[markers.length - 1],
      "click",
      this.handleMarkerClick(map, currentLocation)
    );
  }

  handleMarkerClick = (map, point) => {
    const { setCoords } = this.methods;
    const infoWindow = this.infoWindow;
    return function () {
      const marker = this;
      setCoords(point);
      infoWindow.open(map, marker);
    };
  };

  clearMarkers() {
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];
  }
}

export default CustomMap;
export { markers };
