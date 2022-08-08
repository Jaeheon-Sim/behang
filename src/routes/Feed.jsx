import styled from "styled-components";
import { Helmet } from "react-helmet";
import Header from "../format/Header";
import Navbar from "../format/Navbar";
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const FeedBox = styled.div`
  width: auto;
  height: 30vh;
  background-color: #d9d9d9;
  margin: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Feed() {
  return (
    <>
      <Helmet>
        <title>Feed</title>
      </Helmet>
      <Header />
      <Navbar />
      <Container>
        <FeedBox>feed</FeedBox>
        <FeedBox>feed</FeedBox>
        <FeedBox>feed</FeedBox>
        <FeedBox>feed</FeedBox>
      </Container>
    </>
  );
}
