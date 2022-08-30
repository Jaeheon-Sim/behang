import Header from "../format/Header";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {
  isUserIDAtom,
  isNickNameAtom,
  isProfileImgAtom,
  isUserAtom,
  isAccessTokenAtom,
} from "../atoms";
import { useMatch, useNavigate } from "react-router-dom";
import { CLIENT_ID } from "../Key";
import { request } from "../axios";
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

const MotionVar = {
  hover: { y: -5 },
  tap: { y: 0 },
};

export default function Notice() {
  return (
    <>
      <Header />
      <Total
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "spring", duration: 0.7 }}
      >
        <Container>
          <InfoTab>
            <Div variants={MotionVar} whileHover="hover" whileTap="tap">
              공지사항
            </Div>
            <br />
            <Div variants={MotionVar} whileHover="hover" whileTap="tap">
              서비스 문의
            </Div>
            <br />
            <Div variants={MotionVar} whileHover="hover" whileTap="tap">
              약관 및 정책
            </Div>
            <br />
            <Div variants={MotionVar} whileHover="hover" whileTap="tap">
              버전 정보
            </Div>
            <br />
            <Div variants={MotionVar} whileHover="hover" whileTap="tap">
              Contact
            </Div>
          </InfoTab>
        </Container>
      </Total>
    </>
  );
}
