import styled from "styled-components";
import { Helmet } from "react-helmet";
import Header from "../format/Header";
import Navbar from "../format/Navbar";
import { useQuery } from "react-query";
import { fetchLocations } from "../api";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isXAtom, isYAtom } from "../atoms";
import { OPEN_KEY } from "../Key";
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const FeedBox = styled.div`
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

      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Container>
            {data?.slice(0, 20).map((e) => (
              <FeedBox key={e.contentid}>
                <Img src={e.firstimage} />
              </FeedBox>
            ))}
          </Container>
        )}
      </div>
    </>
  );
}
