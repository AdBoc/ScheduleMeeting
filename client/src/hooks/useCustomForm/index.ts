import {useState} from "react";

export const useCustomForm = <T>() => {
  const [showForm, setShowForm] = useState(false);
  const [itemDetails, setItemDetails] = useState<T | null>(null);

  const handleShowForm = () => setShowForm(prev => !prev);
  const handleShowItem = <Object extends T>(details: Object) => () => {
    if (itemDetails === null) setItemDetails(details);
    else setItemDetails(null);
  }
  const handleHideItem = () => setItemDetails(null);

  return {
    showForm,
    itemDetails,
    handleShowForm,
    handleShowItem,
    handleHideItem
  }
}