// Libraries
import styled from "styled-components";

export const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.9)
    ),
    url("/images/backgrounds/overlay-1.webp");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  padding-top: 80px;
  padding-bottom: 80px;
  overflow: hidden;
  position: relative;
`;
