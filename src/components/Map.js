import React, { useEffect, useRef, useState } from "react";
import getCurrentLatLng from "../utils/getCurrentLatLng";
import pointInMap from "../utils/pointInMap";
import pointToAddress from "../utils/pointToAddress";

import "./Map.css";

export default function Map({ center, zoom }) {
  const [pinCode, setPinCode] = useState("");
  const ref = useRef();
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
    pointInMap(ref.current, lat, lng);
  }, [lat, lng, zoom]);

  return (
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
          pointInMap(ref.current, lati, lngi);
        }}
      />
      <div ref={ref} id="map"></div>
    </form>
  );
}
