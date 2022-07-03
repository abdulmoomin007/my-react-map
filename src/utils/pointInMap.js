import points from "../dev-data/points";
import getDistance from "./getDistance";

let markers = [];

function pointInMap(ref, lat, lng, infoRef, setCoords, setList) {
  markers.forEach((marker) => {
    marker.setMap(null);
  });
  markers = [];
  const currentLocation = { lat, lng };
  // The map, centered at currentLocation
  const map = new window.google.maps.Map(ref, {
    zoom: 13,
    center: currentLocation,
    mapTypeControl: false,
    panControl: false,
    zoomControl: false,
    streetViewControl: false,
  });

  setList([]);

  points.forEach((point) => {
    const distance = getDistance(currentLocation, point);

    if (distance < 0.04) {
      setList((list) => [...list, point]);
      markers.push(
        new window.google.maps.Marker({
          position: point,
          map: map,
          animation: window.google.maps.Animation.DROP,
        })
      );
      const index = markers.length - 1;
      window.google.maps.event.addListener(
        markers[index],
        "click",
        handleMarkerClick(map, point, infoRef, setCoords)
      );
    }
  });

  // The marker, positioned at currentLocation
  setList((list) => [...list, currentLocation]);
  markers.push(
    new window.google.maps.Marker({
      position: currentLocation,
      map: map,
      animation: window.google.maps.Animation.DROP,
    })
  );
  window.google.maps.event.addListener(
    markers[markers.length - 1],
    "click",
    handleMarkerClick(map, currentLocation, infoRef, setCoords)
  );
}

const handleMarkerClick = (map, point, infoRef, setCoords) => {
  return function () {
    const marker = this;
    const infoWindow = new window.google.maps.InfoWindow({
      content: infoRef.current,
    });
    setCoords(point);
    infoWindow.open(map, marker);
  };
};

export default pointInMap;

export { markers };
