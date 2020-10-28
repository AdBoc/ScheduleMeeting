import {useState} from "react";

export const useCustomForm = <T>() => {
  const [showForm, setShowForm] = useState(false);
  const [itemDetails, setItemDetails] = useState<T | false>(false);

  const handleShowItem = <Object extends T>(details: Object) => () => setItemDetails(details);
  const handleHideItem = () => setItemDetails(false);

  return {
    showForm,
    itemDetails,
    setShowForm,
    setItemDetails,
    handleHideItem,
    handleShowItem
  }
}