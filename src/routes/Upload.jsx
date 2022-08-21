import Header from "../format/Header";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Modal from "react-modal";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { OPEN_KEY } from "../Key";

const Container = styled(motion.div)`
  width: 85vw;
  margin: 5vh auto;
  min-height: 80vh;
  background-color: #f0eded;
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
  /* background-color: ${(props) =>
    props.isActive ? "#455ae4" : "#d9d9d9"}; */
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

const SearchTab = styled.div`
  width: 100%;
  margin-top: 4vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const SearchInput = styled.input`
  margin-left: 5px;
  margin-right: 15px;
  width: 100%;
  height: 3.5vh;
  &:focus {
    outline-color: #455ae4;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  cursor: pointer;
  margin-left: 10px;
  margin-right: 10px;
`;

const ListTab = styled.div`
  font-size: 1.2rem;
  color: black;
`;
const Title = styled(motion.h1)`
  font-size: 2rem;
`;
const ListBox = styled.div`
  border-bottom: 1px solid grey;
  display: flex;
  height: auto;
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
  align-items: flex-start;
  margin: 8px;
`;

const Place = styled.div``;

const LocationBox = styled.div``;
const Distance = styled.span``;
const Location = styled.span``;

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export default function Upload() {
  const [isPark, setPark] = useState(false);
  const [isInside, setInside] = useState(false);
  const [isKids, setKids] = useState(false);
  const [isPet, setPet] = useState(false);
  const [isPublic, setPublic] = useState(false);
  const [isSome, setSome] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isImg, setImg] = useState("");
  const [isE, setE] = useState(true);
  const [isSearch, setSearch] = useState("");
  const [isList, setList] = useState([]);
  const [isFirst, setFirst] = useState(true);
  const [isLocate, setLocate] = useState({
    title: "",
    addr: "",
    isOn: false,
  });
  const onLocate = (e) => {
    setLocate((prev) => ({
      ...prev,
      title: e.title,
      addr: e.addr1,
      isOn: true,
    }));
    setModalOpen((prev) => !prev);
  };

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
      y: -10,
      backgroundColor: i ? "rgb(59, 78, 197)" : "rgb(170, 170, 170)",
      transition: {
        duration: 0.2,
      },
    }),
    tap: {
      y: 0,
    },
    push: (i) => ({
      y: 0,
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
    setLocate(() => ({
      title: "",
      addr: "",
      isOn: false,
    }));
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
                  {isImg && <Img src={isImg} alt="올바른 파일을 첨부하세요" />}
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
              whileTap="tap"
              animate="push"
              onClick={() => setPark((current) => !current)}
            >
              편리한 주차
            </Filter>
            <Filter
              variants={filterVari}
              custom={isPublic}
              whileHover="hover"
              whileTap="tap"
              animate="push"
              onClick={() => setPublic((current) => !current)}
            >
              편리한 대중교통
            </Filter>

            <Filter
              variants={filterVari}
              custom={isKids}
              whileHover="hover"
              whileTap="tap"
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
              whileTap="tap"
              animate="push"
              onClick={() => setInside((current) => !current)}
            >
              실내
            </Filter>

            <Filter
              variants={filterVari}
              custom={isSome}
              whileHover="hover"
              whileTap="tap"
              animate="push"
              onClick={() => setSome((current) => !current)}
            >
              연인과 함께
            </Filter>
            <Filter
              variants={filterVari}
              custom={isPet}
              whileHover="hover"
              whileTap="tap"
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
              onClick={() => {
                setModalOpen((current) => !current);
                setList([]);
                setSearch("");
              }}
            >
              {isLocate.isOn ? isLocate.title : "등록장소 선택"}
            </LocationBtn>
          </Box>
        </Tab>

        <LocationModal
          isOpen={isModalOpen}
          onRequestClose={() => setModalOpen(false)}
          style={{
            overlay: {
              position: "fixed",
              top: "10%",
              left: "20%",
              right: "20%",
              bottom: "10%",
              backgroundColor: "rgba(255, 255, 255, 0.75)",
            },
            content: {
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              position: "absolute",

              //top: "10%",
              //left: "10%",
              width: "inherit",
              height: "inherit",
              border: "1px solid #ccc",
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: "4px",
              outline: "none",
            },
          }}
        >
          <ModalContainer>
            <SearchTab>
              <Icon icon={faMagnifyingGlass} onClick={onSearch} />

              <SearchInput
                onChange={onInput}
                value={isSearch}
                placeholder="등록할 여행지를 검색하세요!"
                minLength="2"
              />

              <Icon
                icon={faX}
                onClick={() => setModalOpen((current) => !current)}
              >
                X
              </Icon>
            </SearchTab>
            <ListTab>
              {isSearch === "" || isFirst === true ? (
                <>
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
                      onLocate(e);
                    }}
                  >
                    <ListImg src={e.firstimage} alt="이미지가 없어요" />
                    <ListContent>
                      <Place>{e.title}</Place>
                      <LocationBox>
                        <Location>{e.addr1}</Location>
                      </LocationBox>
                    </ListContent>
                  </ListBox>
                ))
              )}
            </ListTab>
          </ModalContainer>
        </LocationModal>
      </Container>
    </>
  );
}
