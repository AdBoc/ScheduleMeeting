import React, { useContext, useState } from 'react';
import AddEquipment from './AddEquipment';
import { characterContext } from '../../context/character';

const Equipment: React.FC = () => {

  const [equipmentForm, setEquipmentForm] = useState(false);
  const { character } = useContext(characterContext);

  return (
    <div className="sheet--view--equipment">
      <p className="sheet--view--equipment--title">Equipment</p>
      <button onClick={() => setEquipmentForm(prev => !prev)}>+ Add Equipment</button>
      {equipmentForm && <AddEquipment />}
      {character.Equipment.map((item, index) => {
        return (
          <div key={index}>
            <p>{item.name}</p>
            <p>{item.description}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Equipment;