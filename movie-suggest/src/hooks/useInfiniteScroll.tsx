import { useEffect, useRef, useState } from "react";

export default function useInfiniteScroll(hasNext: boolean) {
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const [page, setPage] = useState<number>(1);
  const hasNextRef = useRef(hasNext);
  function togglePagToOne() {
    setPage(1);
  }
  const observer = useRef(
    new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const first = entries[0];
        if (first.isIntersecting && hasNextRef.current) {
          setPage((p) => p + 1);
        }
      },
      {
        threshold: 1,
      }
    )
  );
  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;
    if (currentElement) {
      currentObserver.observe(currentElement);
      hasNextRef.current = hasNext;
    }
    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);
  return { page, setElement, togglePagToOne };
}
