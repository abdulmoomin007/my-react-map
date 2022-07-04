import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import CustomMap from "../utils/CustomMap";
import Listing from "./Listing";

import "./Map.css";

export default function Map({ center, zoom }) {
  const [pinCode, setPinCode] = useState("");
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [list, setList] = useState([]);

  const mapRef = useRef();
  const infoRef = useRef();
  const inputRef = useRef();

  const [lat, setLat] = useState(center.lat);
  const [lng, setLng] = useState(center.lng);

  const map = useMemo(() => {
    return new CustomMap(
      { mapRef, infoRef, inputRef },
      { lat, lng },
      { setList, setCoords },
      window.google.maps
    );
  }, [lat, lng]);

  useEffect(() => {
    const init = async function () {
      const [lati, lngi] = await map.getCurrentLatLng();
      setLat(lati);
      setLng(lngi);
    };
    init();
    map.pointInMap();
  }, [map]);

  return (
    <Fragment>
      <form>
        <label>Pin Code: </label>
        <input
          type="text"
          value={pinCode}
          ref={inputRef}
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
            let [lati, lngi] = await map.pointToAddress();
            map.coords.lat = lati;
            map.coords.lng = lngi;
            map.pointInMap();
          }}
        />
      </form>
      <div className="container">
        <div ref={mapRef} id="map"></div>
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
