// Libraries
import styled from 'styled-components';

export const ScrollbarsWrapper = styled.div``;

export const ThumbBar = styled.div`
  background: #d9d9d9;
  border-radius: 4px;
`;

export const VerticalTrack = styled.div`
  position: absolute;
  width: 4px !important;
  transition: opacity 200ms ease 0s;
  opacity: 0;
  right: 0px;
  bottom: 2px;
  top: 2px;
  border-radius: 4px;
`;

export const HorizontalTrack = styled.div`
  position: absolute;
  height: 4px !important;
  transition: opacity 200ms ease 0s;
  opacity: 0;
  right: 2px;
  bottom: 0px;
  left: 2px;
  border-radius: 4px;
`;
