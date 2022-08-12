import styled from "styled-components";
import { Helmet } from "react-helmet";
import Header from "../format/Header";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { fetchLocations } from "../api";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isXAtom, isYAtom } from "../atoms";
import { OPEN_KEY } from "../Key";
import { Link } from "react-router-dom";
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
  background-color: rgba(255, 255, 255, 0.6);
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
  background-color: #d9d9d9;
  margin: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Img = styled.img`
  width: inherit;
  height: inherit;
`;

const Div = styled.div`
  position: absolute;
  top: 55%;
  left: 45%;
`;
export default function Feed() {
  const setX = useSetRecoilState(isXAtom);
  const isX = useRecoilValue(isXAtom);
  const setY = useSetRecoilState(isYAtom);
  const isY = useRecoilValue(isYAtom);

  // const { isLoading, data } = useQuery("location", fetchLocations);
  const [data, setCoins] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const Locate = () => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setX(position.coords.latitude); // 위도
          setY(position.coords.longitude); // 경도
        },
        (err) => {}
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
    }
  };

  useEffect(() => {
    Locate();
    (async () => {
      const response = await fetch(
        `http://apis.data.go.kr/B551011/KorService/locationBasedList?serviceKey=${OPEN_KEY}&_type=json&MobileOS=WIN&numOfRows=100&MobileApp=test&mapX=${isY}&mapY=${isX}&radius=10000`
      );

      const json = await response.json();
      setCoins(json.response.body.items.item);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <Helmet>
        <title>Feed</title>
      </Helmet>

      <Header />
      <Total
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 1.4 }}
      >
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
              {data?.slice(0, 20).map((e) => (
                <Link to={`/feed/${e.contentid}`}>
                  <FeedBox key={e.contentid}>
                    <Img src={e.firstimage} />
                  </FeedBox>
                </Link>
              ))}
            </Container>
          </Wrapper>
        )}
      </Total>
    </>
  );
}
