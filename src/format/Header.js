import logo from "../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;
  margin-bottom: -15px;
  width: 100%;
  font-size: 15px;
`;

const HeaderBox = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderTab = styled.div`
  margin-left: 10px;
  display: flex;
  align-items: center;
`;
const SearchTab = styled(HeaderTab)`
  width: 15vh;
`;
const HeaderImg = styled.img`
  width: 180px;
  height: 100px;
`;

const DDD = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  background-color: #d9d9d9;
  border-radius: 15px;
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
  color: white;
  background-color: inherit;
  display: flex;
  justify-content: center;
  margin-right: 2px;
  padding: 5px;
  color: #455ae4;
`;
export default function Header() {
  return (
    <>
      <Head>
        <HeaderBox>
          <HeaderTab>
            <HeaderImg src={logo} alt="no" />
          </HeaderTab>
          <HeaderTab>sadfsdfasf</HeaderTab>
        </HeaderBox>
        <HeaderBox></HeaderBox>
        <HeaderBox>
          <HeaderTab>
            <DDD>
              <NavLink to={"/upload"}>
                사진 올리기 <FontAwesomeIcon icon={faPlus} />
              </NavLink>
            </DDD>
          </HeaderTab>
          <HeaderTab></HeaderTab>
        </HeaderBox>
      </Head>
    </>
  );
}
