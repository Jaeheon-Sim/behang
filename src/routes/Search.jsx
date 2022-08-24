import Header from "../format/Header";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { OPEN_KEY } from "../Key";
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

const TagTab = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TagsBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  width: 90%;
`;
const Tag = styled(motion.button)`
  width: 40vh;

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
const ListTab = styled.div`
  font-size: 1.2rem;
  color: black;
`;
const ListBox = styled.div`
  margin: 5px;
  border-top: 1px solid grey;
  display: flex;
  height: auto;
  margin-top: 15px;
  padding: 15px;
`;
const ListImg = styled.img`
  width: 100px;
  height: 80px;
  background-color: grey;
  margin: 5px;
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

export default function Search() {
  const [isE, setE] = useState(true);
  const [isSearch, setSearch] = useState("");
  const [isFirst, setFirst] = useState(true);
  const [isList, setList] = useState([]);
  const navigate = useNavigate();

  const onSearch = (e) => {
    setFirst(false);
    (async () => {
      try {
        const response = await fetch(
          `http://apis.data.go.kr/B551011/KorService/searchKeyword?serviceKey=${OPEN_KEY}&_type=json&MobileOS=WIN&numOfRows=10&MobileApp=test&arrange=P&keyword=${isSearch}`
        );
        const json = await response.json();
        if (json.response.body.items === "") {
          setE(true);

          setList([]);
        } else {
          setE(false);
          setFirst(false);
          setList(json.response.body.items.item);
        }
      } catch (err) {
        setE(true);
        setList([]);
      }
    })();
  };

  const onInput = (e) => {
    setList([]);
    setE(false);
    setSearch(e.target.value);
  };

  return (
    <>
      <Helmet>
        <title>search</title>
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

          {/* <TagTab>
            <TagsBox>
              <Tag
                variants={filterVari}
                custom={isPark}
                whileHover="hover"
                whileTap="tap"
                animate="push"
                onClick={() => setPark((current) => !current)}
              >
                편리한 주차
              </Tag>
              <Tag
                variants={filterVari}
                custom={isPublic}
                whileHover="hover"
                whileTap="tap"
                animate="push"
                onClick={() => setPublic((current) => !current)}
              >
                편리한 대중교통
              </Tag>
              <Tag
                variants={filterVari}
                custom={isKids}
                whileHover="hover"
                whileTap="tap"
                animate="push"
                onClick={() => setKids((current) => !current)}
              >
                아이와 함께
              </Tag>
            </TagsBox>
            <TagsBox>
              <Tag
                variants={filterVari}
                custom={isInside}
                whileHover="hover"
                whileTap="tap"
                animate="push"
                onClick={() => setInside((current) => !current)}
              >
                실내
              </Tag>
              <Tag
                variants={filterVari}
                custom={isPet}
                whileHover="hover"
                whileTap="tap"
                animate="push"
                onClick={() => setPet((current) => !current)}
              >
                반려 동물과 함께
              </Tag>
              <Tag
                variants={filterVari}
                custom={isSome}
                whileHover="hover"
                whileTap="tap"
                animate="push"
                onClick={() => setSome((current) => !current)}
              >
                연인과 함께
              </Tag>
            </TagsBox>
          </TagTab> */}
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
            ) : (
              isList?.map((e) => (
                <ListBox
                  key={e.contentid}
                  onClick={() => {
                    console.log(e);
                    navigate(`/feed/${e.contentid}`, {
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
                    <Distance>21332.km </Distance>
                    <LocationBox>
                      <Location>{e.addr1}</Location>
                    </LocationBox>
                  </ListContent>
                </ListBox>
              ))
            )}
          </ListTab>
        </Container>
      </Total>
    </>
  );
}
