import {useEffect, useRef} from "react";

export const useMounted = () => {
  const isMounted = useRef(true);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  return {
    isMounted
  };
}