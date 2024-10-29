import { useRef, useEffect, RefObject } from "react";

export const useClickOutside = (callback: Function) => {
  const ref: RefObject<HTMLElement | undefined> = useRef();

  useEffect(() => {
    const handleClick = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [ref]);

  return ref;
};
