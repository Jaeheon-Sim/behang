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
  justify-content: flex-start;
  align-items: center;
  background-color: #f0eded;
  min-height: 80vh;
  border-radius: 100px;
  box-shadow: 0 10px 10px rgba(35, 35, 35, 0.3), 0 10px 20px rgba(0, 0, 0, 0.3);
  color: black;
  padding-top: 2vh;
  padding-bottom: 2vh;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4vh;
  margin-bottom: 22vh;
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
  @media screen and (max-width: 500px) {
    display: none;
  }
  position: absolute;
`;

const InfoTab = styled(motion.div)`
  margin-top: 26vh;
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
  @media screen and (min-width: 1400px) {
    width: 51%;
  }
`;
const Tag = styled(motion.button)`
  width: 25vh;
  @media screen and (max-width: 1400px) {
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
    color: i ? "white" : "black",
    transition: {
      duration: 0.2,
    },
  }),
};

export default function Detail() {
  const { state } = useLocation();
  // const state = useLocation();
  // console.log(state);
  const [imgArr, setImgArr] = useState([]);

  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState(false);
  const next = () => {
    setBack(false);
    setVisible((prev) => (prev === imgArr.length ? 1 : prev + 1));
  };
  const prev = () => {
    setBack(true);
    setVisible((prev) => (prev === 1 ? imgArr.length : prev - 1));
  };

  const getImg = (contentId) => {
    fetch(`http://35.247.33.79:8080/posts/feed/place/${contentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((e) => e.json())
      .then((res) => {
        console.log(res);
        if (res.code === -1017) {
        } else {
          res.list.map((e) => {
            setImgArr((prev) => [...prev, e.imageUrl]);
            // setLoading(false);
          });
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    setImgArr((prev) => [...prev, state.firstimage]);
    getImg(state.contentid);
  }, []);
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
        <Container>
          <Title>{state.title}</Title>
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
              {state.addr1} {state.addr2}
            </div>
            <div>{state.tel}</div>
          </InfoTab>
          {/* <TagTab>
            <TagsBox>
              <Tag
                variants={filterVari}
                custom={true}
                whileHover="hover"
                whileTap="tap"
                animate="push"
              >
                편리한 주차
              </Tag>
              <Tag
                variants={filterVari}
                custom={true}
                whileHover="hover"
                whileTap="tap"
                animate="push"
              >
                편리한 대중교통
              </Tag>
              <Tag
                variants={filterVari}
                custom={true}
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
                custom={true}
                whileHover="hover"
                whileTap="tap"
                animate="push"
              >
                실내
              </Tag>
              <Tag
                variants={filterVari}
                custom={true}
                whileHover="hover"
                whileTap="tap"
                animate="push"
              >
                반려 동물과 함께
              </Tag>
              <Tag
                variants={filterVari}
                custom={true}
                whileHover="hover"
                whileTap="tap"
                animate="push"
              >
                연인과 함께
              </Tag>
            </TagsBox>
          </TagTab> */}
        </Container>
      </Total>
    </>
  );
}

// http://apis.data.go.kr/B551011/KorService/detailIntro
