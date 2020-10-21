import {useEffect, useRef, useState} from "react";

export const useCustomForm = <T>() => {
  const [showForm, setShowForm] = useState(false);
  const [itemDetails, setItemDetails] = useState<T | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  const handleShowForm = () => setShowForm(prev => !prev);
  const handleShowItem = <Object extends T>(details: Object) => () => setItemDetails(details);
  const handleHideItem = () => setItemDetails(null);
  const handleClick = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      if (itemDetails) handleHideItem();
    }
  }

  return {
    showForm,
    itemDetails,
    ref,
    handleShowForm,
    handleShowItem,
    handleHideItem
  }
}