import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./routes/Login";
import Feed from "./routes/Feed";
import Maps from "./routes/Map";
import Search from "./routes/Search";
import MyPage from "./routes/Mypage";
import Upload from "./routes/Upload";
import Auth from "./Auth";
import Detail from "./routes/Detail";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/feed" element={<Feed />}></Route>
      <Route path="/feed/:ID" element={<Detail />}></Route>
      <Route path="/search" element={<Search />}></Route>
      <Route path="/map" element={<Maps />}></Route>
      <Route path="/mypage" element={<MyPage />}></Route>
      <Route path="/upload" element={<Upload />}></Route>
      <Route path="/oauth/kakao/callback" element={<Auth />}></Route>
    </Routes>
  );
}
export default Router;
