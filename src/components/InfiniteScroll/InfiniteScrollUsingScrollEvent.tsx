import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled/macro';
import throttle from 'lodash/throttle';
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

const InfiniteScrollUsingScrollEvent: React.FC = () => {
  const [list, setList] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [isBottom, setIsBottom] = useState<boolean>(false);
  const itemList = useRef<HTMLUListElement>(null);

  const handleScroll = throttle(() => {
    if (itemList.current) {
      const { scrollHeight, offsetHeight, scrollTop } = itemList.current;
      const offset = 150;
      setIsBottom(scrollHeight - offsetHeight - scrollTop < offset);
    }
  }, 300);

  useEffect(() => {
    !isBottom && list.length === 0 && fetch(true);
    isBottom && fetch();
  }, [isBottom]);

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
      <h3>InfiniteScrollUsingScrollEvent</h3>
      <h4>total : {total}</h4>
      <ItemList ref={itemList} onScroll={handleScroll}>
        {list.map((item) => (
          <Item key={item.id} {...item} />
        ))}
        {!isBottom && <h4>Loading...</h4>}
      </ItemList>
    </div>
  );
};

export default InfiniteScrollUsingScrollEvent;
