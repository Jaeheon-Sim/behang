import Header from "../format/Header";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { OPEN_KEY } from "../Key";
import { useInView } from "react-intersection-observer";
import {
  isParkAtom,
  isInsideAtom,
  isKidsAtom,
  isPetAtom,
  isPublicAtom,
  isSomeAtom,
  isUserAtom,
} from "../atoms";
import { useNavigate } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";
import SearchResult from "../format/SearchResult";

const Total = styled(motion.div)``;
const Title = styled(motion.h1)`
  font-size: 2rem;
`;
const Container = styled.div`
  overflow: hidden;
  width: 85vw;
  margin: 5vh auto;
  background-color: #f0eded;
  min-height: 80vh;
  border-radius: 100px;
  box-shadow: 0 10px 10px rgba(35, 35, 35, 0.3), 0 10px 20px rgba(0, 0, 0, 0.3);
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const SearchTab = styled.div`
  margin-top: 4vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchInput = styled.input`
  margin-left: 15px;
  width: 80%;
  height: 3.5vh;
  &:focus {
    outline-color: #455ae4;
  }
`;

const ListTab = styled.div`
  font-size: 1.2rem;
  color: black;
`;
const ListBox = styled.div`
  border-bottom: 1px solid grey;
  display: flex;
  height: auto;

  padding: 15px;
`;
const ListImg = styled.img`
  width: 100px;
  height: 80px;
  background-color: grey;
  margin: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const ListContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 8px;
`;

const Place = styled.div``;
const HearBox = styled.div``;
const HeartImg = styled.span`
  color: red;
`;
const HeartCount = styled.span`
  margin-left: 10px;
`;
const LocationBox = styled.div``;
const Distance = styled.span``;
const Location = styled.span``;

const IconDiv = styled(motion.div)``;

const Icon = styled(FontAwesomeIcon)`
  cursor: pointer;
`;

const MoreDiv = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  padding-top: 15px;
  padding-bottom: 5px;
  height: auto;
  cursor: pointer;
`;

const RefDiv = styled.div`
  display: ${(props) => (props.show ? "none" : null)};
  width: 100px;
  height: 100px;
  background-color: white;
`;

export default function Search() {
  const [isE, setE] = useState(true);
  const [isSearch, setSearch] = useState("");
  const [isFirst, setFirst] = useState(true);
  const [isList, setList] = useState([]);
  const [isPageNum, setPageNum] = useState(10);
  const [isDone, setDone] = useState(false);

  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  const moreInfo = () => {
    searchapi();
  };

  const searchapi = () => {
    const len = isList.length;

    (async () => {
      try {
        const response = await fetch(
          `http://apis.data.go.kr/B551011/KorService/searchKeyword?serviceKey=${OPEN_KEY}&_type=json&MobileOS=WIN&numOfRows=${isPageNum}&MobileApp=test&arrange=P&keyword=${isSearch}`
        );
        const json = await response.json();
        if (json.response.body.items === "") {
          setE(true);
          setList([]);
        } else {
          setE(false);
          setFirst(false);
          setLoading(false);
          setList(json.response.body.items.item);
          setPageNum((prev) => prev + 10);
          if (len === json.response.body.items.item.length) {
            setDone(true);
          }
        }
      } catch (err) {
        setE(true);
        setList([]);
      }
    })();
  };

  const onSearch = (e) => {
    setLoading(true);
    setPageNum(10);
    setDone(false);
    setFirst(false);
    searchapi();
  };

  const onInput = (e) => {
    setList([]);
    setE(false);
    setSearch(e.target.value);
  };
  // console.log(isPageNum);
  return (
    <>
      <Helmet>
        <title>비행 검색</title>
      </Helmet>

      <Header />
      <Total
        initial={{ y: 500 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 1.4 }}
      >
        <Container>
          <SearchTab>
            <IconDiv whileHover={{ scale: 1.3 }} whileTap={{ scale: 1 }}>
              <Icon icon={faMagnifyingGlass} onClick={onSearch} />
            </IconDiv>
            <SearchInput
              onChange={onInput}
              value={isSearch}
              placeholder="원하는 여행지를 검색하세요!"
              minLength="2"
            />
          </SearchTab>

          <ListTab>
            {isSearch === "" || isFirst === true ? (
              <>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <SearchTab>
                  <Title initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    검색어를 입력 후 돋보기를 누르세요!
                  </Title>
                </SearchTab>
              </>
            ) : isE ? (
              <>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <SearchTab>
                  <Title initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    올바른 검색어를 입력하세요!
                  </Title>
                </SearchTab>
              </>
            ) : isLoading ? (
              <>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <SearchTab>
                  <Title
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "reverse",
                      repeatDelay: 0.5,
                    }}
                  >
                    조금만 기다려주세요!
                  </Title>
                </SearchTab>
              </>
            ) : (
              <>
                {isList?.map((e) => (
                  <ListBox
                    key={e.contentid}
                    onClick={() => {
                      // console.log(e);
                      navigate(`/search/${e.contentid}`, {
                        state: e,
                      });
                    }}
                  >
                    <ListImg src={e.firstimage} alt="이미지가 없어요" />
                    <ListContent>
                      <Place>{e.title}</Place>
                      {/* <HearBox>
                        <HeartImg>
                          <FontAwesomeIcon icon={faHeart} />
                        </HeartImg>
                        <HeartCount>1234123</HeartCount>
                      </HearBox> */}

                      <LocationBox>
                        <Location>{e.addr1}</Location>
                      </LocationBox>
                    </ListContent>
                  </ListBox>
                ))}
                {!isDone ? (
                  <MoreDiv
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 1 }}
                    onClick={moreInfo}
                  >
                    <IconDiv style={{ marginRight: "10px" }}>
                      <Icon icon={faAngleDown} />
                    </IconDiv>
                    더보기
                  </MoreDiv>
                ) : null}
              </>
            )}
          </ListTab>
        </Container>
      </Total>
    </>
  );
}
