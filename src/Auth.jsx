import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { isUserAtom } from "./atoms";
import { useSetRecoilState, useRecoilValue } from "recoil";
import qs from "qs";
import {
  isUserIDAtom,
  isNickNameAtom,
  isProfileImgAtom,
  isAccessTokenAtom,
  isRefreshTokenAtom,
} from "./atoms";
import { CLIENT_ID, REDIRECT_URI } from "./Key";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";

const Div = styled(motion.div)`
  justify-content: center;
  align-items: center;
  display: flex;
`;
const Wrapper = styled(motion.div)`
  width: 85vw;
  margin: 5vh auto;
  background-color: #f0eded;
  min-height: 85vh;
  border-radius: 100px;
  box-shadow: 0 10px 10px rgba(35, 35, 35, 0.3), 0 10px 20px rgba(0, 0, 0, 0.3);
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Title = styled(motion.h1)`
  font-size: 2rem;
  display: flex;
  align-items: center;
`;

const Dot = styled(motion.h1)`
  font-size: 2rem;
  margin-left: 1px;
`;
const boxVariants = {
  start: {
    opacity: 1,
  },
  end: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const titleVari = {
  start: {
    opacity: 0,
  },
  end: {
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: 1,
    },
  },
};

const circleVariants = {
  start: {
    opacity: 0,
  },
  end: {
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: 0.5,
      repeatDelay: 0.4,
    },
  },
};
const Auth = () => {
  const setRefreshToken = useSetRecoilState(isRefreshTokenAtom);
  const setUser = useSetRecoilState(isUserAtom);
  const setID = useSetRecoilState(isUserIDAtom);
  const setNick = useSetRecoilState(isNickNameAtom);
  const setProfileImg = useSetRecoilState(isProfileImgAtom);
  const isAccessToken = useRecoilValue(isAccessTokenAtom);
  const setAccessToken = useSetRecoilState(isAccessTokenAtom);
  const REST_API_KEY = CLIENT_ID;
  const CLIENT_SECRET = "98779abc80d6cbde549b1d3cf5ee583c";
  const navigate = useNavigate();
  // calllback으로 받은 인가코드
  const code = new URL(window.location.href).searchParams.get("code");

  const getProfile = (token) => {
    // Kakao SDK API를 이용해 사용자 정보 획득

    fetch(`http://35.247.33.79:80/users/profile/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setID(data.data.userId);
        setNick(data.data.nickName);
        setProfileImg(data.data.profileImage);
      });

    // 사용자 정보 변수에 저장
  };

  const getToken = async () => {
    const payload = qs.stringify({
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: code,
      // client_secret: CLIENT_SECRET,
    });

    fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload,
    })
      .then((res) => res.json())
      .then((data) => {
        signUp(data);
      })
      .catch((err) => alert(err));
  };

  const signUp = (res) => {
    fetch(`http://35.247.33.79:80/social/signup/kakao`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken: res.access_token,
      }),
    })
      .then((e) => e.json())
      .then((data) => {
        if (data.success === true) {
          login();
        } else {
          if (data.msg === "이미 가입된 계정입니다. 로그인을 해주세요") {
            login(res);
          } else {
            alert("에러입니다...");
            navigate("/");
          }
        }
      })
      .catch((err) => {
        alert(err);
        navigate("/");
      });
  };

  const login = (res) => {
    fetch(`http://35.247.33.79:80/social/login/kakao`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken: res.access_token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success === true) {
          setUser(true);
          setAccessToken(data.data.accessToken);
          getProfile(data.data.accessToken);

          setRefreshToken(data.data.refreshToken);
          //getProfile();
          navigate("/feed");
        } else {
          alert("오류가 났어요...");
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getToken();
  }, []);

  // useEffect(() => {
  //   request("post", "/hello", { 1: "hello" }).then;
  // }, []);

  return (
    <Div>
      <Wrapper>
        <Title variants={boxVariants} initial="start" animate="end">
          <Dot variants={titleVari}>로그인 중</Dot>
          <Dot variants={circleVariants}>.</Dot>
          <Dot variants={circleVariants}>.</Dot>
          <Dot variants={circleVariants}>.</Dot>
        </Title>
      </Wrapper>
    </Div>
  );
};

export default Auth;
