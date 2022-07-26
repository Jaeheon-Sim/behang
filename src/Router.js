import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./routes/Login";
import Feed from "./routes/Feed";
import { useRecoilValue } from "recoil";
import { isUserAtom } from "./atoms";

function Router() {
  const userToken = useRecoilValue(isUserAtom);

  if (!userToken) {
    return <Login />;
  }
  return (
    <Routes>
      <Route path="/" element={<Feed />}></Route>
      {/* <Route path="/:coinID" element={<Coin />}>
          <Route path="chart" element={<Chart />} />
          <Route path="price" element={<Price />} />
        </Route> */}
    </Routes>
  );
}
export default Router;
