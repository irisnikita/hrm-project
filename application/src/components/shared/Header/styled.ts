// Libraries
import styled, { css } from "styled-components";

export const StyledHeader = styled.header<{ $isScrolled?: boolean }>`
  z-index: 1000;

  ${(props) =>
    props.$isScrolled &&
    css`
      background-color: rgb(255, 255, 255, 0.8);
      backdrop-filter: blur(6px) !important;
    `}
`;
