import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import CustomMap from "../utils/CustomMap";
import Listing from "./Listing";

import "./Map.css";

export default function Map({ center, zoom }) {
  const [pinCode, setPinCode] = useState("");
  const [customerData, setCustomerData] = useState({
    lat: null,
    lng: null,
    firstName: "",
    lastName: "",
    status: "",
    address: "",
    mobile: "",
    starRating: "",
    image: "",
  });
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
      { setList, setCustomerData },
      window.google.maps,
      zoom
    );
  }, [lat, lng, zoom]);

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
                <th id="iw-lat-attribute">Name: </th>
                <td id="iw-lat">
                  {customerData.firstName} {customerData.lastName}
                </td>
              </tr>
              <tr id="iw-coord-row" className="iw_table_row">
                <th id="iw-lng-attribute">Address: </th>
                <td id="iw-lng">{customerData.address}</td>
              </tr>
              <tr id="iw-coord-row" className="iw_table_row">
                <th id="iw-lng-attribute">Phone Number: </th>
                <td id="iw-lng">{customerData.mobile}</td>
              </tr>
              <tr id="iw-coord-row" className="iw_table_row">
                <th id="iw-lng-attribute">Rating: </th>
                <td id="iw-lng">
                  {[0, 0, 0, 0, 0].map((el, i) => {
                    const rating = Number(customerData.starRating);
                    if (rating >= i + 1) return "⭐";
                    else return "";
                  })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
}
