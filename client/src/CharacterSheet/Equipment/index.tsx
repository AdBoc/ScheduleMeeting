import React, { useState, useContext, useEffect } from 'react';
import Multiselect from 'react-multi-select-component';
import { characterContext } from '../../context/Character';
import { Types } from '../../context/Character/reducer';
import AddEquipment from './AddEquipment';
import Gold from './Gold';
import './styles.scss';
import { BackpackObj } from '../../ts/interfaces';

interface ActiveObject extends BackpackObj {
  active: boolean;
};

const Equipment: React.FC = () => {
  const { character, dispatch } = useContext(characterContext);
  const initialState = character.Equipment.slice(0).map(item => ({ ...item, active: false }));
  const [eqItems, setEqItems] = useState<ActiveObject[]>(initialState);
  const [renderForm, setRenderForm] = useState(false);
  const [rednerGold, setRenderGold] = useState(false);
  const [select, setSelect] = useState<{ label: string, value: string }[] | never[]>([]);
  const options = [
    { label: "other", value: "Other" },
    { label: "armors", value: "Armors" },
    { label: "attunement", value: "Attunement" },
    { label: "weapons", value: "Weapons" },
    { label: "potions", value: "Potions" },
    { label: "food", value: "Food" },
    { label: "rings", value: "Rings" }
  ];

  useEffect(() => {
    const initialState = character.Equipment.slice(0).map(item => ({ ...item, active: false }));
    setEqItems(initialState);
  }, [character]);

  const deleteItem = ({ target }: any) => dispatch({ type: Types.DELETE_IN_ARRAY, payload: { property: "Equipment", id: target.name } });

  const showDetails = (id: string) => () => {
    const copy = JSON.parse(JSON.stringify(eqItems));
    copy.forEach((item: any) => {
      if (item.id === id) {
        item.active = !item.active
      }
    });
    setEqItems([...copy]);
  };

  const eqItemsSort = () => {
    if (select.length !== 0) {
      const newObj = eqItems.reduce((accumulator, item) => {
        select.forEach((selected) => {
          if (item.type === selected.label)
            accumulator.push(item);
        })
        return accumulator;
      }, [] as never | ActiveObject[]);
      return newObj.sort((a, b) => a.name.localeCompare(b.name));
    }
    return eqItems.sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div className="c-equipment">
      <div className="c-eq__btns">
        <button className="c-eq__btns__btn" onClick={() => setRenderGold(prev => !prev)}>Total Gp: {character.Other.GP}</button>
        <button className="c-eq__btns__btn" onClick={() => setRenderForm(prev => !prev)}>+ Add</button>
      </div>
      {renderForm && <AddEquipment setRenderForm={setRenderForm} />}
      {rednerGold && <Gold />}
      <Multiselect className="multiselect" options={options} value={select} onChange={setSelect} labelledBy={"Select"} hasSelectAll={false} disableSearch={true} />
      <div className="c-grid">
        <div className="c-grid-table-row">
          <p className="c-grid_table-cell grid-label">NAME</p>
          <p className="c-grid_table-cell grid-label">WEIGHT</p>
          <p className="c-grid_table-cell grid-label">QTY</p>
        </div>
        {eqItemsSort().map((item) => (
          <div key={item.id}>
            <div className="c-grid-table-row" onClick={showDetails(item.id)}>
              <p className="c-grid_table-cell">{item.name}</p>
              <p className="c-grid_table-cell">{item.weight}</p>
              <p className="c-grid_table-cell">{item.quantity}</p>
            </div>
            <div>
              {item.active && <label className="c-cell-desc">Quantity<input className="c-cell-input" type="number" value={item.quantity} onChange={() => { }} onFocus={(e: any) => e.target.select()} /></label>}
              {item.active && <p className="c-cell-desc">{item.description}</p>}
              {item.active && <button className="c-cell-desc" name={item.id} onClick={deleteItem}>Delete</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Equipment;