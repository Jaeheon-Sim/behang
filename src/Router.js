import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./routes/Login";
import Feed from "./routes/Feed";
import Maps from "./routes/Map";
import Search from "./routes/Search";
import MyPage from "./routes/Mypage";
import Upload from "./routes/Upload";
import Auth from "./Auth";
import Detail from "./routes/Detail";
import FeedDetail from "./routes/FeedDetail";
import Notice from "./routes/Notice";
import Revise from "./routes/Revise";
import Gongi from "./routes/Gongi";
import Version from "./routes/Version";
import Terms from "./routes/Terms";
import Contact from "./routes/Contact";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/feed" element={<Feed />}></Route>
      <Route path="/feed/:ID" element={<FeedDetail />}></Route>
      <Route path="/search" element={<Search />}></Route>
      <Route path="/map" element={<Maps />}></Route>
      <Route path="/mypage" element={<MyPage />}></Route>
      <Route path="/feed/revise/:ID" element={<Revise />}></Route>
      <Route path="/notice" element={<Notice />}></Route>
      <Route path="/notice/gongi" element={<Gongi />} />
      <Route path="/notice/version" element={<Version />} />
      <Route path="/notice/terms" element={<Terms />} />
      <Route path="/notice/contact" element={<Contact />} />
      <Route path="/upload" element={<Upload />}></Route>
      <Route path="/search/:ID" element={<Detail />}></Route>
      <Route path="/oauth/kakao/callback" element={<Auth />}></Route>
    </Routes>
  );
}
export default Router;
