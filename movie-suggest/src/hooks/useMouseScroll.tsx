import { useEffect, useRef } from "react";

export default function useMouseScroll() {
  const divRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const elementRef = divRef.current;
    if (elementRef) {
      elementRef.addEventListener("wheel", (e: WheelEvent) => {
        elementRef.scrollLeft += e.deltaY;
      });
    }
    return () => {
      elementRef?.removeEventListener("wheel", () => {});
    };
  }, []);
  return divRef;
}
