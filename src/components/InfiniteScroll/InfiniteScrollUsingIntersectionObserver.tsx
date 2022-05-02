import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled/macro';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

interface Params {
  limit: number;
  skip: number;
}

type Product = {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
};

type IntersectionObserverProps = {
  isLast: boolean;
  onFetchProducts: (trigger: boolean) => void;
};

const ItemList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 25px;
  align-items: center;
  padding: 20px 0;
  height: 100vh;
  overflow: scroll;
`;
const StyledItem = styled.li`
  height: 150px;
  border-radius: 8px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  width: 100%;
  max-width: 300px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  flex-shrink: 0;
`;

const Item = React.memo(
  ({
    id,
    title,
    isLast,
    onFetchProducts,
  }: Product & IntersectionObserverProps) => {
    const ref = useRef<HTMLLIElement>(null);
    const entry = useIntersectionObserver(ref, isLast, {});

    useEffect(() => {
      onFetchProducts(isLast && !!entry?.isIntersecting);
    }, [isLast && !!entry?.isIntersecting]);

    return (
      <StyledItem ref={ref}>
        {id} : {title}
      </StyledItem>
    );
  }
);

const ProductFetch = async (params: Params) => {
  const res = await axios.get('https://dummyjson.com/products', {
    params,
  });
  const { products, total } = res.data;
  return { products, total };
};

const InfiniteScrollUsingIntersectionObserver: React.FC = () => {
  const [list, setList] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [isBottom, setIsBottom] = useState<boolean>(false);

  useEffect(() => {
    list.length === 0 && fetch(true);
  }, []);

  const fetch = (init?: boolean) => {
    async function task() {
      const result = await ProductFetch({ limit: 20, skip: page });
      setList((prev) => prev.concat(result.products));
      setPage((prev) => prev + 20);
      if (init) setTotal(result.total);
      setIsBottom(false);
    }
    task();
  };

  return (
    <div>
      <h3>InfiniteScrollUsingIntersectionObserver</h3>
      <h4>total : {total}</h4>
      <ItemList>
        {list.map((item, index) => (
          <Item
            key={item.id}
            isLast={index === list.length - 1}
            onFetchProducts={(trigger: boolean) => {
              if (trigger) {
                setIsBottom(true);
                fetch();
              }
            }}
            {...item}
          />
        ))}
        {!isBottom && <h4>Loading...</h4>}
      </ItemList>
    </div>
  );
};

export default InfiniteScrollUsingIntersectionObserver;
