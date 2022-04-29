import { useLayoutEffect, useState } from 'react';

interface Props {
  count: number;
  defaultPage: number;
  page?: number;
  siblingCount: number;
  boundaryCount: number;
  onChange: (value: number) => void;
}

interface Item {
  onClick: () => void;
  type: string;
  page: number;
  selected: boolean;
  disabled: boolean;
}
interface Return {
  items: Item[];
}

const usePagination = ({
  count,
  defaultPage = 1,
  page,
  siblingCount = 0,
  boundaryCount = 1,
  onChange,
}: Props): Return => {
  const [_page, setPage] = useState<number>(page ? defaultPage : 1);

  useLayoutEffect(() => {
    setPage(defaultPage > count ? count : defaultPage < 1 ? 1 : defaultPage);
  }, [defaultPage]);
  const handleClick = (item: number | string) => {
    if (typeof item === 'number') {
      setPage(item);
    } else if (item === 'prev') {
      setPage((prev) => (1 <= prev - 1 ? prev - 1 : prev));
    } else if (item === 'next') {
      setPage((prev) => (count >= prev + 1 ? prev + 1 : prev));
    } else {
      return;
    }
  };

  useLayoutEffect(() => {
    if (onChange) {
      onChange(_page);
    }
  }, [_page]);
  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }).map((_, index) => index + start);
  };

  const startPages = range(1, Math.min(boundaryCount, count));
  const endPages = range(
    Math.max(count - boundaryCount + 1, boundaryCount + 1),
    count
  );

  const siblingStart = Math.max(
    Math.min(
      _page - siblingCount,
      count - boundaryCount - siblingCount * 2 - 1
    ),
    Math.min(boundaryCount, count) + 1
  );

  const siblingEnd = Math.min(
    Math.max(_page + siblingCount, boundaryCount + siblingCount * 2 + 2),
    endPages.length > 0 ? endPages[0] - 1 : 0
  );

  const pageList = [
    'prev',
    ...startPages,
    ...(siblingStart - 1 > Math.min(boundaryCount, count)
      ? siblingStart - Math.min(boundaryCount, count) === 2
        ? [Math.min(boundaryCount, count) + 1]
        : ['start-ellipsis']
      : []),
    ...range(siblingStart, siblingEnd),
    ...(siblingEnd != 0 &&
    siblingEnd + 1 < Math.max(count - boundaryCount + 1, boundaryCount + 1)
      ? Math.max(count - boundaryCount + 1, boundaryCount + 1) - siblingEnd ===
        2
        ? [count - boundaryCount]
        : ['end-ellipsis']
      : []),
    ...endPages,
    'next',
  ];

  const items: Item[] = pageList.map((item) => {
    if (typeof item === 'string') {
      return {
        onClick: () => handleClick(item),
        type: item,
        page: 1,
        selected: false,
        disabled:
          item === 'next'
            ? _page === count
            : item === 'prev'
            ? _page === 1
            : false,
      };
    } else {
      return {
        onClick: () => handleClick(item),
        type: 'page',
        page: item,
        selected: item === _page,
        disabled: false,
      };
    }
  });
  return {
    items,
  };
};

export default usePagination;
