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
  justify-content: flex-start;
`;
const Title = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;
const Links = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: black;
`;
const FeedWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FeedContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  @media screen and (min-width: 2000px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  width: 98%;
  height: 100%;
`;
const FeedBox = styled(motion.div)`
  width: 95%;
  height: 90%;
  background-color: #ececec;
  margin: 5px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 1px rgba(35, 35, 35, 0.3), 0 1px 1px rgba(0, 0, 0, 0.3);
  overflow: hidden;
`;
const ImgBox = styled.div`
  width: 20vh;
  height: 70%;
  background-color: #d9d9d9;
  border-radius: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const LogoutTab = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 2vw;
`;

const Box = styled.div`
  width: 100%;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NickTab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled(motion.button)`
  margin-left: 100px;
  background-color: #455ae4;
  color: white;
  border: none;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  padding: 5px;
  border-radius: 10px;
  font-weight: lighter;
  font-size: 1.3rem;
  cursor: pointer;
`;

const Btn = styled(Button)`
  margin-left: 0px;
`;

const Div = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-left: 10px;

  cursor: pointer;
`;

export default function Mypage() {
  //recoil 값으로 올려야함
  const isUser = useRecoilValue(isUserAtom);
  const setID = useSetRecoilState(isUserIDAtom);
  const isNick = useRecoilValue(isNickNameAtom);
  const isProfileImg = useRecoilValue(isProfileImgAtom);
  const setUser = useSetRecoilState(isUserAtom);
  const setNick = useSetRecoilState(isNickNameAtom);
  const setProfileImg = useSetRecoilState(isProfileImgAtom);
  const navigate = useNavigate();
  const isToken = useRecoilValue(isAccessTokenAtom);
  const setToken = useSetRecoilState(isAccessTokenAtom);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isPageNum, setPageNum] = useState(10);

  const logout = () => {
    fetch(`http://35.247.33.79:80/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": isToken,
      },
    })
      .then((e) => e.json())
      .then((res) => {
        console.log(res);
      });
    setID("");
    setNick("");
    setToken("");
    setProfileImg("");
    setUser(false);

    navigate("/");
  };

  const GoNotice = () => {
    navigate("/notice");
  };

  const test = () => {
    console.log("test");
  };

  useEffect(() => {
    if (isUser) {
      fetch(`http://35.247.33.79:80/posts/feed/me?page=0&size=${isPageNum}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": isToken,
        },
      })
        .then((e) => e.json())
        .then((res) => {
          setData(res.list);
          setPageNum((prev) => prev + 10);
          setLoading(true);
        });
    }
  }, []);

  return (
    <>
      <Header />
      <Total
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "spring", duration: 0.7 }}
      >
        <Container>
          {isUser ? (
            <>
              <Box>
                <Div>
                  <ImgBox>
                    <Img src={isProfileImg} alt="no image"></Img>
                  </ImgBox>
                  <NickTab>
                    <Title>{isNick}</Title>
                    <Btn
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotateZ: 360 }}
                      whileHover={{ y: -5 }}
                      whileTap={{ y: 0 }}
                      exit={{ scale: 0 }}
                      onClick={test}
                    >
                      <div>닉네임 변경</div>
                    </Btn>
                  </NickTab>
                </Div>
              </Box>
              <LogoutTab>
                <Button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotateZ: 360 }}
                  whileHover={{ y: -5 }}
                  whileTap={{ y: 0 }}
                  exit={{ scale: 0 }}
                  onClick={logout}
                  style={{ backgroundColor: "red" }}
                >
                  <div>로그아웃</div>
                </Button>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotateZ: 360 }}
                  whileHover={{ y: -5 }}
                  whileTap={{ y: 0 }}
                  onClick={GoNotice}
                >
                  <Icon icon={faGear}></Icon>
                </motion.div>
              </LogoutTab>
              {isLoading ? (
                <FeedWrapper>
                  <FeedContainer>
                    {data?.map((e) => {
                      return (
                        <Links key={e.id} to={`/feed/${e.id}`} state={e}>
                          <FeedBox
                            whileHover={{ scale: 1.07 }}
                            whileTap={{ scale: 0.8 }}
                          >
                            <Img
                              alt="오류가 있어요."
                              src={"http://35.247.33.79:80/" + e.imageUrl}
                            />
                          </FeedBox>
                        </Links>
                      );
                    })}
                  </FeedContainer>
                </FeedWrapper>
              ) : (
                <Box>
                  <Div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "reverse",
                      repeatDelay: 0.5,
                    }}
                  >
                    <div>Loading ...</div>
                  </Div>
                </Box>
              )}
            </>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <br />
              <br />
              <br />
              <br />
              <Title>로그인을 하시면 나의 정보를 볼 수 있어요.</Title>
              <div
                style={{
                  display: "flex",

                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <br />
                <br />
                <br />
                <br />
                <h1 style={{ color: "#455ae4" }}>
                  비행의 정보들을 확인하실래요?
                </h1>
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: -5 }}
                  transition={{
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 0.5,
                  }}
                  onClick={GoNotice}
                >
                  <Icon icon={faGear}></Icon>
                </motion.div>
              </div>
            </div>
          )}
        </Container>
      </Total>
    </>
  );
}
