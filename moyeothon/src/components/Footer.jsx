import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  background-color: #b4ffe3;
  padding: 15px;
  padding-left: 100px;
  padding-right: 100px;
  height: 100px;
  max-width: 480px;
  margin: 0 auto;

  & div {
    display: flex;
    gap: 15px;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div>
        <LogoLink to="/">
          <img
            src="../../img/lucide_home.png"
            alt="홈아이콘"
            style={{ width: "45px", height: "45px" }}
          />
        </LogoLink>
      </div>
      <div>
        <LogoLink to="/mypage">
          <img
            src="../../img/gg_profile.png"
            alt="사용자아이콘"
            style={{ width: "45px", height: "45px" }}
          />
        </LogoLink>
      </div>
    </StyledFooter>
  );
};

export default Footer;
