import { Helmet } from "react-helmet";
import styled from "styled-components";
import logo from "../images/logo.png";
import kakaologin from "../images/kakao_login_medium_wide.png";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isUserAtom } from "../atoms";
import { useEffect } from "react";
import { CLIENT_ID, REDIRECT_URI } from "../KakaoKey";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 600px;
  margin: 0 auto;
  display: block;
`;
const Tab = styled.div`
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 5px;
`;

const LoginButton = styled.div`
  border-radius: none;
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;

const Img = styled.img`
  width: 50%;
  height: 50%;
  margin-top: 20%;
`;
const LoginTab = styled(Tab)`
  margin-bottom: 15px;
`;
const GuestLoginTab = styled(Tab)`
  margin-top: 50px;
  border-bottom: 2.5px solid;
  display: inline-block;
  color: black;
`;

const Links = styled(Link)`
  text-decoration: none;
`;

export default function Login() {
  const setUser = useSetRecoilState(isUserAtom);
  // kakao login
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const location = useLocation();
  const AUTHORIZE_CODE = location.search.split("=")[1];

  const navigate = useNavigate();

  const kakaoLogin = () => {};

  // const getKakaoToken = () => {
  //   fetch(`https://kakao.com/oauth/token`, {
  //     method: "POST",
  //     headers: { "Content-Type": `application/x-www-form-urlencoded` },
  //     body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${AUTHORIZE_CODE}`,
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.access_token) {
  //         console.log(data.access_token);
  //         navigate("/");
  //       } else {
  //         console.log("NO");
  //         navigate("/");
  //       }
  //     });
  // };

  const onClick = () => {
    window.location.href = KAKAO_AUTH_URL;
  };
  const guestOnClick = () => {
    setUser(true);
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <Container>
        <LoginButton>
          <Img src={logo} alt="no" />
        </LoginButton>
        <Tab>어쩌구 저쩌구</Tab>
        <LoginTab>
          <LoginButton onClick={onClick}>
            <img src={kakaologin} alt="no" />
          </LoginButton>
        </LoginTab>

        <LoginTab>
          <GuestLoginTab>
            <Links to={`/`} onClick={guestOnClick}>
              로그인없이 입장
            </Links>
          </GuestLoginTab>
        </LoginTab>
        {/* <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
        <script>
          {" "}
          window.Kakao.init("1c2ed58cf555caa8291d502a8c3bd9f4") function
          kakaoLogin(){window.Kakao.Auth.login({ scope: "profile_nickname" })}
        </script> */}
      </Container>
    </>
  );
}
