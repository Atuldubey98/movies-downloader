import { useLayoutEffect, useState } from "react";

export default function useScrollPage() {
  const [page, setPage] = useState(1);
  const togglePageToOne = () => {
    setPage(1);
  };
  useLayoutEffect(() => {
    function infiniteScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        setPage((p) => p + 1);
      }
    }
    window.addEventListener("scroll", infiniteScroll);
    return () => {
      window.removeEventListener("scroll", infiniteScroll);
    };
  }, []);
  return {page, togglePageToOne};
}
