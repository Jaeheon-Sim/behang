import Header from "../format/Header";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Modal from "react-modal";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { OPEN_KEY } from "../Key";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isUserAtom, isAccessTokenAtom, isRefreshTokenAtom } from "../atoms";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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
  margin-top: 1vh;
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
  background-color: #455ae4;
  color: white;
  border: none;
  width: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  padding: 10px;

  border-radius: 10px;
`;

const BtnTab = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SearchInput = styled.input`
  margin-left: 5px;
  margin-right: 10px;
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

const IconDiv = styled(motion.div)``;
const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
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
export default function Upload() {
  const isUser = useRecoilValue(isUserAtom);
  const isAccessToken = useRecoilValue(isAccessTokenAtom);
  const setAccessToken = useSetRecoilState(isAccessTokenAtom);
  const isRefreshToken = useRecoilValue(isRefreshTokenAtom);
  const setRefreshToken = useSetRecoilState(isRefreshTokenAtom);
  const [isUploading, setUploading] = useState(false);
  const [isPark, setPark] = useState(false);
  const [isInside, setInside] = useState(false);
  const [isKids, setKids] = useState(false);
  const [isPet, setPet] = useState(false);
  const [isPublic, setPublic] = useState(false);
  const [isSome, setSome] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isPrevImg, setPrevImg] = useState("");
  const [isImg, setImg] = useState("");
  const [isE, setE] = useState(true);
  const [isSearch, setSearch] = useState("");
  const [isList, setList] = useState([]);
  const [isFirst, setFirst] = useState(true);
  const [isDone, setDone] = useState(false);
  const [isPageNum, setPageNum] = useState(10);
  const [isLoading, setLoading] = useState(true);
  const [isLocate, setLocate] = useState({
    title: "",
    addr: "",
    contentId: 0,
    mapX: 0,
    mapY: 0,
    phoneNumber: "",
    areaCode: "",
    isOn: false,
  });
  const MySwal = withReactContent(Swal);

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

  const onLocate = (e) => {
    console.log(e);
    setPageNum(10);

    setLocate((prev) => ({
      // ...prev,
      title: String(e.title),
      addr: String(e.addr1),
      isOn: true,
      contentId: Number(e.contentid),
      mapX: Number(e.mapx),
      mapY: Number(e.mapy),
      phoneNumber: String(e.tel),
      areaCode: String(e.areacode),
    }));
    setModalOpen((prev) => !prev);
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

  const upload = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve) => {
      reader.onload = () => {
        setPrevImg(reader.result);
        resolve();
      };
    });
  };

  const filterVari = {
    hover: (i) => ({
      y: -5,
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
      color: i ? "white" : "black",
      transition: {
        duration: 0.2,
      },
    }),
  };

  const reIssue = () => {
    console.log("reissue");
    fetch(`http://35.247.33.79:80/reissue`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken: isAccessToken,
        refreshToken: isRefreshToken,
      }),
    })
      .then((e) => e.json())
      .then((data) => {
        console.log(data);
        setAccessToken(data.data.accessToken);
        setRefreshToken(data.data.refreshToken);
        goFile(data.data.accessToken);
      })
      .catch((err) => {
        MySwal.fire({
          title: <strong>원인 모를 에러가 발생했습니다.</strong>,
          icon: "error",
        });
      });
  };

  const goFile = (data) => {
    console.log(isLocate);
    if (isLocate.isOn === false) {
      MySwal.fire({
        title: <strong>모든 정보를 입력해주세요!</strong>,
        icon: "info",
      });
    } else {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", isImg);

      formData.append(
        "postRequestDto",
        new Blob(
          [
            JSON.stringify({
              place: {
                address: isLocate.addr,
                areaCode: isLocate.areaCode,
                contentId: isLocate.contentId,
                mapX: isLocate.mapX,
                mapY: isLocate.mapY,
                name: isLocate.title,
                phoneNumber: isLocate.phoneNumber,
              },
              tag: {
                comfortablePubTransit: isPublic,
                convenientParking: isPark,
                indoor: isInside,
                withChild: isKids,
                withLover: isSome,
                withMyDog: isPet,
              },
            }),
          ],
          { type: "application/json" }
        )
      );
      if (data.type === "click") {
        fetch(`http://35.247.33.79:80/posts`, {
          method: "POST",
          headers: {
            "X-AUTH-TOKEN": isAccessToken,
          },
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.code == -9999) {
              reIssue();
            } else {
              MySwal.fire({
                title: <strong>업로드가 되었습니다.</strong>,
                icon: "success",
              });

              reset();
            }
          })
          .catch((err) => {
            MySwal.fire({
              title: <strong>원인 모를 에러가 발생했습니다.</strong>,
              icon: "error",
            });
            setUploading(false);
          });
      } else {
        fetch(`http://35.247.33.79:80/posts`, {
          method: "POST",
          headers: {
            "X-AUTH-TOKEN": data,
          },
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            MySwal.fire({
              title: <strong>업로드가 되었습니다.</strong>,
              icon: "success",
            });
            reset();
          })
          .catch((err) => {
            MySwal.fire({
              title: <strong>원인 모를 에러가 발생했습니다.</strong>,
              icon: "error",
            });
            setUploading(false);
          });
      }
    }
  };

  const reset = () => {
    setKids(false);
    setPet(false);
    setUploading(false);
    setPublic(false);
    setSome(false);
    setPrevImg("");
    setImg("");
    setPark(false);
    setInside(false);
    setLocate(() => ({
      title: "",
      addr: "",
      areaCode: "",
      isOn: false,
      mapX: 0,
      mapY: 0,
    }));
  };

  return (
    <>
      <Helmet>
        <title>비행 업로드</title>
      </Helmet>
      <Header />

      <Container initial={{ x: 500, y: -500 }} animate={{ x: 0, y: 0 }}>
        {isUser ? (
          !isUploading ? (
            <>
              <ImgTab>
                <AnimatePresence>
                  {isPrevImg === "" ? (
                    <>
                      <FileInput htmlFor="file-input">사진 선택</FileInput>
                      <Input
                        id="file-input"
                        type={"file"}
                        accept=".jpg, .jpeg, .png"
                        onChange={(e) => {
                          upload(e.target.files[0]);
                          setImg(e.target.files[0]);
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <FeedImg>
                        {isPrevImg && (
                          <Img src={isPrevImg} alt="올바른 파일을 첨부하세요" />
                        )}
                      </FeedImg>
                      <BtnTab>
                        <Button
                          initial={{ scale: 0 }}
                          animate={{ scale: 1, rotateZ: 360 }}
                          whileHover={{ y: -5 }}
                          whileTap={{ y: 0 }}
                          exit={{ scale: 0 }}
                          onClick={goFile}
                        >
                          <div style={{ fontSize: "1.5rem" }}>등록</div>
                        </Button>
                        <Button
                          initial={{ scale: 0 }}
                          animate={{ scale: 1, rotateZ: 360 }}
                          whileHover={{ y: -5 }}
                          whileTap={{ y: 0 }}
                          exit={{ scale: 0 }}
                          onClick={reset}
                          style={{ backgroundColor: "red" }}
                        >
                          <FontAwesomeIcon
                            style={{ fontSize: "1.5rem" }}
                            icon={faArrowRotateRight}
                          ></FontAwesomeIcon>
                          <div
                            style={{ marginLeft: "10px", fontSize: "1.5rem" }}
                          >
                            초기화
                          </div>
                        </Button>
                      </BtnTab>
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
                    custom={isPet}
                    whileHover="hover"
                    whileTap="tap"
                    animate="push"
                    onClick={() => setPet((current) => !current)}
                  >
                    반려견과 함께
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
                ariaHideApp={false}
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
                    padding: "10px",
                    //top: "10%",
                    //left: "10%",
                    width: "inherit",
                    height: "inherit",
                    border: "1px solid #ccc",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    overflow: "auto",
                    WebkitOverflowScrolling: "touch",
                    borderRadius: "4px",
                    outline: "none",
                  },
                }}
              >
                <ModalContainer>
                  <SearchTab>
                    <IconDiv
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 1 }}
                    >
                      <Icon icon={faMagnifyingGlass} onClick={onSearch} />
                    </IconDiv>

                    <SearchInput
                      onChange={onInput}
                      value={isSearch}
                      placeholder="등록할 여행지를 검색하세요!"
                      minLength="2"
                    />
                    <IconDiv
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 1 }}
                    >
                      <Icon
                        icon={faX}
                        onClick={() => {
                          setPageNum(10);
                          setModalOpen((current) => !current);
                        }}
                      >
                        X
                      </Icon>
                    </IconDiv>
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
                            Loading...
                          </Title>
                        </SearchTab>
                      </>
                    ) : (
                      <>
                        {isList?.map((e) => (
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
                        ))}{" "}
                        {!isDone ? (
                          <MoreDiv
                            whileHover={{ y: -5 }}
                            whileTap={{ y: 0 }}
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
                </ModalContainer>
              </LocationModal>
            </>
          ) : (
            <>
              <Title
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 0.5,
                }}
                style={{ margin: "0 auto" }}
              >
                업로드 중
              </Title>
            </>
          )
        ) : (
          <>
            <br />
            <br />
            <br />
            <br />
            <Title>로그인을 하라고요!!</Title>
          </>
        )}
      </Container>
    </>
  );
}
