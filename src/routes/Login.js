import { Helmet } from "react-helmet";
import styled from "styled-components";
import logo from "../images/logo.png";
import kakaologin from "../images/kakao_login_medium_wide.png";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isUserAtom } from "../atoms";

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

  const onClick = () => {
    console.log("hi");
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
        <Tab>
          <Img src={logo} alt="no" />
        </Tab>

        <LoginTab>
          <LoginButton type="button" onClick={onClick}>
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
      </Container>
    </>
  );
}
