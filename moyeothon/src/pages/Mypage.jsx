import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegPenToSquare } from "react-icons/fa6";
import axios from "axios";

// axios 인스턴스 생성
const api = axios.create({
  baseURL: "https://kyulimcho.shop",
  withCredentials: true, // CORS 설정 추가
  headers: {
    "Content-Type": "application/json",
  },
});

function MyPage() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [userInfo, setUserInfo] = useState({ nickname: "", email: "" });

  useEffect(() => {
    // 사용자 정보를 가져오는 함수
    const fetchUserInfo = async () => {
      try {
        // 로컬 스토리지에서 토큰 가져오기
        const token = localStorage.getItem("token");

        if (!token) {
          alert("로그인이 필요합니다.");
          navigate("/login");
          return;
        }

        // Authorization 헤더 추가
        const response = await api.get("/api/users/info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // 사용자 정보 설정
        if (response.status === 200) {
          setUserInfo({
            nickname: response.data.nickName, // 서버에서 전달되는 데이터의 키를 확인하세요
            email: response.data.email, // 이메일 키도 맞는지 확인 필요
          });
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        alert("사용자 정보 불러오는 데 실패했습니다.");
      }
    };

    fetchUserInfo();
  }, [navigate]);

  // 로그아웃 핸들러 추가
  const handleLogout = () => {
    try {
      localStorage.removeItem("token"); // 토큰 삭제
      alert("로그아웃되었습니다.");
      navigate("/login"); // 로그인 페이지로 리다이렉트
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="max-w-[480px] mx-auto min-h-screen bg-white px-5 py-6">
      {/* 헤더 */}
      <h1 className="mb-6 text-2xl font-bold font-family: Pretendard">마이페이지</h1>

      {/* 사용자 정보 */}
      <div className="bg-[#ECFFF8] rounded-lg p-5 mb-8 relative">
        <h2 className="mb-2 text-xl font-family: Pretendard">{userInfo.nickname} 님</h2>
        <p className="text-sm text-black font-family: Pretendard">{userInfo.email}</p>
        <button
          className="absolute text-xl -translate-y-1/2 right-5 top-1/2 size-3"
          onClick={() => navigate("/fix")}
        >
          <FaRegPenToSquare />
        </button>
      </div>

      {/* 참여 코스 섹션 */}
      <section className="mb-8">
        <h3 className="mb-4 text-lg font-semibold font-family: Pretendard">내가 참여한 코스</h3>
        <div className="grid grid-cols-3 gap-4 mb-6 justify-items-center font-family: Pretendard">
          {[
            "캠퍼스 러닝 코스",
            "짧고 굵은 코스",
            "중량천 만보런",
            "캠퍼스 러닝 코스",
            "짧고 굵은 코스",
            "중량천 만보런",
          ].map((text, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-3 rounded-lg font-family: Pretendard"
            >
              <div className="bg-gray-300 w-[120px] h-[120px] rounded-md mb-2 font-family: Pretendard"></div>
              <p className="text-sm text-center font-family: Pretendard">{text}</p>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="flex items-center justify-center gap-2">
          <button className="text-gray-300">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded ${
                page === currentPage ? "bg-[#B4FFE3] text-[#48CBC8]" : "text-[#D1D5D7]"
              }`}
            >
              {page}
            </button>
          ))}
          <button className="text-gray-300">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </section>

      {/* 메뉴 섹션 */}
      <div className="mt-10">
        <div className="py-4 text-lg font-semibold font-family: Pretendard">문의</div>
        <div
          className="py-4 text-lg font-semibold font-family: Pretendard cursor-pointer hover:text-[#48CBC8]"
          onClick={handleLogout}
        >
          로그아웃
        </div>
      </div>
    </div>
  );
}

export default MyPage;
