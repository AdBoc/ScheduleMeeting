import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/reducers";
import {getEqItemById, selectSortedEquipment} from "../../../redux/selectors";
import CustomPopup from "../../../components/CustomPopup/CustomPopup";
import {changeEqQuantity, deleteItem} from "../../../redux/actions";
import styles from "./equipment.module.scss";

type Props = {
  sortingCriteria: { label: string, value: string }[] | never[];
}

const EquipmentItems: React.FC<Props> = ({sortingCriteria}) => {
  const [currentItemId, setCurrentItemId] = useState<false | string>(false);
  const items = useSelector((state: RootState) => selectSortedEquipment(state, sortingCriteria));
  const selectedItem = useSelector((state: RootState) => getEqItemById(state, currentItemId));
  const dispatch = useDispatch();

  if (!items.length) return <p className={styles.emptyList}>List is currently Empty</p>;

  return (
    <>
      {items.map(item => (
        <div key={item.id} className={styles.items} onClick={() => setCurrentItemId(item.id)}>
          <p>{item.name}</p>
          <p className={styles.itemQuantity}>{item.quantity ? item.quantity : "-"}</p>
        </div>
      ))
      }
      {selectedItem &&
      <CustomPopup hideElement={setCurrentItemId}>
          <div className={styles.itemDetails}>
              <p className={styles.detailsLabel}>{selectedItem.name}</p>
              <label className={styles.detailsLabel}>Quantity:
                {selectedItem.quantity ? <input className={styles.detailsInput} value={selectedItem.quantity}
                                                onChange={({target}: any) => dispatch(changeEqQuantity(selectedItem.id, parseInt(target.value)))}
                                                onFocus={(e: any) => e.target.select()}/> : <p className={styles.detailsLabel}>-</p>}
              </label>
            {selectedItem.description && <p className={styles.detailsLabel}>{selectedItem.description}</p>}
              <button className={styles.detailsDelete} onClick={() => dispatch(deleteItem(selectedItem.id))}>Delete</button>
          </div>
      </CustomPopup>
      }
    </>
  );
}

export default EquipmentItems; //React.memo can be used here but is it really worth it?