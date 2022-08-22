import Header from "../format/Header";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  isUserIDAtom,
  isNickNameAtom,
  isProfileImgAtom,
  isUserAtom,
} from "../atoms";
import { useMatch, useNavigate } from "react-router-dom";
import { CLIENT_ID } from "../Key";
import { request } from "../axios";
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
  width: inherit;
  height: inherit;
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
  margin-right: 2vw;
`;

const Box = styled.div`
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
`;

const InfoTab = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  const checkpage = useMatch("/mypage");

  // const getProfile = async () => {
  //   try {
  //     // Kakao SDK API를 이용해 사용자 정보 획득
  //     let data = await window.Kakao.API.request({
  //       url: "/v2/user/me",
  //     });

  //     // 사용자 정보 변수에 저장
  //     setID(data.id);
  //     setNick(data.properties.nickname);
  //     setProfileImg(data.properties.profile_image);
  //   } catch (err) {}
  // };

  // useEffect(() => {
  //   getProfile();
  // }, []);

  const logout = () => {
    window.Kakao.isInitialized();
    //window.kakao.Auth.logout();
    setID("");
    setNick("");
    setProfileImg("");
    setUser(false);

    navigate("/");
  };

  const test = () => {
    console.log("test");
  };

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch(`http://35.227.155.59:8080/hello`);

  //     const json = await response.json();
  //     console.log(json);
  //   })();
  // }, []);

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
                <ImgBox>
                  <Img src={isProfileImg} alt="no image"></Img>
                </ImgBox>
                <NickTab>
                  <Title>{isNick}</Title>
                  <Button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotateZ: 360 }}
                    whileHover={{ y: -10 }}
                    whileTap={{ y: 0 }}
                    exit={{ scale: 0 }}
                    onClick={test}
                  >
                    <div>닉네임 변경</div>
                  </Button>
                </NickTab>
              </Box>
              <LogoutTab>
                <Button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotateZ: 360 }}
                  whileHover={{ y: -10 }}
                  whileTap={{ y: 0 }}
                  exit={{ scale: 0 }}
                  onClick={logout}
                >
                  <div>로그아웃</div>
                </Button>
              </LogoutTab>
            </>
          ) : (
            <>
              <br />
              <br />
              <br />
              <br />
              <Title>로그인 하세요</Title>
            </>
          )}
          <br />
          <br />
          <InfoTab>
            <div>공지사항</div>
            <br />
            <div>서비스 문의</div>
            <br />
            <div>버전 정보</div>
            <br />
            <div>Contact</div>
          </InfoTab>
        </Container>
      </Total>
    </>
  );
}
