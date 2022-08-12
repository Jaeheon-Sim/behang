import Header from "../format/Header";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Modal from "react-modal";
import { useState } from "react";
import {
  isParkAtom,
  isInsideAtom,
  isKidsAtom,
  isPetAtom,
  isPublicAtom,
  isSomeAtom,
  isUserAtom,
  isImgAtom,
} from "../atoms";

const Container = styled(motion.div)`
  width: 85vw;
  margin: 5vh auto;
  min-height: 80vh;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 100px;
  box-shadow: 0 10px 10px rgba(35, 35, 35, 0.3), 0 10px 20px rgba(0, 0, 0, 0.3);
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Tab = styled.div`
  margin-top: 5vh;
  margin-bottom: 2vh;
`;
const ImgTab = styled(Tab)`
  display: flex;
  justify-content: center;
  align-items: center;
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
const LocationBtn = styled(motion.div)`
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
  margin-top: -2vh;
`;
const FilterTab = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5vh;
  margin-bottom: 1.5vh;
`;
const Filter = styled(motion.div)`
  width: 30vh;
  height: 3.54vh;
  border-radius: 20px;
  border: none;
  background-color: ${(props) => (props.isActive ? "#455ae4" : "#d9d9d9")};
  /* &:hover {
    background-color: ${(props) => (props.isActive ? "#3b4ec5" : "#aaaaaa")};
  } */
  //background-color: $(props) =>;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
  margin-right: 15px;
  font-size: 1.3rem;
  text-align: center;
`;
const FeedImg = styled.div`
  width: 40vh;
  height: 35vh;
  background-color: #d9d9d9;
  margin-bottom: -4vh;
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

const LocationModal = styled(Modal)`
  width: 80%;
  height: 80%;
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Img = styled.img`
  width: inherit;
  height: inherit;
`;

const Button = styled(motion.button)`
  margin-left: 100px;
  height: 30px;
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
  const [isModalOpen, setModalOpen] = useState(false);
  const setImg = useSetRecoilState(isImgAtom);
  const isImg = useRecoilValue(isImgAtom);

  const upload = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImg(reader.result);
        resolve();
      };
    });
  };

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

  const reset = () => {
    setKids(false);
    setPet(false);
    setPublic(false);
    setSome(false);
    setImg("");
    setPark(false);
    setInside(false);
  };

  return (
    <>
      <Helmet>
        <title>upload</title>
      </Helmet>
      <Header />

      <Container initial={{ x: 500, y: -500 }} animate={{ x: 0, y: 0 }}>
        <ImgTab>
          <AnimatePresence>
            {isImg === "" ? (
              <>
                <FileInput htmlFor="file-input">사진 선택</FileInput>
                <Input
                  id="file-input"
                  type={"file"}
                  onChange={(e) => {
                    upload(e.target.files[0]);
                  }}
                />
              </>
            ) : (
              <>
                <FeedImg>
                  {isImg && <Img src={isImg} alt="올바른 사진을 첨부하세요" />}
                </FeedImg>
                <Button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotateZ: 360 }}
                  exit={{ scale: 0 }}
                  onClick={reset}
                >
                  초기화
                </Button>
              </>
            )}
          </AnimatePresence>
        </ImgTab>

        <Tab>
          <Box>
            <BoxTitle></BoxTitle>
          </Box>
          <FilterTab>
            <Filter
              variants={filterVari}
              custom={isPark}
              whileHover="hover"
              animate="push"
              onClick={() => setPark((current) => !current)}
            >
              편리한 주차
            </Filter>
            <Filter
              variants={filterVari}
              custom={isPublic}
              whileHover="hover"
              animate="push"
              onClick={() => setPublic((current) => !current)}
            >
              편리한 대중교통
            </Filter>

            <Filter
              variants={filterVari}
              custom={isKids}
              whileHover="hover"
              animate="push"
              onClick={() => setKids((current) => !current)}
            >
              아이와 함께
            </Filter>
          </FilterTab>
          <FilterTab>
            <Filter
              variants={filterVari}
              custom={isInside}
              whileHover="hover"
              animate="push"
              onClick={() => setInside((current) => !current)}
            >
              실내
            </Filter>

            <Filter
              variants={filterVari}
              custom={isSome}
              whileHover="hover"
              animate="push"
              onClick={() => setSome((current) => !current)}
            >
              연인과 함께
            </Filter>
            <Filter
              variants={filterVari}
              custom={isPet}
              whileHover="hover"
              animate="push"
              onClick={() => setPet((current) => !current)}
            >
              반려견과 함께
            </Filter>
          </FilterTab>
        </Tab>
        <Tab>
          <Box>
            <LocationBtn
              whileHover={{ scale: 1.1 }}
              onClick={() => setModalOpen((current) => !current)}
            >
              등록장소 선택
            </LocationBtn>
          </Box>
        </Tab>

        <LocationModal
          isOpen={isModalOpen}
          onRequestClose={() => setModalOpen(false)}
        >
          hi
        </LocationModal>
      </Container>
    </>
  );
}
