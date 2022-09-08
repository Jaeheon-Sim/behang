import Header from "../format/Header";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
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
import { CLIENT_ID } from "../Key";

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
  justify-content: center;
  align-items: center;
`;

const InfoTab = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Div = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  cursor: pointer;
`;

const WithDiv = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  margin-top: 5vh;
`;

const Btn = styled(motion.div)`
  margin-top: 2vh;
  font-size: 3rem;
  cursor: pointer;
`;

const Op = styled.div`
  margin-top: 2vh;
  font-size: 1.3rem;
  color: #5e5e5e;
`;

const OpDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  margin: 0 auto;
`;

const MotionVar = {
  hover: { y: -5 },
  tap: { y: 0 },
};

export default function Notice() {
  const isUser = useRecoilValue(isUserAtom);
  const isKaKaoToken = useRecoilValue(isKaKaoTokenAtom);
  const isAccessToken = useRecoilValue(isAccessTokenAtom);
  const setToken = useSetRecoilState(isAccessTokenAtom);
  const isRefreshToken = useRecoilValue(isRefreshTokenAtom);
  const setRefreshToken = useSetRecoilState(isRefreshTokenAtom);
  const [withdraw, setWithdraw] = useState(false);
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const reIssue = () => {
    fetch(`http://34.171.129.137:80/reissue`, {
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
        // console.log(data);
        setToken(data.data.accessToken);
        setRefreshToken(data.data.refreshToken);
        onWithdraw(data.data.accessToken);
      })
      .catch((err) => {});
  };

  const onWithdraw = (data) => {
    if (data.type === "click") {
      fetch(`http://34.171.129.137:80/social/withdrawal/kakao`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": isAccessToken,
        },
        body: JSON.stringify({ socialAccessToken: isKaKaoToken }),
      })
        .then((e) => e.json())
        .then((data) => {
          if (data.code === -9999) {
            // console.log(data);
            reIssue();
          } else {
            alert("탈퇴가 되었어요. 다시 만나요!");
            navigate("/");
          }
        })
        .catch((err) => {
          alert("탈퇴가 되었어요. 다시 만나요!");
          navigate("/");
        });
    } else {
      fetch(`http://34.171.129.137:80/social/withdrawal/kakao`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-AUTH-TOKEN": data,
        },
        body: JSON.stringify({ socialAccessToken: isKaKaoToken }),
      })
        .then((e) => e.json())
        .then((data) => {
          MySwal.fire({
            title: <strong>탈퇴가 되었어요. 다시 만나요!</strong>,
            icon: "error",
          });

          navigate("/");
        })
        .catch((err) => {
          alert("탈퇴가 되었어요. 다시 만나요!");
          navigate("/");
          // MySwal.fire({
          //   title: <strong>원인모를 에러가 발생했습니다.</strong>,
          //   icon: "error",
          // });
        });
    }
  };

  return (
    <>
      <Header />
      <Total
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "spring", duration: 0.7 }}
      >
        <Container>
          {!withdraw ? (
            <InfoTab>
              <Div
                onClick={() => {
                  navigate("/notice/gongi");
                }}
                variants={MotionVar}
                whileHover="hover"
                whileTap="tap"
              >
                공지사항
              </Div>
              <br />
              <Div
                onClick={() => {
                  navigate("/notice/contact");
                }}
                variants={MotionVar}
                whileHover="hover"
                whileTap="tap"
              >
                서비스 문의
              </Div>
              <br />
              <Div
                onClick={() => {
                  navigate("/notice/terms");
                }}
                variants={MotionVar}
                whileHover="hover"
                whileTap="tap"
              >
                약관 및 정책
              </Div>
              <br />
              <Div
                onClick={() => {
                  navigate("/notice/version");
                }}
                variants={MotionVar}
                whileHover="hover"
                whileTap="tap"
              >
                버전 정보
              </Div>
              <br />

              {isUser ? (
                <>
                  <br />
                  <Div
                    style={{ color: "red" }}
                    variants={MotionVar}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => {
                      setWithdraw((prev) => !prev);
                    }}
                  >
                    회원 탈퇴
                  </Div>
                </>
              ) : null}
            </InfoTab>
          ) : (
            <>
              <br />
              <br />
              <div
                style={{
                  fontSize: "5rem",
                  marginTop: "-13vh",
                  color: "rgba(69, 90, 228, 1)",
                }}
              >
                탈퇴하시겠습니까?
              </div>
              <WithDiv>
                <Btn
                  onClick={onWithdraw}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  네
                </Btn>
                <Btn
                  onClick={() => {
                    setWithdraw((prev) => !prev);
                  }}
                  whileHover={{ scale: 10 }}
                  transition={{ duration: 0.5 }}
                >
                  아니요
                </Btn>
              </WithDiv>
              <br />
              <br />
              <OpDiv>
                <Op style={{ fontSize: "1.5rem" }}>탈퇴 시 주의사항*</Op>
                <Op>1. 탈퇴 시 회원님의 모든 데이터가 삭제됩니다.</Op>
                <Op>2. 탈퇴 직후, 삭제된 회원정보는 복구가 불가능합니다.</Op>
              </OpDiv>
            </>
          )}
        </Container>
      </Total>
    </>
  );
}
