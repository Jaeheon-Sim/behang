import Header from "../format/Header";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {
  isUserIDAtom,
  isNickNameAtom,
  isProfileImgAtom,
  isUserAtom,
  isAccessTokenAtom,
  isRefreshTokenAtom,
  isKaKaoTokenAtom,
} from "../atoms";
import { useMatch, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Total = styled(motion.div)``;

const Container = styled.div`
  width: 85vw;
  margin: 5vh auto;
  min-height: 80vh;
  background-color: #f0eded;
  border-radius: 100px;
  box-shadow: 0 10px 10px rgba(35, 35, 35, 0.3), 0 10px 20px rgba(0, 0, 0, 0.3);
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
`;
const Title = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;
const Links = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: black;
`;
const FeedWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FeedContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  @media screen and (min-width: 2000px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  width: 98%;
  height: 100%;
`;
const FeedBox = styled(motion.div)`
  width: 95%;
  height: 90%;
  background-color: #ececec;
  margin: 5px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 1px rgba(35, 35, 35, 0.3), 0 1px 1px rgba(0, 0, 0, 0.3);
  overflow: hidden;
`;
const ImgBox = styled.div`
  width: 23vh;
  height: 100%;
  background-color: #d9d9d9;
  border-radius: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-bottom: 1vh;
`;

const LogoutTab = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 2vw;
  margin-bottom: 2vh;
`;

const Box = styled.div`
  width: 100%;
  margin-top: 3vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const NickTab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 3vh;
  margin-top: 3vh;
`;

const Button = styled(motion.button)`
  margin-left: 100px;
  background-color: #a1a1a1;
  color: white;
  border: none;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  padding: 5px;
  border-radius: 10px;
  font-weight: lighter;
  font-size: 1.3rem;
  cursor: pointer;
`;

const Btn = styled(Button)`
  margin-left: 0px;
`;

const Div = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70%;
`;

const Icon = styled(FontAwesomeIcon)`
  margin-left: 10px;

  cursor: pointer;
`;

const ImgDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 90%;
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 30vh;
`;

export default function Mypage() {
  //recoil 값으로 올려야함
  const isUser = useRecoilValue(isUserAtom);
  const setID = useSetRecoilState(isUserIDAtom);
  const isNick = useRecoilValue(isNickNameAtom);
  const isProfileImg = useRecoilValue(isProfileImgAtom);
  const setUser = useSetRecoilState(isUserAtom);
  const setNick = useSetRecoilState(isNickNameAtom);
  const setProfileImg = useSetRecoilState(isProfileImgAtom);
  const isKaKaoToken = useRecoilValue(isKaKaoTokenAtom);
  const isRefreshToken = useRecoilValue(isRefreshTokenAtom);
  const setRefreshToken = useSetRecoilState(isRefreshTokenAtom);

  const navigate = useNavigate();
  const isAccessToken = useRecoilValue(isAccessTokenAtom);
  const setToken = useSetRecoilState(isAccessTokenAtom);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isPageNum, setPageNum] = useState(10);
  const MySwal = withReactContent(Swal);

  const logout = () => {
    fetch(`http://35.247.33.79:80/social/logout/kakao`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": isAccessToken,
      },
      body: JSON.stringify({ socialAccessToken: isKaKaoToken }),
    })
      .then((e) => e.json())
      .then((res) => {});
    setID("");
    setNick("");
    setToken("");
    setProfileImg("");
    setUser(false);
    navigate("/");
  };

  const GoNotice = () => {
    navigate("/notice");
  };

  const revise = () => {};

  const reIssue = () => {
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
        setToken(data.data.accessToken);
        setRefreshToken(data.data.refreshToken);

        Get(data.data.accessToken);
      })
      .catch((err) => {
        MySwal.fire({
          title: <strong>원인 모를 에러가 발생했습니다.</strong>,
          icon: "error",
        });
      });
  };

  const Get = (token) => {
    fetch(`http://35.247.33.79:80/posts/feed/me?page=0&size=${isPageNum}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": token,
      },
    })
      .then((e) => e.json())
      .then((res) => {
        setData(res.list);
        setPageNum((prev) => prev + 10);
        setLoading(true);
      })
      .catch((err) =>
        MySwal.fire({
          title: <strong>원인 모를 에러가 발생했습니다.</strong>,
          icon: "error",
        })
      );
  };

  useEffect(() => {
    if (isUser) {
      fetch(`http://35.247.33.79:80/posts/feed/me?page=0&size=${isPageNum}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": isAccessToken,
        },
      })
        .then((e) => e.json())
        .then((res) => {
          if (res.code === -9999) {
            console.log("reissue");
            reIssue();
          } else {
            setData(res.list);
            setPageNum((prev) => prev + 10);
            setLoading(true);
          }
        })
        .catch((err) =>
          MySwal.fire({
            title: <strong>원인 모를 에러가 발생했습니다.</strong>,
            icon: "error",
          })
        );
    }
  }, []);
  console.log(isProfileImg);
  return (
    <>
      <Helmet>
        <title>비행 마이페이지</title>
      </Helmet>
      <Header />
      <Total
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "spring", duration: 0.7 }}
      >
        <Container>
          {isUser ? (
            <>
              <Box>
                <ImgDiv>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <ImgBox>
                      <Img src={isProfileImg} alt="no image"></Img>
                    </ImgBox>
                    {/* <Btn
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotateZ: 360 }}
                      whileHover={{ y: -5 }}
                      whileTap={{ y: 0 }}
                      exit={{ scale: 0 }}
                      onClick={revise}
                    >
                      <div>사진 변경</div>
                    </Btn> */}
                  </div>
                  <NickTab>
                    <div>{isNick}</div>
                    {/* <Btn
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotateZ: 360 }}
                      whileHover={{ y: -5 }}
                      whileTap={{ y: 0 }}
                      exit={{ scale: 0 }}
                      onClick={revise}
                      style={{
                        marginLeft: "2vh",
                        padding: "3px",
                        marginBottom: "1px",
                      }}
                    >
                      <div>닉네임 변경</div>
                    </Btn> */}
                  </NickTab>
                </ImgDiv>
              </Box>
              <LogoutTab>
                <Button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotateZ: 360 }}
                  whileHover={{ y: -5 }}
                  whileTap={{ y: 0 }}
                  exit={{ scale: 0 }}
                  onClick={logout}
                  style={{ backgroundColor: "red" }}
                >
                  <div>로그아웃</div>
                </Button>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotateZ: 360 }}
                  whileHover={{ y: -5 }}
                  whileTap={{ y: 0 }}
                  onClick={GoNotice}
                >
                  <Icon icon={faGear}></Icon>
                </motion.div>
              </LogoutTab>
              {isLoading ? (
                <>
                  <FeedWrapper>
                    <FeedContainer>
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
                    </FeedContainer>
                  </FeedWrapper>
                  {data?.length === 0 ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <br />
                      <br />
                      <br />
                      <br />
                      <Title>비행 하세요.</Title>
                    </div>
                  ) : null}
                </>
              ) : (
                <Box>
                  <Div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "reverse",
                      repeatDelay: 0.5,
                    }}
                  >
                    <div>Loading ...</div>
                  </Div>
                </Box>
              )}
            </>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <br />
              <br />
              <br />
              <br />
              <Title>로그인을 하시면 나의 정보를 볼 수 있어요.</Title>
              <div
                style={{
                  display: "flex",

                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <br />
                <br />
                <br />
                <br />
                <h1 style={{ color: "#455ae4" }}>
                  비행의 정보들을 확인하실래요?
                </h1>
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: -5 }}
                  transition={{
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 0.5,
                  }}
                  onClick={GoNotice}
                >
                  <Icon icon={faGear}></Icon>
                </motion.div>
              </div>
            </div>
          )}
        </Container>
      </Total>
    </>
  );
}
