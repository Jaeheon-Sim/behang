import Header from "../format/Header";
import { AnimatePresence, motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { KAKAO_JSKEY } from "../Key";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isUserAtom } from "../atoms";
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

const MapBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Marker = styled(motion.MapMarker)`
  justify-content: center;
  align-items: center;
  display: flex;
`;

export default function Maps() {
  const isUser = useRecoilValue(isUserAtom);

  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },

        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }));
    }
  }, []);

  const Mapp = () => {
    return (
      <Map
        center={state.center}
        style={{ width: "90%", height: "500px" }}
        level={13}
      >
        {!state.isLoading && (
          <MapMarker position={state.center}>
            {/* <Mark>{state.errMsg ? state.errMsg : "여기 갔음"}</Mark> */}
          </MapMarker>
        )}
      </Map>
    );
  };

  return (
    <>
      <Helmet>
        <title>Map</title>
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
              <Title>로그인을 하시면 더 보여드릴게요!</Title>
            </>
          ) : (
            <>
              <Title>비.....가 내렸어...</Title>
              <br />

              <MapBox>
                <Mapp />
              </MapBox>
            </>
          )}
        </Container>
      </Total>
    </>
  );
}
