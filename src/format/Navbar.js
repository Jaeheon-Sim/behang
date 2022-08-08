import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.div`
  box-sizing: border-box;
  background-color: #455ae4;
  margin-top: 10px;
  margin-bottom: 20px;
  border-radius: 20px;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: nowrap;
  width: 100%;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: white;
  background-color: inherit;
  display: flex;
  justify-content: center;
`;

const NavTab = styled.div`
  width: 15vh;
  border-radius: 20px;
  padding: 10px;
  background-color: #455ae4;
  color: white;
  &:hover {
    background-color: #3c4dbc;
  }
  &:active {
    background-color: #1c2663;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  background-color: inherit;
`;

const Circle = styled.div`
  width: 30px;
`;

export default function Navbar() {
  return (
    <NavContainer>
      <NavTab>
        <NavLink to={"/"}>
          <Icon icon={faHouse} />
        </NavLink>
      </NavTab>
      <NavTab>
        <NavLink to={"/search"}>
          <Icon icon={faLocationDot} />
        </NavLink>
      </NavTab>
      <NavTab>
        <NavLink to={"/map"}>
          <Icon icon={faFlag} />
        </NavLink>
      </NavTab>
      <NavTab>
        <NavLink to={"/mypage"}>
          <Icon icon={faUser} />
        </NavLink>
      </NavTab>
    </NavContainer>
  );
}
