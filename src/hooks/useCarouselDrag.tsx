import { useRef } from 'react';

interface DragInfoProps {
  status: 'start' | 'end' | 'move' | 'init';
  direction: 'left' | 'right';
  x: number;
  y: number;
}

interface Props {
  leftAction: () => void;
  rightAction: () => void;
  disabled: boolean;
}

interface Return {
  handleTouchStart: (x: number, y: number) => void;
  handleTouchMove: () => void;
  handleTouchEnd: (x: number, y: number) => void;
}

const useCarouselDrag = ({
  leftAction,
  rightAction,
  disabled,
}: Props): Return => {
  const dragInfo = useRef<DragInfoProps>({
    status: 'init',
    direction: 'left',
    x: 0,
    y: 0,
  });

  const handleTouchStart = (x: number, y: number) => {
    if (dragInfo.current.status === 'end' || dragInfo.current.status === 'init')
      dragInfo.current = { status: 'start', direction: 'left', x, y };
  };
  const handleTouchMove = () => {
    if (dragInfo.current.status === 'start') {
      dragInfo.current = {
        ...dragInfo.current,
        status: 'move',
      };
    }
  };
  const handleTouchEnd = (x: number, y: number) => {
    if (dragInfo.current.status === 'move') {
      let data: DragInfoProps = {
        ...dragInfo.current,
        status: 'end',
      };
      if (
        Math.sqrt(
          Math.pow(dragInfo.current.x - x, 2) +
            Math.pow(dragInfo.current.y - y, 2)
        ) > 100
      ) {
        const direction: 'left' | 'right' =
          dragInfo.current.x - x > 0 ? 'left' : 'right';
        data = {
          ...data,
          direction: direction,
          x,
          y,
        };
        dragInfo.current = data;

        if (dragInfo.current.status === 'end') {
          if (dragInfo.current.direction === 'right') leftAction();
          else if (dragInfo.current.direction === 'left') rightAction();
        }
      } else dragInfo.current = data;
    } else {
      dragInfo.current = {
        ...dragInfo.current,
        status: 'end',
      };
    }
  };

  if (disabled)
    return {
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
    };
  else {
    return {
      handleTouchStart: () => {
        return false;
      },
      handleTouchMove: () => {
        return false;
      },
      handleTouchEnd: () => {
        return false;
      },
    };
  }
};

export default useCarouselDrag;
