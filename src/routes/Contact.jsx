import Header from "../format/Header";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate } from "react-router-dom";
import {
  isUserIDAtom,
  isNickNameAtom,
  isProfileImgAtom,
  isUserAtom,
  isAccessTokenAtom,
} from "../atoms";
import { useMatch, useNavigate } from "react-router-dom";
import { CLIENT_ID } from "../Key";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Total = styled(motion.div)``;

const Container = styled.div`
  width: 85vw;
  margin: 5vh auto;
  min-height: 80vh;
  background-color: #f0eded;
  border-radius: 100px;
  box-shadow: 0 10px 10px rgba(35, 35, 35, 0.3), 0 10px 20px rgba(0, 0, 0, 0.3);
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InfoTab = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Div = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  cursor: pointer;
`;

const WithDiv = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  margin-top: 5vh;
`;

const Btn = styled(motion.div)`
  margin-top: 2vh;
  font-size: 3rem;
  cursor: pointer;
`;

const MotionVar = {
  hover: { y: -5 },
  tap: { y: 0 },
};

export default function Contact() {
  const isUser = useRecoilValue(isUserAtom);
  const isAccessToken = useRecoilValue(isAccessTokenAtom);

  return (
    <>
      <Header />
      <Total
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "spring", duration: 0.7 }}
      >
        <Container>
          <Div>서비스 문의</Div>
          <br />

          <Div>zh025700@naver.com</Div>
        </Container>
      </Total>
    </>
  );
}
