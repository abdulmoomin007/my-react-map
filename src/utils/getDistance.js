function getDistance({ lat: x1, lng: y1 }, { lat: x2, lng: y2 }) {
  const a = x1 - x2;
  const b = y1 - y2;
  return Math.sqrt(a * a + b * b);
}

export default getDistance;
