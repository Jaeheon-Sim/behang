import Header from "../format/Header";

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
import { useNavigate } from "react-router-dom";

const Container = styled.div``;
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
  width: 300px;
  height: 70%;
  background-color: #d9d9d9;

  border-radius: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export default function Mypage() {
  //recoil 값으로 올려야함
  const isUser = useRecoilValue(isUserAtom);
  const isId = useRecoilValue(isUserIDAtom);
  const isNick = useRecoilValue(isNickNameAtom);
  const isProfileImg = useRecoilValue(isProfileImgAtom);

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

  return (
    <>
      <Header />
      <Container>
        {isUser ? (
          <Box>
            <ImgBox>
              <Img src={isProfileImg} alt="no"></Img>
            </ImgBox>
            <Title>{isNick}</Title>
            <button>로그아웃</button>
          </Box>
        ) : (
          <Title>로그인 하세요</Title>
        )}
      </Container>
    </>
  );
}
