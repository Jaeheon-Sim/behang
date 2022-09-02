import styled from "styled-components";
import { Helmet } from "react-helmet";
import Header from "../format/Header";
import { motion } from "framer-motion";
import { fetchLocations } from "../api";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isXAtom, isYAtom, isAccessTokenAtom } from "../atoms";
import { OPEN_KEY } from "../Key";
import axios from "axios";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const Total = styled(motion.div)``;
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: inherit;
  height: inherit;
`;

const Wrapper = styled(motion.div)`
  width: 85vw;
  margin: 5vh auto;
  background-color: #f0eded;
  min-height: 85vh;
  border-radius: 100px;
  box-shadow: 0 10px 10px rgba(35, 35, 35, 0.3), 0 10px 20px rgba(0, 0, 0, 0.3);
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
`;
const FeedBox = styled(motion.div)`
  width: 90%;
  height: 90%;
  background-color: #ececec;
  margin: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 5px rgba(35, 35, 35, 0.3), 0 10px 10px rgba(0, 0, 0, 0.3);
  overflow: hidden;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const Div = styled.div`
  position: absolute;
  top: 55%;
  left: 45%;
`;

const FinalTab = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FinalDiv = styled(motion.div)`
  height: auto;
`;

const Links = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: black;
`;

const RefDiv = styled.div`
  ${({ last }) => {
    return last ? `display: hidden` : null;
  }}
`;

export default function Feed() {
  const setX = useSetRecoilState(isXAtom);
  const isX = useRecoilValue(isXAtom);
  const setY = useSetRecoilState(isYAtom);
  const isY = useRecoilValue(isYAtom);
  const isAccessToken = useRecoilValue(isAccessTokenAtom);
  const [data, setCoins] = useState([]);
  const [last, setLast] = useState(false);
  const [extraLoading, setExtraLoading] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [ref, inView] = useInView();
  const [isPageNum, setPageNum] = useState(10);

  const Locate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setX(position.coords.latitude); // 위도
          setY(position.coords.longitude); // 경도
        },
        (err) => {}
      );
    } else {
    }
  };

  useEffect(() => {
    setExtraLoading(true);
    Locate();
    console.log(isX, isY);
    fetch(
      `http://35.247.33.79:80/posts/feed/sort=Distance?page=0&size=${isPageNum}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          curX: isX,
          curY: isY,
        }),
      }
    )
      .then((e) => e.json())
      .then((res) => {
        setExtraLoading(false);
        setCoins(res.list);
        setPageNum((prev) => prev + 10);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [inView]);

  return (
    <>
      <Helmet>
        <title>비행 피드</title>
      </Helmet>

      <Header />
      <Total>
        {isLoading ? (
          <Wrapper
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
            <Div>Loading...</Div>
          </Wrapper>
        ) : (
          <Wrapper>
            <Container>
              {data?.map((e) => {
                return (
                  <Links key={e.id} to={`/feed/${e.id}`} state={e}>
                    <FeedBox
                      whileHover={{ scale: 1.07 }}
                      whileTap={{ scale: 0.8 }}
                    >
                      <Img
                        alt="오류가 있어요."
                        src={"http://35.247.33.79:80/" + e.imageUrl}
                      />
                    </FeedBox>
                  </Links>
                );
              })}

              <div ref={ref} />
            </Container>
            {extraLoading ? (
              <FinalTab
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
                style={{ width: "100%" }}
              >
                <FinalDiv>Loading...</FinalDiv>
              </FinalTab>
            ) : (
              <FinalTab>
                <FinalDiv>마지막 사진이에요.</FinalDiv>
              </FinalTab>
            )}
          </Wrapper>
        )}
      </Total>
    </>
  );
}
