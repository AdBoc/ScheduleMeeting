import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers";
import {dndMath} from "../../../utils/dndMath";
import {useCustomForm} from "../../../hooks/useCustomForm";
import {EquipmentItem} from "../../../redux/types";
import AddItem from "./AddItem";
import MultiSelect from "react-multi-select-component";
import {filteredEquipment} from "../../../redux/selectors";
import styles from "./equipment.module.scss";
import CustomPopup from "../../../components/CustomPopup/CustomPopup";
import Gold from "./Gold";
import EquipmentItems from "./EquipmentItems";

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
  const [isGold, setIsGold] = useState(false);

  const currency = useSelector((state: RootState) => state.other.currency); //TODO: IMPROVE UNNECESSARY RERENDERS

  const {showForm, itemDetails, setShowForm, handleHideItem, handleShowItem, setItemDetails} = useCustomForm<EquipmentItem>();

  const handleDelete = () => {
    // if (!!itemDetails) dispatch(deleteInArray("Equipment", itemDetails.id));
    handleHideItem();
  }

  return (
    <>
      <div className={styles.buttons}>
        <button className={styles.basicButton} onClick={() => {setIsGold(prev => !prev)}}>Total GP: {dndMath.totalGp(currency)}</button>
        <button className={styles.basicButton} onClick={() => {setShowForm(prev => !prev)}}>Add item</button>
      </div>
      {showForm && <CustomPopup hideElement={setShowForm}><AddItem closeForm={setShowForm}/></CustomPopup>}
      {isGold && <CustomPopup hideElement={setIsGold}><Gold/></CustomPopup>}
      <MultiSelect
        className={styles.multiselect}
        options={options}
        value={select}
        onChange={setSelect}
        labelledBy={"Select"}
        hasSelectAll={false}
        disableSearch={true}
      />
      <EquipmentItems sortingCriteria={select} handleShowItem={handleShowItem}/>
      {itemDetails &&
      <CustomPopup hideElement={setItemDetails}>
          <div className={styles.itemDetails}>
              <p className={styles.detailsLabel}>{itemDetails.name}</p>
              <p className={styles.detailsLabel}>{itemDetails.description}</p>
              <p className={styles.detailsLabel}>{itemDetails.quantity ? itemDetails.quantity : "-"}</p>
              <button className={styles.detailsDelete} onClick={handleDelete}>Delete</button>
          </div>
      </CustomPopup>
      }
    </>
  );
}

export default Equipment;