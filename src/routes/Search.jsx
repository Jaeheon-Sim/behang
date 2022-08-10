import Header from "../format/Header";

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

const SearchTab = styled.div`
  display: flex;
  margin-left: 30px;
  align-items: center;
`;

const SearchInput = styled.input`
  margin-left: 15px;
  width: 90%;
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
const Tag = styled.button`
  width: 300px;
  height: 3.54vh;
  border-radius: 20px;
  border: none;
  background-color: ${(props) => (props.isActive ? "#455ae4" : "#d9d9d9")};
  &:hover {
    background-color: ${(props) => (props.isActive ? "#2f3ea0" : "#aaaaaa")};
  }
  //background-color: $(props) =>;
  color: white;

  margin: 0 5px 0 5px;
`;
const ListTab = styled.div`
  font-size: 1rem;
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
      <form>
        <SearchTab>
          <FontAwesomeIcon icon={faMap} />
          <SearchInput placeholder="원하는 여행지를 검색하세요!" />
        </SearchTab>
      </form>
      <TagTab>
        <TagsBox>
          <Tag isActive={isPark} onClick={() => setPark((current) => !current)}>
            편리한 주차
          </Tag>
          <Tag
            isActive={isPublic}
            onClick={() => setPublic((current) => !current)}
          >
            편리한 대중교통
          </Tag>
          <Tag isActive={isKids} onClick={() => setKids((current) => !current)}>
            아이와 함께
          </Tag>
        </TagsBox>
        <TagsBox>
          <Tag
            isActive={isInside}
            onClick={() => setInside((current) => !current)}
          >
            실내
          </Tag>
          <Tag isActive={isPet} onClick={() => setPet((current) => !current)}>
            반려 동물과 함께
          </Tag>
          <Tag isActive={isSome} onClick={() => setSome((current) => !current)}>
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
    </>
  );
}
