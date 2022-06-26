import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Map from "./components/Map";
import "./App.css";
import config from "./config.json";
// import getCurrentLatLng from "./utils/getCurrentLatLng";
// import { useEffect, useState } from "react";

const render = (status) => {
  const [lat, lng] = [18.6916025, 77.7108574];
  switch (status) {
    case Status.LOADING:
      return <div>Loading...</div>;
    case Status.FAILURE:
      return <div>Error: Cannot Load!</div>;
    case Status.SUCCESS:
      return <Map center={{ lat, lng }} zoom={8} />;
    default:
      return <div>Loading...</div>;
  }
};

function App() {
  return <Wrapper apiKey={config.apiKey} render={render} />;
}

export default App;
