import { Helmet } from "react-helmet";
import styled from "styled-components";
import logo from "../images/logo.png";
import kakaologin from "../images/kakao_login_medium_wide.png";
import axios from "axios";
import KakaoLogin from "react-kakao-login";
import { motion } from "framer-motion";
import Feed from "../routes/Feed";
import {
  Link,
  useNavigate,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { isUserAtom } from "../atoms";
import { useEffect } from "react";
import { CLIENT_ID, REDIRECT_URI, KAKAO_JSKEY } from "../Key";
import Auth from "../Auth";
import {
  isUserIDAtom,
  isNickNameAtom,
  isProfileImgAtom,
  isAccessTokenAtom,
} from "../atoms";

const Container = styled(motion.div)`
  width: 80vw;
  margin-top: 10vh;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(240, 237, 237, 1);
  height: 80vh;
  border-radius: 100px;
  box-shadow: 0 10px 10px rgba(35, 35, 35, 0.3), 0 10px 20px rgba(0, 0, 0, 0.3);
  overflow: hidden;
`;
const Tab = styled(motion.div)`
  margin-top: -40px;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 5px;
  margin-bottom: 30px;
  color: rgba(69, 90, 228, 1);
`;

const LoginButton = styled(motion.div)`
  border-radius: none;
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;

const Img = styled(motion.img)`
  width: 300px;
  height: 250px;
  margin-top: 10vh;
`;
const LoginTab = styled(Tab)`
  margin-top: 10px;
`;
const GuestLoginTab = styled(Tab)`
  display: inline-block;
  color: #000000;
`;

const Links = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover {
    color: rgba(69, 90, 228, 1);
  }
`;

export default function Login() {
  const userToken = useRecoilValue(isUserAtom);
  const setUser = useSetRecoilState(isUserAtom);
  const setAccessToken = useSetRecoilState(isAccessTokenAtom);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  // kakao login
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  // const Kakao = () => {
  //   useEffect(() => {
  //     if (typeof window !== "undefined") {
  //       window.Kakao.init(KAKAO_JSKEY);
  //     }
  //   }, []);

  //   const signUp = () => {};

  //   return (
  //     <KakaoLogin
  //       token={KAKAO_JSKEY}
  //       onSuccess={(res) => {
  //         console.log("로그인 성공");
  //         console.log(res);
  //         console.log(res?.response?.access_token);
  //         axios
  //           .post(
  //             `http://35.247.33.79:80/social/signup/kakao`,
  //             { accessToken: res?.response?.access_token },
  //             {
  //               headers: {
  //                 "Content-Type": "application/json",
  //                 withCredentials: true,
  //                 "Access-Control-Allow-Origin": "*",
  //                 "Access-Control-Allow-Methods":
  //                   "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  //               },
  //             }
  //           )
  //           .then((response) => {
  //             console.log("회원가입 성공" + response);
  //             axios
  //               .post(
  //                 `http://35.247.33.79:80/social/login/kakao`,
  //                 { accessToken: res?.response?.access_token },
  //                 {
  //                   headers: {
  //                     "Content-Type": "application/json",
  //                     withCredentials: true,
  //                     "Access-Control-Allow-Origin": "*",
  //                     "Access-Control-Allow-Methods":
  //                       "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  //                   },
  //                 }
  //               )
  //               .then((res) => {
  //                 console.log(res);
  //                 setUser(true);
  //                 //navigate("/feed");
  //                 //getProfile();
  //               });
  //           })
  //           .catch((err) => {
  //             if (err.code !== "") {
  //               console.log("원래 회원");
  //               axios
  //                 .post(
  //                   `http://35.247.33.79:80/social/login/kakao`,
  //                   { accessToken: res?.response?.access_token },
  //                   {
  //                     headers: {
  //                       "Content-Type": "application/json",
  //                       withCredentials: true,
  //                       "Access-Control-Allow-Origin": "*",
  //                       "Access-Control-Allow-Methods":
  //                         "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  //                     },
  //                   }
  //                 )
  //                 .then((complete) => {
  //                   console.log(complete);
  //                   setUser(true);
  //                   setAccessToken(complete.data.data.accessToken);
  //                   navigate("/feed");
  //                   //getProfile();
  //                 });
  //             } else {
  //               console.log(err);
  //             }
  //           });
  //       }}
  //       onFail={(err) => console.error("로그인 실패", err)}
  //       onLogout={(res) => {
  //         console.log("로그아웃");
  //         console.log(res);
  //       }}
  //       src={kakaologin}
  //       style={{ display: "flex", justifyContent: "center", border: "none" }}
  //     >
  //       <motion.img whileHover={{ y: -10 }} src={kakaologin} alt="no" />
  //     </KakaoLogin>
  //   );
  // };

  const onClick = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Container
        initial={{ backgroundColor: "rgba(240, 237, 237, 1)" }}
        animate={{ backgroundColor: "rgba(240, 237, 237, 0.5)" }}
        transition={{ delayChildren: 0.5, staggerChildren: 0.2, duration: 2 }}
      >
        <LoginButton
        // initial={{ scale: 0, y: -100 }}
        // animate={{ scale: 1, y: 0 }}
        // transition={{ type: "spring", duration: 1.4, bounce: 0.5 }}
        >
          <Img drag dragSnapToOrigin src={logo} alt="no" />
        </LoginButton>
        <Tab
          initial={{ scale: 0, y: -10 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", duration: 1.4, bounce: 0.5 }}
        >
          비 행
        </Tab>
        <LoginTab>
          <LoginButton
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              delay: 1,
              duration: 1.6,
              bounce: 0.5,
            }}
            whileHover={{ scale: 1.5 }}
            onClick={onClick}
          >
            <motion.img whileHover={{ y: -10 }} src={kakaologin} alt="no" />
            {/* <Kakao /> */}
          </LoginButton>
        </LoginTab>

        <LoginTab>
          <GuestLoginTab
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              delay: 1,
              duration: 1.6,
              bounce: 0.5,
            }}
          >
            <Links to={`/feed`}>로그인없이 입장</Links>
          </GuestLoginTab>
        </LoginTab>
      </Container>
    </>
  );
}
