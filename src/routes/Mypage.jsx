import Header from "../format/Header";
import Navbar from "../format/Navbar";
import { Helmet } from "react-helmet";
import styled from "styled-components";

const Container = styled.div``;

export default function Mypage() {
  return (
    <>
      <Helmet>
        <title>Mypage</title>
      </Helmet>
      <Header />

      <Navbar />
      <Container>mypage</Container>
    </>
  );
}
