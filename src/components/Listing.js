import { markers } from "../utils/pointInMap";

const Listing = ({ list }) => {
  let render = list.map((item, i) => (
    <tr
      key={i}
      onClick={() => {
        window.google.maps.event.trigger(markers[i], "click");
      }}
    >
      <td>Lat: {item.lat}</td>
      <td>Lng: {item.lng}</td>
    </tr>
  ));
  return (
    <div id="listing">
      <table id="resultsTable">
        <tbody id="results">{render}</tbody>
      </table>
    </div>
  );
};

export default Listing;
