import React, { useContext, useState, useEffect } from 'react';
import AddEquipment from './AddEquipment';
import { characterContext } from '../../context/character';

const Equipment: React.FC = () => {

  const { character } = useContext(characterContext);
  let initEqState = character.Equipment.slice(0).map(item => ({ ...item, active: false }));

  const [equipmentItems, setEquipmentItems] = useState<any>(initEqState); //unikne tego jesli oryginalny obiekt bedzie mial active prop
  const [equipmentForm, setEquipmentForm] = useState(false);

  useEffect(() => {
    let initEqState = character.Equipment.slice(0).map(item => ({ ...item, active: false }));
    setEquipmentItems(initEqState);
  }, [character.Equipment]);

  const showDetails = (id: string) => () => {
    const copy = JSON.parse(JSON.stringify(equipmentItems));
    copy.map((item: any) => {
      if (item.id === id) {
        item.active = !item.active
      }
    });
    setEquipmentItems([...copy]);
  };

  return (
    <div className="c-equipment">
      <button className="g-btn" onClick={() => setEquipmentForm(prev => !prev)}>+ Add Equipment</button>
      {equipmentForm && <AddEquipment />}
      {equipmentItems.map((item: any) => {
        if (item.active) {
          return (
            <div key={item.id} className="c-item" onClick={showDetails(item.id)}>
              <p className="c-item__name">{item.name}</p>
              <p>{item.description}</p>
            </div>
          )
        } else {
          return (
            <div key={item.id} className="c-item" onClick={showDetails(item.id)}>
              <p className="c-item__name">{item.name}</p>
            </div>
          )
        }
      })}
    </div>
  )
}

export default Equipment;


  // const initEqState = JSON.parse(JSON.stringify(character.Equipment)); //DEEP COPY
  // const initEqState = Array.from(character.Equipment);
  // const initEqState = character.Equipment.slice(0);
  // const arr3 = [].concat(arr);