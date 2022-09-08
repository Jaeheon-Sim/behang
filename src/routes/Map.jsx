import Header from "../format/Header";
import { AnimatePresence, motion } from "framer-motion";
import { Helmet } from "react-helmet";
import mapImg from "../images/비행 맵.png";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isAccessTokenAtom, isRefreshTokenAtom, isUserAtom } from "../atoms";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Total = styled(motion.div)``;
const Container = styled(motion.div)`
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

const Title = styled(motion.div)`
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
  color: ${(props) =>
    props.cnt < 5 ? "#EF9800" : props.cnt < 9 ? "green" : "red"};
  visibility: ${(props) => (props.cnt < 3 ? "hidden" : "visible")};
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
`;

export default function Maps() {
  const isUser = useRecoilValue(isUserAtom);

  const isAccessToken = useRecoilValue(isAccessTokenAtom);
  const setToken = useSetRecoilState(isAccessTokenAtom);
  const isRefreshToken = useRecoilValue(isRefreshTokenAtom);
  const setRefreshToken = useSetRecoilState(isRefreshTokenAtom);
  const [record, setRecord] = useState([]);

  const MySwal = withReactContent(Swal);
  const [isLoading, setLoading] = useState(true);

  const reIssue = () => {
    fetch(`http://34.171.129.137:80/reissue`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken: isAccessToken,
        refreshToken: isRefreshToken,
      }),
    })
      .then((e) => e.json())
      .then((data) => {
        setToken(data.data.accessToken);
        setRefreshToken(data.data.refreshToken);
        onMap(data.data.accessToken);
      })
      .catch((err) => {
        MySwal.fire({
          title: <strong>원인 모를 에러가 발생했습니다.</strong>,
          icon: "error",
        });
      });
  };

  const onMap = (data) => {
    if (data === 1) {
      fetch(`http://34.171.129.137:80/history`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": isAccessToken,
        },
      })
        .then((e) => e.json())
        .then((res) => {
          if (res.code === -9999) {
            reIssue();
          } else {
            console.log(res);
            setRecord(res.list);
            setLoading(false);
          }
        })
        .catch((err) => {
          MySwal.fire({
            title: <strong>원인모를 에러가 발생했습니다.</strong>,
            icon: "error",
          });
        });
    } else {
      fetch(`http://34.171.129.137:80/history`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": data,
        },
      })
        .then((e) => e.json())
        .then((res) => {
          console.log(res);
          setRecord(res.list);
          setLoading(false);
        })
        .catch((err) => {
          MySwal.fire({
            title: <strong>원인모를 에러가 발생했습니다.</strong>,
            icon: "error",
          });
        });
    }
  };

  useEffect(() => {
    if (isUser) {
      onMap(1);
    }
  }, []);

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
          ) : isLoading ? (
            <>
              <br />
              <br />
              <br />
              <br /> <br />
              <br />
              <br />
              <br />
              <Title
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 0.5,
                }}
              >
                조금만 기다려주세요!
              </Title>
            </>
          ) : (
            <>
              <TitleBox>
                <FontAwesomeIcon
                  style={{ visibility: "hidden" }}
                  icon={faQuestion}
                />
                <Title>??</Title>

                <FontAwesomeIcon
                  style={{ cursor: "pointer", marginTop: " 4vh" }}
                  icon={faQuestion}
                  onClick={() => {
                    MySwal.fire({
                      title: <strong>기록을 비행에 남겨보세요!</strong>,
                      icon: "question",
                    });
                  }}
                />
              </TitleBox>

              <MapBox
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  ease: "easeInOut",
                  duration: 0.5,
                }}
              >
                <Img src={mapImg} />
                <Flag
                  cnt={record[16].numOfPlace}
                  style={{
                    position: "relative",
                    top: "-3.5vh",
                    left: "30%",
                  }}
                  icon={faFlag}
                />
                <Flag
                  cnt={record[15].numOfPlace}
                  style={{
                    position: "relative",
                    bottom: "18.5vh",
                    left: "27%",
                  }}
                  icon={faFlag}
                />

                <Flag
                  cnt={record[4].numOfPlace}
                  style={{
                    position: "relative",
                    bottom: "22.5vh",
                    left: "24%",
                  }}
                  icon={faFlag}
                />
                <Flag
                  cnt={record[14].numOfPlace}
                  style={{
                    position: "relative",
                    bottom: "28.5vh",
                    left: "24%",
                  }}
                  icon={faFlag}
                />
                <Flag
                  cnt={record[13].numOfPlace}
                  style={{
                    position: "relative",
                    bottom: "25.5vh",
                    left: "33%",
                  }}
                  icon={faFlag}
                />
                <Flag
                  cnt={record[5].numOfPlace}
                  style={{
                    position: "relative",
                    bottom: "23.9vh",
                    left: "40%",
                  }}
                  icon={faFlag}
                />
                <Flag
                  cnt={record[6].numOfPlace}
                  style={{
                    position: "relative",
                    bottom: "29.5vh",
                    left: "39%",
                  }}
                  icon={faFlag}
                />
                <Flag
                  cnt={record[3].numOfPlace}
                  style={{
                    position: "relative",
                    bottom: "30.5vh",
                    left: "24%",
                  }}
                  icon={faFlag}
                />
                <Flag
                  cnt={record[12].numOfPlace}
                  style={{
                    position: "relative",
                    bottom: "38.5vh",
                    left: "23%",
                  }}
                  icon={faFlag}
                />
                <Flag
                  cnt={record[2].numOfPlace}
                  style={{
                    position: "relative",
                    bottom: "35.5vh",
                    left: "1%",
                  }}
                  icon={faFlag}
                />
                <Flag
                  cnt={record[7].numOfPlace}
                  style={{
                    position: "relative",
                    bottom: "38.5vh",
                    left: "-10%",
                  }}
                  icon={faFlag}
                />
                <Flag
                  cnt={record[11].numOfPlace}
                  style={{
                    position: "relative",
                    bottom: "40.5vh",
                    left: "-25%",
                  }}
                  icon={faFlag}
                />
                <Flag
                  cnt={record[10].numOfPlace}
                  style={{
                    position: "relative",
                    bottom: "44.5vh",
                    left: "-20%",
                  }}
                  icon={faFlag}
                />
                <Flag
                  cnt={record[8].numOfPlace}
                  style={{
                    position: "relative",
                    bottom: "49.5vh",
                    left: "-23%",
                  }}
                  icon={faFlag}
                />

                <Flag
                  cnt={record[1].numOfPlace}
                  style={{
                    position: "relative",
                    bottom: "52.5vh",
                    left: "-40%",
                  }}
                  icon={faFlag}
                />
                <Flag
                  cnt={record[0].numOfPlace}
                  style={{
                    position: "relative",
                    bottom: "53.5vh",
                    left: "-38%",
                  }}
                  icon={faFlag}
                />
                <Flag
                  cnt={record[9].numOfPlace}
                  style={{
                    position: "relative",
                    bottom: "54.5vh",
                    left: "-26%",
                  }}
                  icon={faFlag}
                />
              </MapBox>
            </>
          )}
        </Container>
      </Total>
    </>
  );
}
