import React, { useContext, useState } from 'react';
import AddEquipment from './AddEquipment';
import { characterContext } from '../../context/character';

const Equipment: React.FC = () => {

  const [equipmentForm, setEquipmentForm] = useState(false);
  const { character } = useContext(characterContext);

  return (
    <div className="c-equipment">
      <button className="g-btn" onClick={() => setEquipmentForm(prev => !prev)}>+ Add Equipment</button>
      {equipmentForm && <AddEquipment />}
      {character.Equipment.map((item, index) => {
        return (
          <div key={index} className="c-item">
            <p className="c-item__name">{item.name}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Equipment;
