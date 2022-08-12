import Header from "../format/Header";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import styled from "styled-components";

const Total = styled(motion.div)``;
const Container = styled.div`
  width: 85vw;
  margin: 5vh auto;
  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: white;
  min-height: 80vh;
  border-radius: 100px;
  box-shadow: 0 10px 10px rgba(35, 35, 35, 0.3), 0 10px 20px rgba(0, 0, 0, 0.3);
  color: black;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

export default function Detail() {
  return (
    <>
      <Helmet>
        <title>Map</title>
      </Helmet>

      <Header />
      <Total
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "spring", duration: 1.4 }}
      >
        <Container>
          <Title>sdㄻㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄹ</Title>
        </Container>
      </Total>
    </>
  );
}
