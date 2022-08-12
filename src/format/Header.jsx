import logo from "../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue } from "recoil";
import { isUserAtom } from "../atoms";

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;

  width: 100%;
  font-size: 25px;
`;

const HeaderBox = styled(motion.div)``;

const HeaderTab = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: -20px;
`;
const SearchTab = styled(HeaderTab)`
  width: 15vh;
`;
const HeaderImg = styled.img`
  width: 150px;
  height: 100px;
`;

const HeaderTitle = styled.div`
  margin-left: -35px;
`;

const DDD = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  background-color: #d9d9d9;
  border-radius: 20px;
  padding: 5px;
  &:hover {
    background-color: #bfbdbd;
  }
  &:active {
    background-color: #f5f5f5;
  }
`;
const SearchInput = styled.input``;
const NavLink = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: center;
  margin-right: 2px;
  padding: 5px;
  color: black;
`;

const NavContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 40%;
  justify-content: space-evenly;
`;

const NavTab = styled.div`
  margin-right: 2vh;
  display: flex;
  align-items: center;
`;

const Icon = styled(FontAwesomeIcon)`
  color: black;
`;

const Circle = styled.div`
  width: 30px;
`;

export default function Header() {
  const isUser = useRecoilValue(isUserAtom);
  return (
    <>
      <Head>
        <div>
          <HeaderTab>
            <HeaderImg src={logo} alt="no" />
            <HeaderTitle>비 행</HeaderTitle>
          </HeaderTab>
        </div>
        <NavContainer>
          <NavTab>
            <HeaderBox whileHover={{ scale: 1.5 }}>
              <NavLink to={"/feed"}>
                <Icon icon={faHouse} />
              </NavLink>
            </HeaderBox>
          </NavTab>
          <NavTab>
            <HeaderBox whileHover={{ scale: 1.5 }}>
              <NavLink to={"/search"}>
                <Icon icon={faLocationDot} />
              </NavLink>
            </HeaderBox>
          </NavTab>
          <NavTab>
            <HeaderBox whileHover={{ scale: 1.5 }}>
              <NavLink to={"/map"}>
                <Icon icon={faFlag} />
              </NavLink>
            </HeaderBox>
          </NavTab>
          <NavTab>
            <HeaderBox whileHover={{ scale: 1.5 }}>
              <NavLink to={"/mypage"}>
                <Icon icon={faUser} />
              </NavLink>
            </HeaderBox>
          </NavTab>
          <NavTab>
            <HeaderBox whileHover={{ scale: 1.5 }}>
              {isUser ? (
                // <DDD>
                <NavLink to={"/upload"}>
                  <Icon icon={faPlus} />
                </NavLink>
              ) : (
                // </DDD>
                <DDD>
                  <NavLink to={"/"}>로그인</NavLink>
                </DDD>
              )}
            </HeaderBox>
          </NavTab>
        </NavContainer>
      </Head>
    </>
  );
}
