import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// axios 인스턴스 생성
const api = axios.create({
  baseURL: "http://3.38.168.166:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      console.log("Login response:", response);

      if (response.status === 200 || response.status === 201) {
        // 로그인 성공 시 토큰 저장 (백엔드에서 토큰을 제공하는 경우)
        if (response.data.assessToken) {
          localStorage.setItem("token", response.data.assessToken);
          console.log(response.data.assessToken);
        }
        alert("반갑습니다!");
        navigate("/");
      }
    } catch (error) {
      console.error("Login error details:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });

      if (error.response) {
        alert(error.response.data.message || "로그인 실패");
      } else if (error.request) {
        alert("서버와 통신할 수 없습니다. 잠시 후 다시 시도해주세요.");
      } else {
        alert(`오류 발생: ${error.message}`);
      }
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-white">
      <h1 className="mb-16 text-2xl font-medium font-family: Pretendard">
        로그인
      </h1>

      {/* 로고 이미지들 */}
      <div className="flex flex-col items-center mb-8">
        <img
          src="/img/logo.png"
          alt="Track It Logo"
          className="w-20 h-20 mb-4"
        />
        <img src="/img/trackit.png" alt="Track It Text" className="w-40" />
      </div>

      {/* 로그인 폼 */}
      <form onSubmit={handleLogin} className="w-full max-w-md space-y-4">
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="이메일"
          className="w-full p-4 rounded-lg outline-none bg-[#F5F5F5] font-family: Pretendard"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="비밀번호"
          className="w-full p-4 rounded-lg outline-none bg-[#F5F5F5] font-family: Pretendard"
        />
        <button
          type="submit"
          className="w-full p-4 bg-[#B4FFE3] text-[#12918E] rounded-lg text-lg font-medium font-family: Pretendard"
        >
          로그인
        </button>
      </form>

      {/* 회원가입 링크 */}
      <div className="mt-4 text-center">
        <span className="text-[#A7ADB1] font-family: Pretendard">
          계정이 없으신가요?{" "}
        </span>
        <Link to="/signup" className="text-[#4ED9D4] font-family: Pretendard">
          회원가입하기
        </Link>
      </div>
    </div>
  );
}

export default Login;
