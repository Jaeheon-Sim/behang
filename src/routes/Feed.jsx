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
  overflow: hiddern;
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

const Links = styled(Link)`
  text-decoration: none;
  color: black;
`;
export default function Feed() {
  const setX = useSetRecoilState(isXAtom);
  const isX = useRecoilValue(isXAtom);
  const setY = useSetRecoilState(isYAtom);
  const isY = useRecoilValue(isYAtom);
  const [data, setCoins] = useState([]);
  const [isLoading, setLoading] = useState(true);

  // const fetchlocations = () => {
  //   (async () => {
  //     Locate();
  //     const response = await fetch(
  //       `http://apis.data.go.kr/B551011/KorService/locationBasedList?serviceKey=${OPEN_KEY}&_type=json&MobileOS=WIN&numOfRows=100&MobileApp=test&mapX=${isY}&mapY=${isX}&radius=10000`
  //     );
  //     const json = await response.json();
  //     return json.response.body.items.item;
  //   })();
  // };

  // const { isLoading, isError, data, error } = useQuery(
  //   "locations",
  //   fetchlocations,
  //   {
  //     refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
  //     retry: 0, // 실패시 재호출 몇번 할지
  //     onSuccess: (data) => {
  //       console.log(data);
  //     },
  //     onError: (e) => {
  //       console.log(e.message);
  //     },
  //   }
  // );

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
              {data?.slice(0, 20).map((e) => {
                console.log(e);
                return (
                  <Links
                    key={e.contentid}
                    to={`/feed/${e.contentid}`}
                    state={e}
                  >
                    <FeedBox
                      whileHover={{ scale: 1.07 }}
                      whileTap={{ scale: 0.8 }}
                    >
                      {e.firstimage === "" ? (
                        <div>{e.title} 이미지가 없어용 ㅜㅜ</div>
                      ) : (
                        <Img src={e.firstimage} />
                      )}
                    </FeedBox>
                  </Links>
                );
              })}
            </Container>
          </Wrapper>
        )}
      </Total>
    </>
  );
}
