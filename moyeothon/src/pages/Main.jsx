// Main.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import MainContainer from "../components/MainContainer";

// axios 인스턴스 생성
const api = axios.create({
  baseURL: "https://kyulimcho.shop",
  headers: {
    "Content-Type": "application/json",
  },
});

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
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

  const [location, setLocation] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [title, setTitle] = useState("");
  const [district, setDistrict] = useState("");
  const [speed, setSpeed] = useState("");
  const [pathData, setPathData] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // 사용자 위치
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      });
    }

    const token = localStorage.getItem("token");

    // 러닝 정보
    api
      .get("/api/mains/schedule", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        setDate(data.date);
        setTime(data.time);
        setTitle(data.title);
        setDistrict(data.district);
        setSpeed(data.speed);
        setPathData(data.pathData);
      })
      .catch((error) => {
        console.error("Error fetching running schedule:", error);
        alert("러닝 정보를 불러오는 데 실패했습니다.");
      });

    // 주변 코스
    api
      .get("/api/mains/routes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCourses(response.data.courses);
      })
      .catch((error) => {
        console.error("Error fetching nearby courses:", error);
      });
  }, []);

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
          <span>
            {date}/{time}
          </span>
          <RunningTitle>{title}</RunningTitle>
          <BadgeContainer>
            <Badge>{district}</Badge>
            <Badge>{speed}</Badge>
          </BadgeContainer>
        </RunningInfo>
        <div>
          {pathData ? (
            <div>
              <h3>현재 위치 데이터:</h3>
              <p>{pathData}</p>
            </div>
          ) : (
            <p>예정된 러닝이 없습니다</p>
          )}
        </div>
      </RunningCard>

      <SectionTitle>내 현재 위치</SectionTitle>
      <MapContainer>
        {location ? (
          <div>
            <h4>현재 위치</h4>
            <p>
              <strong>위도:</strong> {location.latitude}
            </p>
            <p>
              <strong>경도:</strong> {location.longitude}
            </p>
          </div>
        ) : (
          <p>위치 정보를 불러오는 중...</p>
        )}
      </MapContainer>

      <SectionTitle>내 주변 코스</SectionTitle>
      <CourseContainer>
        {courses.map((course, index) => (
          <CourseCard key={index}>
            <CourseImage />
            <CourseTitle>{course.title}</CourseTitle>
          </CourseCard>
        ))}
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
            active={String(currentPage === index + 1)}
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
