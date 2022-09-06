import Header from "../format/Header";
import { AnimatePresence, motion } from "framer-motion";
import { Helmet } from "react-helmet";
import mapImg from "../images/비행 맵.png";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isUserAtom } from "../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Total = styled(motion.div)``;
const Container = styled.div`
  width: 85vw;
  margin: 5vh auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  background-color: #f0eded;
  min-height: 80vh;
  height: auto;
  border-radius: 100px;
  box-shadow: 0 10px 10px rgba(35, 35, 35, 0.3), 0 10px 20px rgba(0, 0, 0, 0.3);
  color: black;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  margin-top: 5vh;
`;

const MapBox = styled(motion.div)`
  margin-top: 10px;
  height: 65vh;
  width: 560px;
  background-color: white;
  overflow: hidden;
  border-radius: 20px;
  /* @media screen and (min-width: 1500px) {
    width: 35%;
  } */
  position: relative;
`;

const Img = styled.img`
  width: 75%;
  height: 98%;
  margin: 0 -37.5%;
  padding-top: 10px;
  padding-bottom: 10px;
  position: relative;
  left: 50%;
`;

const Flag = styled(FontAwesomeIcon)`
  color: #ead23b;
`;

export default function Maps() {
  const isUser = useRecoilValue(isUserAtom);

  useEffect(() => {}, []);

  return (
    <>
      <Helmet>
        <title>비행</title>
      </Helmet>

      <Header />
      <Total
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "spring", duration: 1.4 }}
      >
        <Container>
          {!isUser ? (
            <>
              <br />
              <br />
              <br />
              <br />
              <Title>로그인을 하시면 이용이 가능해요!</Title>
            </>
          ) : (
            <>
              <Title>비행 기록</Title>
              <MapBox>
                <Img src={mapImg} />
                <Flag
                  style={{
                    position: "relative",
                    top: "-3.5vh",
                    left: "30%",
                  }}
                  icon={faFlag}
                />
                <Flag
                  style={{
                    position: "relative",
                    bottom: "18.5vh",
                    left: "27%",
                  }}
                  icon={faFlag}
                />

                <Flag
                  style={{
                    position: "relative",
                    bottom: "24.5vh",
                    left: "27%",
                  }}
                  icon={faFlag}
                />
                <Flag
                  style={{
                    position: "relative",
                    bottom: "32.5vh",
                    left: "27%",
                  }}
                  icon={faFlag}
                />
                <Flag
                  style={{
                    position: "relative",
                    bottom: "24.5vh",
                    left: "33%",
                  }}
                  icon={faFlag}
                />
                <Flag
                  style={{
                    position: "relative",
                    bottom: "23.9vh",
                    left: "40%",
                  }}
                  icon={faFlag}
                />
                <Flag
                  style={{
                    position: "relative",
                    bottom: "29.5vh",
                    left: "39%",
                  }}
                  icon={faFlag}
                />
                <Flag
                  style={{
                    position: "relative",
                    bottom: "35.5vh",
                    left: "25%",
                  }}
                  icon={faFlag}
                />
                <Flag
                  style={{
                    position: "relative",
                    bottom: "42.5vh",
                    left: "23%",
                  }}
                  icon={faFlag}
                />
                <Flag
                  style={{
                    position: "relative",
                    bottom: "39.5vh",
                    left: "-2%",
                  }}
                  icon={faFlag}
                />
                <Flag
                  style={{
                    position: "relative",
                    bottom: "41.5vh",
                    left: "-14%",
                  }}
                  icon={faFlag}
                />
                <Flag
                  style={{
                    position: "relative",
                    bottom: "42.5vh",
                    left: "-28%",
                  }}
                  icon={faFlag}
                />
                <Flag
                  style={{
                    position: "relative",
                    bottom: "45.5vh",
                    left: "-10%",
                  }}
                  icon={faFlag}
                />
                <Flag
                  style={{
                    position: "relative",
                    bottom: "47.5vh",
                    left: "-23%",
                  }}
                  icon={faFlag}
                />

                <Flag
                  style={{
                    position: "relative",
                    bottom: "52.5vh",
                    left: "-41%",
                  }}
                  icon={faFlag}
                />
                <Flag
                  style={{
                    position: "relative",
                    bottom: "53.5vh",
                    left: "-39%",
                  }}
                  icon={faFlag}
                />
                <Flag
                  style={{
                    position: "relative",
                    bottom: "54.5vh",
                    left: "-26%",
                  }}
                  icon={faFlag}
                />
              </MapBox>

              {/* <MapBox>
                <Mapp />
              </MapBox> */}
            </>
          )}
        </Container>
      </Total>
    </>
  );
}
