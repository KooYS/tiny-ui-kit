import { useEffect } from 'react';
import React from 'react';
import styled from '@emotion/styled/macro';
import { css } from '@emotion/react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

interface CarouselProps {
  arrow?: boolean;
  images?: string[];
  realIndex?: (index: number) => void;
}

const Container = styled.div`
  position: relative;
  width: 700px;
`;
const CarouselList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;
const CarouselItem = styled.li`
  width: 100%;
  flex: 1 0 100%;
  & img {
    width: 100%;
    aspect-ratio: 16/9;
  }
`;
const CarouselArrowBtn = styled.button<{ position: 'left' | 'right' }>`
  position: absolute;
  ${({ position }) => position === 'left' && 'left : 0;'}
  ${({ position }) => position === 'right' && 'right : 0;'}
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  margin: 0;
  background: transparent;
  border: 0;
  font-size: 40px;
  color: #ffffff;
`;
const CarouselNav = styled.ul`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 0;
  display: flex;
  list-style: none;
  gap: 5px;
`;
const CarouselNavItem = styled.li``;
const CarouselNavBtn = styled.button<{ isActive?: boolean }>`
  width: 30px;
  height: 6px;
  border: 0;
  background-color: white;
  opacity: ${({ isActive }) => (isActive ? 0.5 : 0.8)};
`;

const Carousel: React.FC<CarouselProps> = ({ images, realIndex }) => {
  const number = React.useRef<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (realIndex) {
        realIndex(number.current);
        number.current++;
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [realIndex]);

  return (
    <Container>
      <CarouselArrowBtn position="left">
        <FaAngleLeft />
      </CarouselArrowBtn>
      <CarouselList>
        {images?.map((image) => {
          return (
            <CarouselItem>
              <img src={image} />{' '}
            </CarouselItem>
          );
        })}
      </CarouselList>
      <CarouselArrowBtn position="right">
        <FaAngleRight />
      </CarouselArrowBtn>
      <CarouselNav>
        <CarouselNavItem>
          <CarouselNavBtn isActive={false}></CarouselNavBtn>
        </CarouselNavItem>
        <CarouselNavItem>
          <CarouselNavBtn isActive={true}></CarouselNavBtn>
        </CarouselNavItem>
        <CarouselNavItem>
          <CarouselNavBtn isActive={false}></CarouselNavBtn>
        </CarouselNavItem>
        <CarouselNavItem>
          <CarouselNavBtn isActive={false}></CarouselNavBtn>
        </CarouselNavItem>
        <CarouselNavItem>
          <CarouselNavBtn isActive={false}></CarouselNavBtn>
        </CarouselNavItem>
      </CarouselNav>
    </Container>
  );
};

export default Carousel;
