import {useEffect, useRef} from "react";

export const useIsMounted = () => {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => void (isMounted.current = false);
  }, []);
  return isMounted.current;
};