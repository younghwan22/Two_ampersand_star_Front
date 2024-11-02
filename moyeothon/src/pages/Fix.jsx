import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Fix() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nickname: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    // 토큰 체크
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    // 현재 사용자 정보 불러오기
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          "http://3.38.168.166:8080/api/users/info",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 403) {
          alert("세션이 만료되었습니다. 다시 로그인해주세요.");
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        if (!response.ok) throw new Error("Failed to fetch user info");

        const data = await response.json();
        setFormData((prev) => ({
          ...prev,
          nickname: data.nickname,
        }));
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserInfo();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      // 요청 전 데이터 로깅
      console.log("Sending data:", {
        nickname: formData.nickname,
        password: formData.password,
      });

      // // 먼저 토큰 유효성 검증
      // const checkResponse = await fetch('http://3.38.168.166:8080/api/users/info', {
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // });

      // if (checkResponse.status === 403) {
      //   localStorage.removeItem('token');
      //   alert('로그인이 필요합니다.');
      //   navigate('/login');
      //   return;
      // }

      // 정보 업데이트 요청
      const response = await fetch("http://3.38.168.166:8080/api/users/info", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickName: formData.nickName,
          password: formData.password,
        }),
      });

      // 응답 상태 로깅
      console.log("Response status:", response.status);

      // if (response.status === 403) {
      //   alert('세션이 만료되었습니다. 다시 로그인해주세요.');
      //   localStorage.removeItem('token');
      //   alert('로그인이 필요합니다.');
      //   navigate('/login');
      //   return;
      // }

      if (!response.ok) {
        throw new Error("정보 수정에 실패했습니다.");
      }

      alert("정보가 성공적으로 수정되었습니다.");
      navigate("/mypage");
    } catch (error) {
      console.error("Error:", error);
      setError("정보 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="w-full max-w-md min-h-screen mx-auto bg-white">
      <div className="p-4">
        <div className="relative flex items-center justify-center mb-14">
          <button
            onClick={() => navigate("/mypage")}
            className="text-4xl text-[#A1A6A9] absolute left-0"
          >
            ←
          </button>
          <h1 className="text-xl font-medium">마이페이지</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nickName"
            value={formData.nickName}
            onChange={handleChange}
            placeholder="닉네임을 입력하세요"
            className="w-full p-3 rounded-lg bg-[#F5F5F5]"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="새 비밀번호를 입력하세요"
            className="w-full p-3 bg-[#F5F5F5] rounded-lg"
            required
          />
          {error && <p className="text-sm text-center text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full p-3 bg-[#B4FFE3] rounded-lg text-[#12918E] font-semibold text-lg hover:bg-[#A0EBD0]"
          >
            수정 완료 하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default Fix;
