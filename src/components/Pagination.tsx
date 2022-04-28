import usePagination from '../hooks/usePagination';
import styled from '@emotion/styled/macro';
import React from 'react';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { css } from '@emotion/react';
interface PaginationProps {
  count: number;
  hidePrevButton: boolean;
  hideNextButton: boolean;
  defaultPage: number;
  siblingCount: number;
  boundaryCount: number;
}

const Container = styled.div``;

const ItemList = styled.ul`
  list-style: none;
  display: flex;
  gap: 5px;
`;
const Item = styled.li`
  width: 30px;
  height: 30px;
`;
const ItemButton = styled.button<{ selected: boolean; disabled: boolean }>`
  cursor: pointer;
  background-color: transparent;
  border: 1px solid #cdcdcd;
  margin: 0;
  padding: 0;
  border-radius: 50%;
  width: 100%;
  height: 100%;

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.4;
    `}
  ${({ selected }) =>
    selected &&
    css`
      font-weight: bold;
      background-color: #cdcdcd;
    `}
`;
const Ellipsis = styled.span``;

const Pagination: React.FC<PaginationProps> = ({
  count,
  hidePrevButton,
  hideNextButton,
  defaultPage,
  siblingCount,
  boundaryCount,
}) => {
  const { items } = usePagination({
    count,
    siblingCount,
    defaultPage,
    boundaryCount,
  });
  return (
    <Container>
      <ItemList>
        {items.map(({ type, onClick, page, ...item }, index) => {
          let children;
          if (type === 'end-ellipsis' || type === 'start-ellipsis') {
            children = <Ellipsis>...</Ellipsis>;
          } else if (type === 'next') {
            children = <GrNext />;
          } else if (type === 'prev') {
            children = <GrPrevious />;
          } else {
            children = page;
          }
          return (
            <Item key={index}>
              <ItemButton {...item}>{children}</ItemButton>
            </Item>
          );
        })}
      </ItemList>
    </Container>
  );
};

export default Pagination;
