import getLatLngFromZipCode from "./getLatLngFromZipCode";

async function pointToAddress(event) {
  const zipCode = document.querySelector("#zipCode").value;
  console.log(zipCode);
  const [lat, lng] = await getLatLngFromZipCode(zipCode);
  return [lat, lng];
}

export default pointToAddress;
