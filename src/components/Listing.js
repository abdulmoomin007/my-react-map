import { markers } from "../utils/CustomMap";

import "./Listing.css";

const Listing = ({ list }) => {
  let render = list.map((item, i) => (
    <tr
      key={i}
      onClick={() => {
        window.google.maps.event.trigger(markers[i], "click");
      }}
    >
      <td className="row">
        <div>
          <h3>
            {item.firstName} {item.lastName}
          </h3>
          <div>{item.mobile}</div>
          <div>{item.address}</div>
          <div>{item.status}</div>
        </div>
        <img src={item.image} alt={item.firstName} />
      </td>
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
