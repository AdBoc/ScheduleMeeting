import {useState} from "react";

export const useCustomForm = <T>() => {
  const [showForm, setShowForm] = useState(false);
  const [showItem, setShowItem] = useState(false);
  const [itemDetails, setItemDetails] = useState<T | null>(null);

  const handleShowForm = () => setShowForm(prev => !prev);
  const handleShowItem = <Object extends T>(details: Object) => () => {
    setShowItem(prev => !prev);
    setItemDetails(details);
  }

  return {
    showForm,
    showItem,
    itemDetails,
    handleShowForm,
    handleShowItem
  }
}