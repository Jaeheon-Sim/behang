// import Header from "../format/Header";
// import { motion } from "framer-motion";
// import { Helmet } from "react-helmet";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMap } from "@fortawesome/free-solid-svg-icons";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// import { faHeart } from "@fortawesome/free-solid-svg-icons";
// import styled from "styled-components";
// import { useState, useEffect } from "react";
// import { useRecoilValue, useSetRecoilState } from "recoil";
// import { OPEN_KEY } from "../Key";
// import { useInView } from "react-intersection-observer";

// import { useNavigate } from "react-router-dom";

// const ListBox = styled.div`
//   margin: 5px;
//   border-top: 1px solid grey;
//   display: flex;
//   height: auto;
//   margin-top: 15px;
//   padding: 15px;
// `;
// const ListImg = styled.img`
//   width: 100px;
//   height: 80px;
//   background-color: grey;
//   margin: 5px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   cursor: pointer;
// `;
// const ListContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   margin: 8px;
// `;

// const Place = styled.div``;
// const HearBox = styled.div``;
// const HeartImg = styled.span`
//   color: red;
// `;
// const HeartCount = styled.span`
//   margin-left: 10px;
// `;
// const LocationBox = styled.div``;
// const Distance = styled.span``;
// const Location = styled.span``;

// export default function SearchResult(data) {
//   const [isE, setE] = useState(true);

//   const [isFirst, setFirst] = useState(true);
//   const [isList, setList] = useState(data.result);
//   const navigate = useNavigate();
//   const [ispagenum, setPageNum] = useState(10);
//   const [ref, inView] = useInView();

//   useEffect(() => {
//     fetch(
//       `http://apis.data.go.kr/B551011/KorService/searchKeyword?serviceKey=${OPEN_KEY}&_type=json&MobileOS=WIN&numOfRows=${ispagenum}&MobileApp=test&arrange=P&keyword=${data.searchValue}`
//     )
//       .then((res) => {
//         const json = res.json();
//         if (json.response.body.items === "") {
//           setE(true);
//           setList([]);
//         } else {
//           setE(false);
//           setFirst(false);
//           setList(json.response.body.items.item);
//         }
//       })
//       .catch((e) => {
//         setE(true);
//         setList([]);
//       });
//   }, [inView]);
//   console.log(data);
//   return (
//     <div>
//       {isList?.map((e) => (
//         <ListBox
//           key={e.contentid}
//           onClick={() => {
//             console.log(e);
//             navigate(`/feed/${e.contentid}`, {
//               state: e,
//             });
//           }}
//         >
//           <ListImg src={e.firstimage} alt="이미지가 없어요" />
//           <ListContent>
//             <Place>{e.title}</Place>
//             {/* <HearBox>
//                         <HeartImg>
//                           <FontAwesomeIcon icon={faHeart} />
//                         </HeartImg>
//                         <HeartCount>1234123</HeartCount>
//                       </HearBox> */}
//             <Distance>21332.km </Distance>
//             <LocationBox>
//               <Location>{e.addr1}</Location>
//             </LocationBox>
//           </ListContent>
//         </ListBox>
//       ))}
//     </div>
//   );
// }
