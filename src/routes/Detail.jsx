import Header from "../format/Header";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import {
  AnimatePresence,
  useMotionValue,
  useTransform,
  LayoutGroup,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const Total = styled(motion.div)``;
const Container = styled(motion.div)`
  width: 85vw;
  margin: 5vh auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f0eded;
  min-height: 80vh;
  border-radius: 100px;
  box-shadow: 0 10px 10px rgba(35, 35, 35, 0.3), 0 10px 20px rgba(0, 0, 0, 0.3);
  color: black;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;

  margin-bottom: 24vh;
`;

const AniTab = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RelaBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const FeedBox = styled(motion.div)`
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 70%;
`;
const Img = styled(motion.img)`
  width: 60vh;
  height: inherit;
  position: absolute;
`;

const InfoTab = styled(motion.div)`
  margin-top: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const visVar = {
  entry: (back) => ({ x: back ? -500 : 500, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (back) => ({ x: back ? 500 : -500, opacity: 0 }),
};

const Icon = styled(FontAwesomeIcon)`
  cursor: pointer;
  z-index: 100;
  margin-left: 35vh;
  margin-right: 35vh;
  &:hover {
    color: #1e1e1e;
  }
`;

const HeaderBox = styled(motion.div)``;

export default function Detail() {
  const {
    state: { location: sight },
  } = useLocation();

  const imgArr = [sight.firstimage, sight.firstimage2];

  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState(false);
  const next = () => {
    setBack(false);
    setVisible((prev) => (prev == imgArr.length ? 1 : prev + 1));
  };
  const prev = () => {
    setBack(true);
    setVisible((prev) => (prev == 1 ? imgArr.length : prev - 1));
  };

  console.log(imgArr.length);
  console.log(imgArr);
  console.log(sight);
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
          <Title>{sight.title}</Title>
          <AniTab>
            <LayoutGroup>
              <HeaderBox whileHover={{ scale: 1.5 }} whileTap={{ scale: 0.8 }}>
                <Icon onClick={prev} icon={faAngleLeft} />
              </HeaderBox>
              <RelaBox>
                <AnimatePresence custom={back}>
                  <Img
                    src={imgArr[visible - 1]}
                    custom={back}
                    variants={visVar}
                    initial="entry"
                    animate="center"
                    exit="exit"
                    key={visible}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                </AnimatePresence>
              </RelaBox>
              <HeaderBox whileHover={{ scale: 1.5 }} whileTap={{ scale: 0.8 }}>
                <Icon onClick={next} icon={faAngleRight} />
              </HeaderBox>
            </LayoutGroup>
          </AniTab>
          <InfoTab>
            <div>
              {sight.addr1} {sight.addr2}
            </div>
            <div>{sight.tel}</div>
          </InfoTab>
        </Container>
      </Total>
    </>
  );
}
