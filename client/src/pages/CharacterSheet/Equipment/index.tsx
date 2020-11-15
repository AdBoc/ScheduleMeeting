import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {useCustomForm} from "../../../hooks/useCustomForm";
import {EquipmentItem} from "../../../redux/types";
import AddItem from "./AddItem";
import MultiSelect from "react-multi-select-component";
import styles from "./equipment.module.scss";
import CustomPopup from "../../../components/CustomPopup/CustomPopup";
import Gold from "./Gold";
import EquipmentItems from "./EquipmentItems";
import {selectConvertedGoldValue} from "../../../redux/selectors";

const options = [
  {label: "Armors", value: "armors"},
  {label: "Weapons", value: "weapons"},
  {label: "Potions", value: "potions"},
  {label: "Magic Items", value: "magic"},
  {label: "Tools", value: "tools"},
  {label: "Other", value: "other"}
];

const Equipment = () => {
  const totalGold = useSelector(selectConvertedGoldValue);
  const [select, setSelect] = useState<{ label: string, value: string }[] | never[]>([]);
  const [isGold, setIsGold] = useState(false);

  const {showForm, setShowForm} = useCustomForm<EquipmentItem>();

  return (
    <>
      <div className={styles.buttons}>
        <button className={styles.basicButton} onClick={() => {
          setIsGold(prev => !prev)
        }}>Total GP: {totalGold}</button>
        <button className={styles.basicButton} onClick={() => {
          setShowForm(prev => !prev)
        }}>Add item
        </button>
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
      <EquipmentItems
        sortingCriteria={select}
      />
    </>
  );
}

export default Equipment;