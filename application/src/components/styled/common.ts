// Libraries
import styled from 'styled-components';

export const ImageOverlay = styled.div`
  top: 0px;
  left: 0px;
  z-index: 1;
  width: 100%;
  height: 100%;
  position: absolute;
  background: linear-gradient(
    to bottom,
    rgba(var(--palette-common-blackChannel) / 0) 0%,
    var(--palette-common-black) 75%
  );
`;
