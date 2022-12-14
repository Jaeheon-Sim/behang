import { Helmet } from "react-helmet";
import styled from "styled-components";
import logo from "../images/logo.png";
import kakaologin from "../images/kakao_login_medium_wide.png";
import axios from "axios";

import { motion } from "framer-motion";
import Feed from "../routes/Feed";
import {
  Link,
  useNavigate,
  Outlet,
  useLocation,
  useParams,
  Navigate,
} from "react-router-dom";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { isCodeAtom } from "../atoms";
import { useEffect } from "react";
import { CLIENT_ID, REDIRECT_URI, KAKAO_JSKEY } from "../Key";
import Auth from "../Auth";

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
  // kakao login
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const setCode = useSetRecoilState(isCodeAtom);
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  const onClick = (e) => {
    window.location.href = KAKAO_AUTH_URL;
  };

  useEffect(() => {
    if (code?.length > 1) {
      setCode(code);

      navigate("/oauth/kakao/callback");
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>??????</title>
      </Helmet>
      <Container
        initial={{ backgroundColor: "rgba(240, 237, 237, 1)" }}
        animate={{ backgroundColor: "rgba(240, 237, 237, 0.5)" }}
        transition={{ delayChildren: 0.5, staggerChildren: 0.2, duration: 2 }}
      >
        <LoginButton>
          <Img drag dragSnapToOrigin src={logo} alt="no" />
        </LoginButton>
        <Tab
          initial={{ scale: 0, y: -10 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", duration: 1.4, bounce: 0.5 }}
        >
          ??? ???
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
            <Links to={`/feed`}>??????????????? ??????</Links>
          </GuestLoginTab>
        </LoginTab>
      </Container>
    </>
  );
}
