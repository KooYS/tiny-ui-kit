import usePagination from '../../hooks/usePagination';
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
  page?: number;
  onChange: (value: number) => void;
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
  flex-shrink: 0;
`;
const ItemButton = styled.button<{
  pageType: string;
  selected: boolean;
  disabled: boolean;
  children: React.ReactNode;
}>`
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
    ${({ pageType, children }) =>
    (pageType === 'start-ellipsis' ||
      pageType === 'end-ellipsis' ||
      !children) &&
    css`
      border: 0;
    `}
`;
const Ellipsis = styled.span``;

const Pagination: React.FC<PaginationProps> = ({
  count,
  hidePrevButton = true,
  hideNextButton = true,
  defaultPage,
  siblingCount,
  boundaryCount,
  page,
  onChange,
}) => {
  const { items } = usePagination({
    count,
    siblingCount,
    defaultPage,
    page,
    boundaryCount,
    onChange,
  });

  const transformItem = (type: string, page: number) => {
    let children;
    if (type === 'end-ellipsis' || type === 'start-ellipsis') {
      children = <Ellipsis>. . .</Ellipsis>;
    } else if (type === 'next') {
      if (hideNextButton) children = <GrNext />;
    } else if (type === 'prev') {
      if (hidePrevButton) children = <GrPrevious />;
    } else {
      children = page;
    }
    return children;
  };

  return (
    <Container>
      <ItemList>
        {items.map(({ type, page, ...item }, index) => {
          return (
            <Item key={index}>
              <ItemButton pageType={type} {...item}>
                {transformItem(type, page)}
              </ItemButton>
            </Item>
          );
        })}
      </ItemList>
    </Container>
  );
};

export default Pagination;
