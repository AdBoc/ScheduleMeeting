import {useEffect, useState} from "react";

export const useSortState = <T extends Array<any>>(initialState: T) => {
  const [sortedState, setSortedState] = useState<T>(initialState);
  const [sortingOptions, setSortingOptions] = useState({prop: "name", inverted: false});

  useEffect(() => {
    const sorted = [...sortedState].sort((a, b) => a[sortingOptions.prop].localeCompare(b[sortingOptions.prop]));
    if (sortingOptions.inverted) sorted.reverse();
    setSortedState(<T>sorted);
  }, [sortingOptions]);

  const handleSorting = ({target}: any) => setSortingOptions(prev => {
    if (prev.prop === target.name) return {...prev, inverted: !prev.inverted};
    return {prop: target.name, inverted: false};
  })

  return {
    sortedState,
    handleSorting
  }
}
// React.ChangeEvent<HTMLTextAreaElement>