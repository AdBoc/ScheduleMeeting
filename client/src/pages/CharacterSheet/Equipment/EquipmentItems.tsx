import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers";
import styles from "./equipment.module.scss";
import {EquipmentItem} from "../../../redux/types";
import {selectSortedEquipment} from "../../../redux/selectors";

type Props = {
  sortingCriteria: { label: string, value: string }[] | never[];
  handleShowItem: <Object extends EquipmentItem>(details: Object) => () => void;
}

const EquipmentItems: React.FC<Props> = ({handleShowItem, sortingCriteria}) => {
  const items = useSelector((state: RootState) => selectSortedEquipment(state, sortingCriteria));

  if (!items.length) return <p className={styles.emptyList}>List is currently Empty</p>;

  return (
    <>
      {items.map(item => (
        <div key={item.id} className={styles.items} onClick={handleShowItem(item)}>
          <p>{item.name}</p>
          <p className={styles.itemQuantity}>{item.quantity ? item.quantity : "-"}</p>
        </div>
      ))
      }
    </>
  );
}

export default EquipmentItems;