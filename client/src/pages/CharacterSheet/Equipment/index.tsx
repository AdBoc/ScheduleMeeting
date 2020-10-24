import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers";
import {dndMath} from "../../../utils/dndMath";
import {useCustomForm} from "../../../hooks/useCustomForm";
import {EquipmentItem} from "../../../redux/types";
import AddItem from "./AddItem";
import {deleteInArray} from "../../../redux/actions";
import MultiSelect from "react-multi-select-component";
import {filteredEquipment} from "../../../redux/selectors";
import styles from "./equipment.module.scss";

const options = [
  {label: "Armors", value: "armors"},
  {label: "Weapons", value: "weapons"},
  {label: "Potions", value: "potions"},
  {label: "Magic Items", value: "magic"},
  {label: "Tools", value: "tools"},
  {label: "Other", value: "other"}
];

const Equipment = () => {
  const [select, setSelect] = useState<{ label: string, value: string }[] | never[]>([]);

  const items = useSelector(filteredEquipment(select));
  const currency = useSelector((state: RootState) => state.characterReducer.Other.Currency);
  const dispatch = useDispatch();

  const {showForm, handleShowForm, itemDetails, handleShowItem, ref, handleHideItem} = useCustomForm<EquipmentItem>();

  const handleDelete = () => {
    handleHideItem();
    dispatch(deleteInArray("Equipment", itemDetails!.id));
  }

  return (
    <>
      <div className={styles.buttons}>
        <button className={styles.basicButton}>Total GP: {dndMath.totalGp(currency)}</button>
        <button className={styles.basicButton} onClick={handleShowForm}>Add item</button>
      </div>
      {showForm && <AddItem closeForm={handleHideItem}/>}
      <MultiSelect
        className={styles.multiselect}
        options={options}
        value={select}
        onChange={setSelect}
        labelledBy={"Select"}
        hasSelectAll={false}
        disableSearch={true}
      />
      {items.map(item => (
        <div key={item.id} className={styles.items} onClick={handleShowItem(item)}>
          <p>{item.name}</p>
          <p className={styles.itemQuantity}>{item.quantity ? item.quantity : "-"}</p>
        </div>
      ))}
      {itemDetails &&
      <div ref={ref}>
          <p>{itemDetails.name}</p>
          <p>{itemDetails.description}</p>
          <p>{itemDetails.quantity ? itemDetails.quantity : "-"}</p>
          <button onClick={handleDelete}>Delete</button>
      </div>
      }
    </>
  );
}

export default Equipment;