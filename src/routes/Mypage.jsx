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

const Total = styled(motion.div)``;

const Container = styled.div`
  width: 85vw;
  margin: 5vh auto;
  min-height: 80vh;
  background-color: #f6eeee;
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
                  <button>닉네임 변경</button>
                </NickTab>
              </Box>
              <button onClick={logout}>로그아웃</button>
            </>
          ) : (
            <Title>로그인 하세요</Title>
          )}
          <div>공지사항</div>
          <div>서비스 문의</div>
          <div>버전 정보</div>
          <div>Contact</div>
        </Container>
      </Total>
    </>
  );
}
