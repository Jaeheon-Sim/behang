import React from "react";
import { useEffect, useHistory } from "react";
import axios from "axios";
import { isUserAtom } from "./atoms";
import { useSetRecoilState } from "recoil";
import qs from "qs";
import { isUserIDAtom, isNickNameAtom, isProfileImgAtom } from "./atoms";
import { CLIENT_ID, REDIRECT_URI } from "./Key";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const setUser = useSetRecoilState(isUserAtom);
  const setID = useSetRecoilState(isUserIDAtom);
  const setNick = useSetRecoilState(isNickNameAtom);
  const setProfileImg = useSetRecoilState(isProfileImgAtom);
  const REST_API_KEY = CLIENT_ID;
  const CLIENT_SECRET = "98779abc80d6cbde549b1d3cf5ee583c";
  const navigate = useNavigate();
  // calllback으로 받은 인가코드
  const code = new URL(window.location.href).searchParams.get("code");

  const getProfile = async () => {
    try {
      // Kakao SDK API를 이용해 사용자 정보 획득
      let data = await window.Kakao.API.request({
        url: "/v2/user/me",
      });

      // 사용자 정보 변수에 저장
      setID(data.id);
      setNick(data.properties.nickname);
      setProfileImg(data.properties.profile_image);
    } catch (err) {
      alert(err);
    }
  };

  const getToken = async () => {
    const payload = qs.stringify({
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: code,
      client_secret: CLIENT_SECRET,
    });

    try {
      // access token 가져오기
      const res = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        payload
      );

      // Kakao Javascript SDK 초기화
      window.Kakao.init(REST_API_KEY);
      // access token 설정
      window.Kakao.Auth.setAccessToken(res.data.access_token);
      setUser(true);
      navigate("/feed");
      getProfile();
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return null;
};

export default Auth;
