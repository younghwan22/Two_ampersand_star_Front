import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MainContainer from "../components/MainContainer";
import axios from "axios";

// axios 인스턴스 생성
const api = axios.create({
  baseURL: "https://kyulimcho.shop",
  headers: {
    "Content-Type": "application/json",
  },
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 40px 20px;
  background-color: #fff;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 300px;
  background-color: #e0e0e0;
  border-radius: 20px;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Title = styled.h1`
  margin-top: 15px;
  text-align: center;
  font-size: 30px;
  font-weight: 500;
`;

const RunningInfo = styled.div`
  display: flex;
  align-items: start;
  margin: 20px;
  flex-direction: column;
  gap: 5px;
`;

const RunningTitle = styled.p`
  font-size: 30px;
  font-weight: 700;
  color: #12918e;
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
  font-size: 14px;
  color: #333;
  gap: 10px;
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: #b4ffe3;
  color: #12918e;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
  width: 100%;
  height: 60px;

  &:hover {
    border: 2px solid #3abf9a;
  }
`;

const Running = ({ routeId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRunningData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await api.get(`/api/running/info/${routeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRunningData();
  }, [routeId]);

  const handleParticipation = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.post(`/api/running/info/${routeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("참여가 완료되었습니다!"); // 성공 메시지
    } catch (err) {
      alert("참여에 실패했습니다."); // 실패 메시지
      console.error(err);
    }
  };

  if (loading) {
    return <Container>로딩중...</Container>;
  }

  if (error) {
    return <Container>데이터를 가져올 수 없습니다.</Container>;
  }

  const { date, time, title, district, speed } = data;

  return (
    <MainContainer>
      <Title>러닝 정보</Title>
      <Container>
        <MapContainer>
          <img src="../../img/ex_map.png" alt="지도" />
        </MapContainer>
        <RunningInfo>
          <span>
            {date} / {time}
          </span>
          <RunningTitle>{title}</RunningTitle>
          <BadgeContainer>
            <Badge>{district}</Badge>
            <Badge>{speed}</Badge>
          </BadgeContainer>
        </RunningInfo>
        <Button onClick={handleParticipation}>참여하기</Button>
      </Container>
    </MainContainer>
  );
};

export default Running;
