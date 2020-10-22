import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers";
import {dndMath} from "../../../utils/dndMath";
import {useCustomForm} from "../../../hooks/useCustomForm";
import {EquipmentItem} from "../../../redux/types";
import AddItem from "./AddItem";
import {useSortState} from "../../../hooks/useSortState";
import {deleteInArray} from "../../../redux/actions";
import MultiSelect from "react-multi-select-component";

const options = [
  {label: "Armors", value: "armors"},
  {label: "Weapons", value: "weapons"},
  {label: "Potions", value: "potions"},
  {label: "Magic Items", value: "magic"},
  {label: "Tools", value: "tools"},
  {label: "Other", value: "other"}
];

const Equipment = () => {
  const character = useSelector((state: RootState) => state.characterReducer);
  const dispatch = useDispatch();

  const [select, setSelect] = useState<{ label: string, value: string }[] | never[]>([]);

  const {showForm, handleShowForm, itemDetails, handleShowItem, ref, handleHideItem} = useCustomForm<EquipmentItem>();
  const {sortedState, setSortedState} = useSortState(character.Equipment);

  const handleDelete = () => {
    handleHideItem();
    dispatch(deleteInArray("Equipment", itemDetails!.id));
  }

  return (
    <>
      <button>Total GP: {dndMath.totalGp(character.Other.Currency)}</button>
      <button onClick={handleShowForm}>Add item</button>
      {showForm && <AddItem closeForm={handleHideItem}/>}
      <MultiSelect
        options={options}
        value={select}
        onChange={setSelect}
        labelledBy={"Select"}
        hasSelectAll={false}
        disableSearch={true}
      />
      {sortedState.map(item => (
        <div key={item.id} onClick={handleShowItem(item)}>
          <p>{item.name}</p>
          <p>{item.quantity ? item.quantity : "-"}</p>
        </div>
      ))}
      {itemDetails &&
      <div ref={ref}>
          <p>{itemDetails.name}</p>
          <p>{itemDetails.description}</p>
          <button onClick={handleDelete}>Delete</button>
      </div>
      }
    </>
  );
}

export default Equipment;