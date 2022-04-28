import React from 'react';

interface Props {
  count: number;
  defaultPage: number;
  siblingCount: number;
  boundaryCount: number;
}

interface Item {
  onClick: () => void;
  type: 'prev' | 'page' | 'next' | 'start-ellipsis' | 'end-ellipsis';
  page: number;
  selected: boolean;
  disabled: boolean;
}
interface Return {
  items: Item[];
}

const Item: Item[] = [
  {
    onClick: () => {
      console.log('onlick');
    },
    type: 'prev',
    page: 1,
    selected: false,
    disabled: true,
  },
  {
    onClick: () => {
      console.log('onlick');
    },
    type: 'page',
    page: 1,
    selected: true,
    disabled: false,
  },
  {
    onClick: () => {
      console.log('onlick');
    },
    type: 'page',
    page: 2,
    selected: false,
    disabled: false,
  },
  {
    onClick: () => {
      console.log('onlick');
    },
    type: 'next',
    page: 2,
    selected: false,
    disabled: false,
  },
];

const usePagination = ({
  count,
  defaultPage,
  siblingCount,
  boundaryCount,
}: Props): Return => {
  return {
    items: Item,
  };
};

export default usePagination;
