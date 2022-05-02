import styled from '@emotion/styled/macro';
import React, { CSSProperties } from 'react';
import { keyframes, css } from '@emotion/react';

interface SkeletonProps {
  width?: number;
  height?: number;
  circle?: boolean;
  rounded?: boolean;
  animation?: boolean;
  style?: CSSProperties;
  color?: string;
  unit?: string;
}

const waveKeyframe = keyframes`
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const waveAnimation = css`
  overflow: hidden;
  position: relative;
  &::after {
    animation: ${waveKeyframe} 1.5s linear infinite;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    position: absolute;
    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 20%),
      transparent
    );
  }
`;

const Base = styled.div<SkeletonProps>`
  ${({ width, unit }) => width && unit && `width : ${width}${unit};`}
  ${({ height, unit }) => height && unit && `height : ${height}${unit};`}
  ${({ color }) => color && `background-color : ${color};`}
  ${({ circle }) => circle && `border-radius: 50%;`}
  ${({ rounded }) => rounded && `border-radius : 5px;`}
  ${({ animation }) => animation && waveAnimation}
`;

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  circle,
  rounded,
  style,
  color = '#e9e9e9',
  unit = 'px',
  animation = true,
}) => {
  return (
    <Base
      width={width}
      height={height}
      circle={circle}
      rounded={rounded}
      style={style}
      color={color}
      animation={animation}
      unit={unit}></Base>
  );
};
