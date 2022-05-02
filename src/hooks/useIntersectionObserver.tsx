import React, { useEffect, useState } from 'react';

const useIntersectionObserver = (
  ref: React.RefObject<Element>,
  isLast: boolean,
  options: IntersectionObserverInit = {
    rootMargin: '0%',
    threshold: 0,
    root: null,
  }
): IntersectionObserverEntry | undefined => {
  const [observerEntry, setObserverEntry] =
    useState<IntersectionObserverEntry>();

  const isIntersecting = observerEntry?.isIntersecting;

  useEffect(() => {
    if (ref?.current && isLast && !isIntersecting) {
      const observe = new IntersectionObserver(
        (e: IntersectionObserverEntry[]) => {
          setObserverEntry(e[0]);
        },
        options
      );
      observe.observe(ref.current);
      return () => {
        observe.disconnect();
      };
    }
  }, [ref, isIntersecting]); // isIntersecting 추가하는 이유는 observe.disconnect()를 작동시키기 위해서(리렌더링 방지)

  return observerEntry;
};

export default useIntersectionObserver;
