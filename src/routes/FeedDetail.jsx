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
  height: auto;
  max-height: 477px;

  position: absolute;
`;

const InfoTab = styled(motion.div)`
  margin-top: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TagTab = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;
const TagsBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  width: 70%;
  @media screen and (min-width: 1000px) {
    width: 51%;
  }
`;
const Tag = styled(motion.button)`
  width: 20vh;
  @media screen and (min-width: 1000px) {
    width: 30vh;
  }
  border-radius: 20px;
  border: none;
  /* background-color: ${(props) => (props.isActive ? "#455ae4" : "#d9d9d9")};
  &:hover {
    background-color: ${(props) => (props.isActive ? "#2f3ea0" : "#aaaaaa")};
  } */
  //background-color: $(props) =>;
  font-family: "Jua", sans-serif;
  margin: 0 5px 0 5px;
  font-size: 1.3rem;
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

const filterVari = {
  hover: (i) => ({
    backgroundColor: i ? "rgb(59, 78, 197)" : "rgb(170, 170, 170)",
    y: -10,
    transition: {
      duration: 0.2,
    },
  }),
  tap: {
    y: 0,
  },
  push: (i) => ({
    backgroundColor: i ? "rgb(69, 90, 228)" : "rgb(217, 217, 217)",
    transition: {
      duration: 0.2,
    },
  }),
};

export default function FeedDetail() {
  const { state } = useLocation();
  // const state = useLocation();
  // console.log(state);
  const [data, setData] = useState([]);
  const [imgArr, setImgArr] = useState([]);
  const [visible, setVisible] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [back, setBack] = useState(false);
  const next = () => {
    setBack(false);
    setVisible((prev) => (prev == imgArr.length ? 1 : prev + 1));
  };
  const prev = () => {
    setBack(true);
    setVisible((prev) => (prev == 1 ? imgArr.length : prev - 1));
  };

  useEffect(() => {
    fetch(`http://35.247.33.79:80/posts/${state.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((e) => e.json())
      .then((res) => {
        setData(res.data);
        setImgArr(res.data.imageUrl);
        setLoading(false);
      });
  }, []);
  console.log(data);
  console.log(imgArr);
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
        {isLoading ? (
          <Container
            initial={{ backgroundColor: "rgba(255, 255, 255,0.6)" }}
            animate={{
              backgroundColor: "rgba(120, 119, 119,0.6)",
            }}
            transition={{
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 0.5,
            }}
            exit={{ backgroundColor: "rgb(217, 217, 217)" }}
          >
            <Title>Loading...</Title>
          </Container>
        ) : (
          <Container>
            <Title>{data.place.name}</Title>
            <AniTab>
              <LayoutGroup>
                <HeaderBox
                  whileHover={{ scale: 1.5 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <Icon onClick={prev} icon={faAngleLeft} />
                </HeaderBox>
                <RelaBox>
                  <AnimatePresence custom={back}>
                    <Img
                      src={"http://35.247.33.79:80/" + imgArr}
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
                <HeaderBox
                  whileHover={{ scale: 1.5 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <Icon onClick={next} icon={faAngleRight} />
                </HeaderBox>
              </LayoutGroup>
            </AniTab>

            <InfoTab>
              <div>
                {data.place.address} {state.addr2}
              </div>
              <div>{data.place.phoneNumber}</div>
            </InfoTab>
            <TagTab>
              <TagsBox>
                <Tag
                  variants={filterVari}
                  custom={data.tag.convenientParking}
                  whileHover="hover"
                  whileTap="tap"
                  animate="push"
                >
                  편리한 주차
                </Tag>
                <Tag
                  variants={filterVari}
                  custom={data.tag.comfortablePubTransit}
                  whileHover="hover"
                  whileTap="tap"
                  animate="push"
                >
                  편리한 대중교통
                </Tag>
                <Tag
                  variants={filterVari}
                  custom={data.tag.withChild}
                  whileHover="hover"
                  whileTap="tap"
                  animate="push"
                >
                  아이와 함께
                </Tag>
              </TagsBox>
              <TagsBox>
                <Tag
                  variants={filterVari}
                  custom={data.tag.indoor}
                  whileHover="hover"
                  whileTap="tap"
                  animate="push"
                >
                  실내
                </Tag>
                <Tag
                  variants={filterVari}
                  custom={data.tag.withMyDog}
                  whileHover="hover"
                  whileTap="tap"
                  animate="push"
                >
                  반려 동물과 함께
                </Tag>
                <Tag
                  variants={filterVari}
                  custom={data.tag.withLover}
                  whileHover="hover"
                  whileTap="tap"
                  animate="push"
                >
                  연인과 함께
                </Tag>
              </TagsBox>
            </TagTab>
          </Container>
        )}
      </Total>
    </>
  );
}

// http://apis.data.go.kr/B551011/KorService/detailIntro
