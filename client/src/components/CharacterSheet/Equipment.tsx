import React from 'react';
import AddEquipment from './AddEquipment';
import { useExpandableList } from '../../hooks/useExpandableList';

const Equipment: React.FC = () => {
  const { extItems, extVisible, showDetails, formVisiblity } = useExpandableList("Equipment");

  return (
    <div className="c-equipment">
      <button className="g-btn" onClick={formVisiblity}>+ Add Equipment</button>
      {extVisible && <AddEquipment formVisibility={formVisiblity} />}
      {extItems.map((item: any) => {
        return (
          <div key={item.id} className="c-item" onClick={showDetails(item.id)}>
            <p className="c-item__name">{item.name}</p>
            {item.active && <p>{item.description}</p>}
          </div>
        )
      })}
    </div>
  )
}

export default Equipment;
  // const initEqState = JSON.parse(JSON.stringify(character.Equipment)); //DEEP COPY
  // const initEqState = Array.from(character.Equipment);
  // const initEqState = character.Equipment.slice(0);
  // const arr3 = [].concat(arr);