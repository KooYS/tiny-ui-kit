import { useEffect, useLayoutEffect, useState } from 'react';
import React from 'react';
import styled from '@emotion/styled/macro';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import useCarouselDrag from '../../hooks/useCarouselDrag';

interface CarouselProps {
  arrow?: boolean;
  images?: string[];
  autoplay?: boolean;
  delay?: number;
  touchable?: boolean;
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
const CarouselItem = styled.li<{ currentIndex: number }>`
  width: 100%;
  flex: 1 0 100%;
  touch-action: none;
  & img {
    width: 100%;
    aspect-ratio: 16/9;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
  }
  transform: translate(${({ currentIndex }) => `${currentIndex * -100}%`}, 0);
  transition: 200ms ease;
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
  z-index: 1;
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
  height: 30px;
  border: 0;
  margin: 0;
  padding: 0;
  background-color: transparent;
  &::after {
    content: '';
    background-color: white;
    opacity: ${({ isActive }) => (isActive ? 0.8 : 0.4)};
    display: block;
    width: 30px;
    height: 5px;
  }
`;

const Carousel: React.FC<CarouselProps> = ({
  images,
  realIndex,
  autoplay = false,
  delay = 1000,
  touchable = true,
  arrow = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentAutoplay, setCurrentAutoplay] = useState<boolean>(autoplay);

  const handleRightArrowClick = () => {
    if (images) setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleLeftArrowClick = () => {
    if (images)
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const { handleTouchEnd, handleTouchMove, handleTouchStart } = useCarouselDrag(
    {
      leftAction: handleLeftArrowClick,
      rightAction: handleRightArrowClick,
      disabled: touchable,
    }
  );

  useEffect(() => {
    if (currentAutoplay) {
      const interval = setInterval(() => {
        handleRightArrowClick();
      }, delay);
      return () => {
        clearInterval(interval);
      };
    }
  }, [currentAutoplay]);

  const handleNavBtnClick = (index: number) => {
    if (images) setCurrentIndex(index);
  };

  useLayoutEffect(() => {
    if (realIndex) realIndex(currentIndex);
  }, [currentIndex]);

  return (
    <Container
      onMouseLeave={(e) => {
        setCurrentAutoplay(autoplay);
        handleTouchEnd(e.pageX, e.pageY);
      }}
      onTouchMove={handleTouchMove}
      onMouseMove={handleTouchMove}
      onMouseOver={() => setCurrentAutoplay(false)}
      onTouchStart={(e) => {
        handleTouchStart(
          e.changedTouches[0].clientX,
          e.changedTouches[0].clientY
        );
        setCurrentAutoplay(false);
      }}
      onTouchEnd={(e) => {
        handleTouchEnd(
          e.changedTouches[0].clientX,
          e.changedTouches[0].clientY
        );
        setCurrentAutoplay(autoplay);
      }}
      onMouseDown={(e) => handleTouchStart(e.pageX, e.pageY)}
      onMouseUp={(e) => handleTouchEnd(e.pageX, e.pageY)}>
      {arrow && (
        <CarouselArrowBtn onClick={handleLeftArrowClick} position="left">
          <FaAngleLeft />
        </CarouselArrowBtn>
      )}
      <CarouselList>
        {images?.map((image, index) => {
          return (
            <CarouselItem key={index} currentIndex={currentIndex}>
              <img src={image} />
            </CarouselItem>
          );
        })}
      </CarouselList>
      {arrow && (
        <CarouselArrowBtn onClick={handleRightArrowClick} position="right">
          <FaAngleRight />
        </CarouselArrowBtn>
      )}
      <CarouselNav>
        {images?.map((_, index: number) => (
          <CarouselNavItem key={index}>
            <CarouselNavBtn
              onClick={() => handleNavBtnClick(index)}
              isActive={index === currentIndex}></CarouselNavBtn>
          </CarouselNavItem>
        ))}
      </CarouselNav>
    </Container>
  );
};

export default Carousel;
