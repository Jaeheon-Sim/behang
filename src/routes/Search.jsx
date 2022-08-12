import Header from "../format/Header";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  isParkAtom,
  isInsideAtom,
  isKidsAtom,
  isPetAtom,
  isPublicAtom,
  isSomeAtom,
  isUserAtom,
} from "../atoms";

const Total = styled(motion.div)``;

const Container = styled.div`
  overflow: hidden;
  width: 85vw;
  margin: 5vh auto;
  background-color: rgba(255, 255, 255, 0.6);
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
  min-width: 70%;
  height: 25px;
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
const ListImg = styled.div`
  width: 100px;
  height: 80px;
  background-color: grey;
  margin: 5px;
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

const filterVari = {
  hover: (i) => ({
    backgroundColor: i ? "rgb(59, 78, 197)" : "rgb(170, 170, 170)",
    transition: {
      duration: 0.2,
    },
  }),
  push: (i) => ({
    backgroundColor: i ? "rgb(69, 90, 228)" : "rgb(217, 217, 217)",
    transition: {
      duration: 0.2,
    },
  }),
};

export default function Search() {
  const setPark = useSetRecoilState(isParkAtom);
  const isPark = useRecoilValue(isParkAtom);
  const setInside = useSetRecoilState(isInsideAtom);
  const isInside = useRecoilValue(isInsideAtom);
  const setKids = useSetRecoilState(isKidsAtom);
  const isKids = useRecoilValue(isKidsAtom);
  const setPet = useSetRecoilState(isPetAtom);
  const isPet = useRecoilValue(isPetAtom);
  const setPublic = useSetRecoilState(isPublicAtom);
  const isPublic = useRecoilValue(isPublicAtom);
  const setSome = useSetRecoilState(isSomeAtom);
  const isSome = useRecoilValue(isSomeAtom);

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
            <FontAwesomeIcon icon={faMap} />
            <SearchInput placeholder="원하는 여행지를 검색하세요!" />
          </SearchTab>

          <TagTab>
            <TagsBox>
              <Tag
                variants={filterVari}
                custom={isPark}
                whileHover="hover"
                animate="push"
                onClick={() => setPark((current) => !current)}
              >
                편리한 주차
              </Tag>
              <Tag
                variants={filterVari}
                custom={isPublic}
                whileHover="hover"
                animate="push"
                onClick={() => setPublic((current) => !current)}
              >
                편리한 대중교통
              </Tag>
              <Tag
                variants={filterVari}
                custom={isKids}
                whileHover="hover"
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
                animate="push"
                onClick={() => setInside((current) => !current)}
              >
                실내
              </Tag>
              <Tag
                variants={filterVari}
                custom={isPet}
                whileHover="hover"
                animate="push"
                onClick={() => setPet((current) => !current)}
              >
                반려 동물과 함께
              </Tag>
              <Tag
                variants={filterVari}
                custom={isSome}
                whileHover="hover"
                animate="push"
                onClick={() => setSome((current) => !current)}
              >
                연인과 함께
              </Tag>
            </TagsBox>
          </TagTab>
          <ListTab>
            <ListBox>
              <ListImg src="#" />
              <ListContent>
                <Place>유정빌</Place>
                <HearBox>
                  <HeartImg>
                    <FontAwesomeIcon icon={faHeart} />
                  </HeartImg>
                  <HeartCount>1234123</HeartCount>
                </HearBox>
                <LocationBox>
                  <Distance>21332.km</Distance>
                  <Location>경대로 7길 59</Location>
                </LocationBox>
              </ListContent>
            </ListBox>
          </ListTab>
        </Container>
      </Total>
    </>
  );
}
