import {useCallback, useState} from "react";

export const useForceUpdate = () => {
  const [, setRerender] = useState({});
  const forceUpdate = useCallback(() => setRerender({}), []);
  return {
    forceUpdate
  }
}