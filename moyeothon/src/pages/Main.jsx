import React, { useState } from "react";
import styled from "styled-components";
import MainContainer from "../components/MainContainer";

const LogoContainer = styled.div`
  display: flex; /* 플렉스 박스를 사용하여 정렬 */
  justify-content: center; /* Logo를 수평 가운데 정렬 */
  align-items: center;
`;

const Logo = styled.div`
  margin: 15px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: 600;
  margin: 20px 0 10px;
`;

const RunningCard = styled.div`
  background-color: #e0f7f0;
  padding: 15px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const RunningInfo = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const RunningTitle = styled.p`
  font-size: 24px;
  font-weight: 600;
`;

const BadgeContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Badge = styled.span`
  background-color: #fff;
  border: 1px solid #2db4b1;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  color: #333;
  gap: 10px;
`;

const MapContainer = styled.div`
  background-color: #f3f3f3;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: #888;
  margin-top: 10px;
`;

const CourseContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 10px;
`;

const CourseCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  text-align: center;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #888;
`;

const CourseImage = styled.div`
  width: 100%;
  height: 80px;
  background-color: #ddd;
  border-radius: 6px;
  margin-bottom: 5px;
`;

const CourseTitle = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 10px;
`;

const PaginationButton = styled.button`
  background-color: ${(props) => (props.active ? "#b4ffe3" : "#fff")};
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
`;

const Main = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <MainContainer>
      <LogoContainer>
        <Logo>
          <img src="../../img/trackit.png" alt="로고" />
        </Logo>
      </LogoContainer>
      <SectionTitle>예정된 러닝</SectionTitle>
      <RunningCard>
        <RunningInfo>
          <span>24.10.28 / 20:00</span>
          <RunningTitle>중랑천 만보런</RunningTitle>
          <BadgeContainer>
            <Badge>서울</Badge>
            <Badge>빠르게</Badge>
          </BadgeContainer>
        </RunningInfo>
        <img
          src="../../img/ex_map.png"
          alt="러닝 지도"
          style={{ width: "150px", height: "100px", borderRadius: "8px" }}
        />
      </RunningCard>

      <SectionTitle>내 현재 위치</SectionTitle>
      <MapContainer>사용자 현재 위치</MapContainer>

      <SectionTitle>내 주변 코스</SectionTitle>
      <CourseContainer>
        <CourseCard>
          <CourseImage />
          <CourseTitle>캠퍼스 러닝 코스</CourseTitle>
        </CourseCard>
        <CourseCard>
          <CourseImage />
          <CourseTitle>짧고 굵은 코스</CourseTitle>
        </CourseCard>
        <CourseCard>
          <CourseImage />
          <CourseTitle>중랑천 만보런</CourseTitle>
        </CourseCard>
        <CourseCard>
          <CourseImage />
          <CourseTitle>캠퍼스 러닝 코스</CourseTitle>
        </CourseCard>
        <CourseCard>
          <CourseImage />
          <CourseTitle>짧고 굵은 코스</CourseTitle>
        </CourseCard>
        <CourseCard>
          <CourseImage />
          <CourseTitle>중랑천 만보런</CourseTitle>
        </CourseCard>
      </CourseContainer>

      <Pagination>
        <PaginationButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </PaginationButton>
        {[...Array(totalPages)].map((_, index) => (
          <PaginationButton
            key={index + 1}
            active={currentPage === index + 1}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </PaginationButton>
        ))}
        <PaginationButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </PaginationButton>
      </Pagination>
    </MainContainer>
  );
};

export default Main;
