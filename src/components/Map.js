import React, { Fragment, useEffect, useRef, useState } from "react";
import getCurrentLatLng from "../utils/getCurrentLatLng";
import pointInMap from "../utils/pointInMap";
import pointToAddress from "../utils/pointToAddress";
import Listing from "./Listing";

import "./Map.css";

export default function Map({ center, zoom }) {
  const [pinCode, setPinCode] = useState("");
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [list, setList] = useState([]);

  const ref = useRef();
  const infoRef = useRef();
  const [lat, setLat] = useState(center.lat);
  const [lng, setLng] = useState(center.lng);

  useEffect(function () {
    (async function () {
      const [lati, lngi] = await getCurrentLatLng();
      setLat(lati);
      setLng(lngi);
    })();
  }, []);

  useEffect(() => {
    pointInMap(ref.current, lat, lng, infoRef, setCoords, setList);
  }, [lat, lng, zoom]);

  return (
    <Fragment>
      <form>
        <label>Pin Code: </label>
        <input
          type="text"
          value={pinCode}
          id="zipCode"
          onChange={(e) => {
            setPinCode(e.target.value);
          }}
        />
        <input
          type={"submit"}
          value={"Go"}
          onClick={async (event) => {
            event.preventDefault();
            let [lati, lngi] = await pointToAddress(event);
            pointInMap(ref.current, lati, lngi, infoRef, setCoords, setList);
          }}
        />
      </form>
      <div className="container">
        <div ref={ref} id="map"></div>
        <Listing list={list} />
      </div>
      <div style={{ display: "none" }}>
        <div id="info-content" ref={infoRef}>
          <table>
            <tbody>
              <tr id="iw-coord-row" className="iw_table_row">
                <td id="iw-lat-attribute">Lat: </td>
                <td id="iw-lat">{coords.lat}</td>
              </tr>
              <tr id="iw-coord-row" className="iw_table_row">
                <td id="iw-lng-attribute">Lng: </td>
                <td id="iw-lng">{coords.lng}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
}
