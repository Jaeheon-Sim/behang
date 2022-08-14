// const BASE_URL =
//   //   "http://apis.data.go.kr/B551011/KorService&vQLxgnWbzLDwZWujom7Tfzceh8%2BaYO4P3WUpTf64AZ5hqBMft3fwVOLksClRPAAft%2BUBmbJOj%2Bw44DPdT3ko0g%3D%3D";
//   `http://apis.data.go.kr/B551011/KorService/locationBasedList?serviceKey=${OPEN_KEY}&_type=json&MobileOS=WIN&numOfRows=100&MobileApp=test&mapX=${isY}&mapY=${isX}&radius=10000`;

// export async function FetchLocations() {
//   return fetch(
//     `http://apis.data.go.kr/B551011/KorService/locationBasedList?serviceKey=${OPEN_KEY}&_type=json&MobileOS=WIN&numOfRows=100&MobileApp=test&mapX=${isY}&mapY=${isX}&radius=10000`
//   ).then((response) => response.json());
// }

// export async function fetchCoinInfo(coinID) {
//   return await fetch(`${BASE_URL}/coins/${coinID}`).then((response) =>
//     response.json()
//   );
// }

// export async function fetchCoinTickers(coinID) {
//   return await fetch(`${BASE_URL}/tickers/${coinID}`).then((response) =>
//     response.json()
//   );
// }

// export async function fetchCoinHistory(coinID) {
//   return await fetch(
//     `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinID}`
//   ).then((response) => response.json());
// }

// const BASE_URL = "https://api.coinpaprika.com/v1";

// export async function fetchLocations() {
//   console.log("sdafdssdf");
//   return fetch(`${BASE_URL}/coins`).then((response) => response.json());
// }
