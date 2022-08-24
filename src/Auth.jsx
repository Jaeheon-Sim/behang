import React from "react";
import { useEffect, useHistory } from "react";
import axios from "axios";
import { isUserAtom } from "./atoms";
import { useSetRecoilState } from "recoil";
import qs from "qs";
import {
  isUserIDAtom,
  isNickNameAtom,
  isProfileImgAtom,
  isAcessTokenAtom,
} from "./atoms";
import { CLIENT_ID, REDIRECT_URI } from "./Key";
import { useNavigate } from "react-router-dom";
import { request } from "./axios";

const Auth = () => {
  const setUser = useSetRecoilState(isUserAtom);
  const setID = useSetRecoilState(isUserIDAtom);
  const setNick = useSetRecoilState(isNickNameAtom);
  const setProfileImg = useSetRecoilState(isProfileImgAtom);
  const setAcessToken = useSetRecoilState(isAcessTokenAtom);
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

  const test = () => {
    // console.log(code);
    // (async () => {
    //   const response = await fetch(
    //     `http://35.247.33.79:8080/hello
    //     `
    //   );
    //   const json = await response.json();
    //   console.log(json);
    // })();
    // fetch("http://35.247.33.79:8080/hello", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     boardId: 2,
    //     name: "hansol",
    //     password: "hansol_password",
    //   }),
    // }).then((response) => response.json());
    // setUser(true);
    // navigate("/feed");
    // fetch(`/v1/social/signup/kakao`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     accessToken: code,
    //   }),
    // }).then((response) => response.json());
    // request("post", `/hello`, {})
    //   .then((res) => {
    //     alert("request complete!");
    //     window.location.reload();
    //   })
    //   .catch((err) => {
    //     alert(err);
    //   });
    // axios
    //   .post(
    //     `http://35.247.33.79:8080/v1/social/signup/kakao`,
    //     { accessToken: code },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         withCredentials: true,
    //         "Access-Control-Allow-Origin": "*",
    //         "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // axios
    //   .post(
    //     `http://35.247.33.79:8080/hello`,
    //     { },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         withCredentials: true,
    //         "Access-Control-Allow-Origin": "*",
    //         "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // axios({
    //   url: "http://35.247.33.79:8080/hello",
    //   method: "post",
    //   data: {},
    // })
    //   .then(function a(response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };

  // const getToken = async () => {
  //   const payload = qs.stringify({
  //     // grant_type: "authorization_code",
  //     // client_id: REST_API_KEY,
  //     // redirect_uri: REDIRECT_URI,
  //     // code: code,
  //     // client_secret: CLIENT_SECRET,
  //     accessToken: code,
  //   });

  //   try {
  //     // access token 가져오기
  //     const res = await axios.post(
  //       "http://35.247.33.79:8080/v1/social/signup/kakao",
  //       payload
  //     );

  //     // Kakao Javascript SDK 초기화
  //     // window.Kakao.init(REST_API_KEY);
  //     // access token 설정
  //     // window.Kakao.Auth.setAccessToken(res.data.access_token);
  //     // setUser(true);
  //     // navigate("/feed");
  //     alert(res);
  //   } catch (err) {
  //     alert(err);
  //   }
  // };

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
      // window.Kakao.init(REST_API_KEY);
      // access token 설정
      // window.Kakao.Auth.setAccessToken(res.data.access_token);
      axios
        .post(
          `http://35.247.33.79:8080/v1/social/signup/kakao`,
          { accessToken: res.data.access_token },
          {
            headers: {
              "Content-Type": "application/json",
              withCredentials: true,
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods":
                "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            },
          }
        )
        .then((response) => {
          console.log("회원가입 성공" + response);
          axios
            .post(
              `http://35.247.33.79:8080/v1/social/login/kakao`,
              { accessToken: res.data.access_token },
              {
                headers: {
                  "Content-Type": "application/json",
                  withCredentials: true,
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Methods":
                    "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                },
              }
            )
            .then((res) => {
              console.log(res);
              setUser(true);
              //navigate("/feed");
              //getProfile();
            });
        })
        .catch((err) => {
          console.log("원래 회원");
          axios
            .post(
              `http://35.247.33.79:8080/v1/social/login/kakao`,
              { accessToken: res.data.access_token },
              {
                headers: {
                  "Content-Type": "application/json",
                  withCredentials: true,
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Methods":
                    "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                },
              }
            )
            .then((res) => {
              console.log(res);
              setUser(true);
              setAcessToken(res.data.data.accessToken);
              navigate("/feed");
              //getProfile();
            });
        });
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  // useEffect(() => {
  //   request("post", "/hello", { 1: "hello" }).then;
  // }, []);

  return <div>wait</div>;
};

export default Auth;
