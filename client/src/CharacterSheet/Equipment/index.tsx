import React from 'react';
import AddEquipment from './AddEquipment';
import { useExpandableList } from '../../hooks/useExpandableList';
import { BackpackObj } from '../../ts/interfaces';

interface BackpackObjActive extends BackpackObj {
  active: boolean;
}

const Equipment: React.FC = () => {
  const { extItems, extVisible, showDetails, formVisiblity, deleteItem } = useExpandableList("Equipment");

  return (
    <div className="c-equipment">
      <button className="g-btn" onClick={formVisiblity}>+ Add Equipment</button>
      {extVisible && <AddEquipment formVisibility={formVisiblity} />}
      <div className="c-list-scroll">
        {extItems.map((item: BackpackObjActive) => {
          return (
            <div key={item.id}>
              <div className="c-item">
                <p className="c-item__field">{item.name}</p>
                <p className="i-expand" onClick={showDetails(item.id)} />
                <button className="i-trash" name={item.id} onClick={deleteItem} />
              </div>
              {item.active && <p className="c-item__drop">{item.description}</p>}
            </div>
          )
        })}
      </div>
    </div>
  )
};

export default Equipment;

  // const initEqState = JSON.parse(JSON.stringify(character.Equipment)); //DEEP COPY
  // const initEqState = Array.from(character.Equipment);
  // const initEqState = character.Equipment.slice(0);
  // const arr3 = [].concat(arr);