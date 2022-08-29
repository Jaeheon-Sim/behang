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

const Links = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: black;
`;
export default function Feed() {
  const setX = useSetRecoilState(isXAtom);
  const isX = useRecoilValue(isXAtom);
  const setY = useSetRecoilState(isYAtom);
  const isY = useRecoilValue(isYAtom);
  const isAccessToken = useRecoilValue(isAccessTokenAtom);
  const [data, setCoins] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [ref, inView] = useInView();
  const [isPageNum, setPageNum] = useState(10);
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
    // console.log(inView);
    // axios
    //   .get(
    //     `http://apis.data.go.kr/B551011/KorService/locationBasedList?serviceKey=${OPEN_KEY}&_type=json&MobileOS=WIN&numOfRows=100&MobileApp=test&mapX=${isY}&mapY=${isX}&radius=10000`,
    //     { headers: { "Content-Type": "application/json" } }
    //   )
    //   .then((response) => {
    //     console.log(response);
    //     setCoins(response.data.response.body.items.item);
    //     setLoading(false);
    //   });

    // axios
    //   .get(
    //     `/locationBasedList?serviceKey=${OPEN_KEY}&_type=json&MobileOS=WIN&numOfRows=10&MobileApp=test&mapX=${isY}&mapY=${isX}&radius=10000`,
    //     { headers: { "Content-Type": "application/json" } }
    //   )
    //   .then((response) => {
    //     setCoins(response.data.response.body.items.item);

    //     setLoading(false);
    //   });
    console.log("update");
    fetch(`http://35.247.33.79:80/posts/feed?page=0&size=${isPageNum}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((e) => e.json())
      .then((res) => {
        setCoins(res.list);
        setPageNum((prev) => prev + 10);
        setLoading(false);
      });

    // axios
    //   .get(`http://35.247.33.79:80/posts/feed?page=0&size=10`, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       withCredentials: false,
    //       "Access-Control-Allow-Origin": "*",
    //       "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response);
    //     // setCoins(response.data.response.body.items.item);
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     console.log(isAccessToken);
    //   });

    // (async () => {
    //   const response = await fetch(
    //     `http://apis.data.go.kr/B551011/KorService/locationBasedList?serviceKey=${OPEN_KEY}&_type=json&MobileOS=WIN&numOfRows=100&MobileApp=test&mapX=${isY}&mapY=${isX}&radius=10000`
    //   );

    //   const json = await response.json();

    //   setCoins(json.response.body.items.item);
    //   setLoading(false);
    // })();

    // request(
    //   "post",
    //   `/locationBasedList?serviceKey=${OPEN_KEY}&_type=json&MobileOS=WIN&numOfRows=100&MobileApp=test&mapX=${isY}&mapY=${isX}&radius=10000`,
    //   {}
    // )
    //   .then((res) => {
    //     alert("완료");
    //   })
    //   .catch((err) => {
    //     alert(err);
    //   });
  }, [inView]);

  return (
    <>
      <Helmet>
        <title>Feed</title>
      </Helmet>

      <Header />
      <Total
      // initial={{ scale: 0 }}
      // animate={{ scale: 1 }}
      // transition={{ type: "spring", duration: 1.4 }}
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
          </Wrapper>
        )}
      </Total>
    </>
  );
}
