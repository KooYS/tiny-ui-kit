import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from '@emotion/styled/macro';
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

const StyledInfiniteScroll = styled(InfiniteScroll)`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 25px;
  align-items: center;
  padding: 20px 0;
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

const Item = React.memo(({ id, title }: Product) => {
  return (
    <StyledItem>
      {id} : {title}
    </StyledItem>
  );
});

const ProductFetch = async (params: Params) => {
  const res = await axios.get('https://dummyjson.com/products', {
    params,
  });
  const { products, total } = res.data;
  return { products, total };
};

const InfiniteScrollUsingPackage: React.FC = () => {
  const [list, setList] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    fetch(true);
  }, []);

  const fetch = (init?: boolean) => {
    async function task() {
      const result = await ProductFetch({ limit: 20, skip: page });
      setList((prev) => prev.concat(result.products));
      setPage((prev) => prev + 20);
      if (init) setTotal(result.total);
    }
    task();
  };

  return (
    <div>
      <h3>InfiniteScrollUsingPackage</h3>
      <h4>total : {total}</h4>
      <StyledInfiniteScroll
        dataLength={list.length}
        next={fetch}
        hasMore={list.length !== total}
        loader={<h4>Loading...</h4>}>
        {list.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </StyledInfiniteScroll>
    </div>
  );
};

export default InfiniteScrollUsingPackage;
