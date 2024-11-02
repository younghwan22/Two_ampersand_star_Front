import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// axios 인스턴스 생성
const api = axios.create({
  baseURL: "https://kyulimcho.shop", // IP 주소 확인 필요
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 타임아웃 시간 설정 (10초)
});

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordCheck: "",
    nickName: "",
    city: "",
    district: "",
  });

  const [cityOpen, setCityOpen] = useState(false);
  const [districtOpen, setDistrictOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("도시");
  const [selectedDistrict, setSelectedDistrict] = useState("시·군·구");

  const cities = ["서울", "부산", "대구", "인천", "광주", "대전", "울산"];
  const districtsByCity = {
    서울: [
      "강남구",
      "서초구",
      "송파구",
      "강동구",
      "마포구",
      "용산구",
      "성동구",
      "광진구",
    ],
    부산: ["해운대구", "수영구", "부산진구", "동래구", "남구"],
    대구: ["중구", "동구", "서구", "남구", "북구"],
    인천: [
      "중구",
      "동구",
      "미추홀구",
      "연수구",
      "남동구",
      "부평구",
      "계양구",
      "서구",
    ],
    광주: [
      "동구",
      "서구",
      "남구",
      "북구",
      "광산구",
      "하남구",
      "첨단구",
      "운남구",
    ],
    대전: [
      "동구",
      "중구",
      "서구",
      "유성구",
      "대덕구",
      "신탄진구",
      "둔산구",
      "월평구",
    ],
    울산: [
      "중구",
      "남구",
      "동구",
      "북구",
      "울주군",
      "방어진구",
      "삼산구",
      "무거구",
    ],
  };

  const [agreements, setAgreements] = useState({
    all: false,
    terms: false,
    privacy: false,
    marketing: false,
  });

  const handleAllCheck = () => {
    const newValue = !agreements.all;
    setAgreements({
      all: newValue,
      terms: newValue,
      privacy: newValue,
      marketing: newValue,
    });
  };

  const handleSingleCheck = (key) => {
    const newAgreements = {
      ...agreements,
      [key]: !agreements[key],
    };

    const allChecked = Object.keys(newAgreements)
      .filter((k) => k !== "all")
      .every((k) => newAgreements[k]);

    setAgreements({
      ...newAgreements,
      all: allChecked,
    });
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSelectedDistrict("시·군·구");
    setFormData((prev) => ({
      ...prev,
      city: city,
    }));
    setCityOpen(false);
  };

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
    setFormData((prev) => ({
      ...prev,
      district: district,
    }));
    setDistrictOpen(false);
  };

  // 입력 필드 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 회원가입 처리
  const handleSignup = async () => {
    try {
      const response = await api.fetch("/api/auth/register", {
        email: formData.email,
        password: formData.password,
        passwordCheck: formData.passwordCheck,
        nickName: formData.nickName,
        city: selectedCity,
        district: selectedDistrict,
      });

      if (response.status === 200 || response.status === 201) {
        alert("회원가입이 완료되었습니다.");
        navigate("/login");
      }
    } catch (error) {
      if (error.code === "ECONNABORTED") {
        alert("서버 연결 시간이 초과되었습니다. 다시 시도해주세요.");
      } else {
        console.error("Signup error details:", {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
          code: error.code,
        });

        if (error.response) {
          alert(
            `서버 오류: ${
              error.response.data.message || "알 수 없는 오류가 발생했습니다."
            }`
          );
        } else if (error.request) {
          alert("서버와 통신할 수 없습니다. 잠시 후 다시 시도해주세요.");
        } else {
          alert(`오류 발생: ${error.message}`);
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-white">
      <h1 className="mb-16 text-2xl font-medium font-family: Pretendard">
        회원가입
      </h1>

      <div className="w-full max-w-md space-y-4">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="이메일"
          className="w-full p-4 rounded-lg outline-none bg-[#F5F5F5] font-family: Pretendard text-lg"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="비밀번호"
          className="w-full p-4 rounded-lg outline-none bg-[#F5F5F5] font-family: Pretendard text-lg"
        />
        <input
          type="password"
          name="passwordCheck"
          value={formData.passwordCheck}
          onChange={handleInputChange}
          placeholder="비밀번호 확인"
          className="w-full p-4 rounded-lg outline-none bg-[#F5F5F5] font-family: Pretendard text-lg"
        />
        <input
          type="text"
          name="nickName"
          value={formData.nickName}
          onChange={handleInputChange}
          placeholder="닉네임"
          className="w-full p-4 rounded-lg outline-none bg-[#F5F5F5] font-family: Pretendard text-lg"
        />

        <div className="flex gap-4">
          <div className="relative flex-1">
            <div
              onClick={() => setCityOpen(!cityOpen)}
              className="w-full p-4 rounded-lg bg-[#F8F8F8] font-family: Pretendard text-lg cursor-pointer flex justify-between items-center"
            >
              <span className="text-[#A7ADB1]">{selectedCity}</span>
              <IoIosArrowDown
                className={`transition-transform ${
                  cityOpen ? "rotate-180" : ""
                }`}
                size={28}
                color="#D1D5D7"
              />
            </div>

            {cityOpen && (
              <div className="absolute z-10 w-full mt-2 overflow-y-auto bg-white rounded-lg shadow-lg max-h-48">
                {cities.map((city, index) => (
                  <div
                    key={index}
                    className="p-4 hover:bg-gray-100 cursor-pointer text-[#666666]"
                    onClick={() => handleCitySelect(city)}
                  >
                    {city}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative flex-1">
            <div
              onClick={() => setDistrictOpen(!districtOpen)}
              className="w-full p-4 rounded-lg bg-[#F8F8F8] font-family: Pretendard text-lg cursor-pointer flex justify-between items-center"
            >
              <span className="text-[#A7ADB1]">{selectedDistrict}</span>
              <IoIosArrowDown
                className={`transition-transform ${
                  districtOpen ? "rotate-180" : ""
                }`}
                size={28}
                color="#D1D5D7"
              />
            </div>

            {districtOpen && (
              <div className="absolute z-10 w-full mt-2 overflow-y-auto bg-white rounded-lg shadow-lg max-h-48">
                {districtsByCity[selectedCity]?.map((district, index) => (
                  <div
                    key={index}
                    className="p-4 hover:bg-gray-100 cursor-pointer text-[#666666]"
                    onClick={() => handleDistrictSelect(district)}
                  >
                    {district}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div
            className="flex items-center justify-between mt-6 mb-4 cursor-pointer"
            onClick={handleAllCheck}
          >
            <span
              className={`text-xl ${
                agreements.all ? "text-[#48CBC8]" : "text-[#A7ADB1]"
              }`}
            >
              아래 약관을 모두 동의합니다.
            </span>
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center ${
                agreements.all ? "bg-[#48CBC8]" : "border-2 border-gray-300"
              }`}
            >
              <span
                className={`text-base font-bold ${
                  agreements.all ? "text-white" : "text-gray-300"
                }`}
              >
                ✓
              </span>
            </div>
          </div>

          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => handleSingleCheck("terms")}
          >
            <span className="text-[#A7ADB1] font-light text-medium border-b border-gray-300">
              이용약관 동의 (필수)
            </span>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                agreements.terms ? "bg-[#48CBC8]" : "border-2 border-gray-300"
              }`}
            >
              <span
                className={`text-sm font-bold ${
                  agreements.terms ? "text-white" : "text-gray-300"
                }`}
              >
                ✓
              </span>
            </div>
          </div>

          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => handleSingleCheck("privacy")}
          >
            <span className="text-[#A7ADB1] font-light text-medium border-b border-gray-300">
              개인정보 수집 이용 동의 (필수)
            </span>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                agreements.privacy ? "bg-[#48CBC8]" : "border-2 border-gray-300"
              }`}
            >
              <span
                className={`font-family: Pretendard text-sm font-bold ${
                  agreements.privacy ? "text-white" : "text-gray-300"
                }`}
              >
                ✓
              </span>
            </div>
          </div>

          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => handleSingleCheck("marketing")}
          >
            <span className="text-[#A7ADB1] font-family: Pretendard font-light text-medium border-b border-gray-300">
              혜택 | 이벤트 광고 수신 (선택)
            </span>
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                agreements.marketing
                  ? "bg-[#48CBC8]"
                  : "border-2 border-gray-300"
              }`}
            >
              <span
                className={`font-family: Pretendard text-sm font-bold ${
                  agreements.marketing ? "text-white" : "text-gray-300"
                }`}
              >
                ✓
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleSignup}
          className="w-full p-4 bg-[#B4FFE3] text-[#12918E] rounded-lg text-lg font-medium font-family: Pretendard mt-6"
        >
          가입하기
        </button>
      </div>
    </div>
  );
}

export default Signup;
