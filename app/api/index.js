export default function makeApi(sortPath) {
  return `/api/1.0/stock${sortPath}`;
}
