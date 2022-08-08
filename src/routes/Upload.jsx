import Header from "../format/Header";
import Navbar from "../format/Navbar";
import { Helmet } from "react-helmet";
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

const Container = styled.div`
  font-size: 10px;
  color: teal;
`;
const Tab = styled.div`
  margin-top: 5vh;
  margin-bottom: 2vh;
`;
const ImgTab = styled(Tab)`
  display: flex;
  justify-content: center;
`;
const Box = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5vh;
  margin-bottom: 1.5vh;
`;
const BoxTitle = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
  font-weight: bolder;
`;
const LocationBtn = styled.div`
  align-items: center;
  text-align: center;
  display: flex;
  justify-content: center;
  width: 85%;
  height: 6vh;
  border-radius: 2vh;
  border: none;
  background-color: #455ae4;
  //background-color: $(props) =>;
  color: white;
  padding: 0 5px 0 5px;
`;
const FilterTab = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5vh;
  margin-bottom: 1.5vh;
`;
const Filter = styled.div`
  width: 30vh;
  height: 3.54vh;
  border-radius: 20px;
  border: none;
  background-color: ${(props) => (props.isActive ? "#455ae4" : "#d9d9d9")};
  &:hover {
    background-color: ${(props) => (props.isActive ? "#2f3ea0" : "#aaaaaa")};
  }
  //background-color: $(props) =>;
  color: white;
  padding: 0 5px 0 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
`;
const FeedImg = styled.div`
  width: 10vh;
  width: auto;
  height: 30vh;
  background-color: #d9d9d9;
  margin: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FileInput = styled.label`
  cursor: pointer;
  background-color: #d9d9d9;
  border-radius: 15px;
  padding: 5px;
  width: 80%;
  height: 30vh;
  &:hover {
    background-color: #bfbdbd;
  }
  &:active {
    background-color: #f5f5f5;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Input = styled.input`
  display: none;
`;
export default function Upload() {
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
        <title>upload</title>
      </Helmet>
      <Header />
      <Navbar />
      <Container>
        <ImgTab>
          <FileInput htmlFor="file-input">사진 선택</FileInput>
          <Input id="file-input" type={"file"} />
        </ImgTab>

        <Tab>
          <Box>
            <BoxTitle>필터</BoxTitle>
          </Box>
          <FilterTab>
            <Filter
              isActive={isPark}
              onClick={() => setPark((current) => !current)}
            >
              편리한 주차
            </Filter>
            <Filter
              isActive={isPublic}
              onClick={() => setPublic((current) => !current)}
            >
              편리한 대중교통
            </Filter>

            <Filter
              isActive={isKids}
              onClick={() => setKids((current) => !current)}
            >
              아이와 함께
            </Filter>
          </FilterTab>
          <FilterTab>
            <Filter
              isActive={isInside}
              onClick={() => setInside((current) => !current)}
            >
              실내
            </Filter>

            <Filter
              isActive={isSome}
              onClick={() => setSome((current) => !current)}
            >
              연인과 함께
            </Filter>
            <Filter
              isActive={isPet}
              onClick={() => setPet((current) => !current)}
            >
              반려견과 함께
            </Filter>
          </FilterTab>
        </Tab>
        <Tab>
          <Box>
            <LocationBtn>등록 장소 선택</LocationBtn>
          </Box>
        </Tab>
      </Container>
    </>
  );
}
