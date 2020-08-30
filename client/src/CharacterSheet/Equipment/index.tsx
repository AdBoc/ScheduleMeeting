import React, { useState, useContext } from 'react';
import Multiselect from 'react-multi-select-component';
import { characterContext } from '../../context/Character';
import { Types } from '../../context/Character/reducer';
import { BackpackObj } from '../../ts/interfaces';
import { charMethods } from '../../Services/CharacterMethods';
import AddEquipment from './AddEquipment';
import Gold from './Gold';
import './styles.scss';


const Equipment: React.FC = () => {
  const { character, dispatch } = useContext(characterContext);
  const [renderForm, setRenderForm] = useState(false);
  const [rednerGold, setRenderGold] = useState(false);
  const [select, setSelect] = useState<{ label: string, value: string }[] | never[]>([]);
  const [details, setDetails] = useState<null | BackpackObj>(null);
  const options = [
    { label: "other", value: "Other" },
    { label: "armors", value: "Armors" },
    { label: "attunement", value: "Attunement" },
    { label: "weapons", value: "Weapons" },
    { label: "potions", value: "Potions" },
    { label: "food", value: "Food" },
    { label: "rings", value: "Rings" }
  ];

  const deleteItem = () => {
    dispatch({ type: Types.DELETE_IN_ARRAY, payload: { property: "Equipment", id: details!.id } });
    setDetails(null);
  };

  const showDetails = (item: BackpackObj) => () => {
    if (details)
      return setDetails(null);
    setDetails(item);
  };

  const eqItemsSort = () => {
    if (select.length !== 0) {
      const newObj = character.Equipment.reduce((accumulator, item) => {
        select.forEach((selected) => {
          if (item.type === selected.label)
            accumulator.push(item);
        })
        return accumulator;
      }, [] as never | BackpackObj[]);
      return newObj.sort((a, b) => a.name.localeCompare(b.name));
    }
    return character.Equipment.sort((a, b) => a.name.localeCompare(b.name));
  }

  const handleQuantity = ({ target }: any) => {
    if (!target.value) return;
    dispatch({ type: Types.SET_ITEM_QTY, payload: { id: target.name, newValue: target.value } });
  };

  return (
    <div className="c-equipment">
      <div className="c-eq__btns">
        <button className="c-eq__btns__btn" onClick={() => setRenderGold(prev => !prev)}>Total Gp: {charMethods.countTotalGP(character.Other.Currency)}</button>
        <button className="c-eq__btns__btn" onClick={() => setRenderForm(prev => !prev)}>+ Add</button>
      </div>
      {renderForm && <AddEquipment setRenderForm={setRenderForm} />}
      {rednerGold && <Gold />}
      <Multiselect className="multiselect" options={options} value={select} onChange={setSelect} labelledBy={"Select"} hasSelectAll={false} disableSearch={true} />
      <div className="c-grid">
        <div className="c-grid-table-row">
          <p className="c-grid_table-cell grid-label">NAME</p>
          <p className="c-grid_table-cell grid-label">QTY</p>
        </div>
        {eqItemsSort().map(item => (
          <div key={item.id} className="c-grid-table-row" onClick={showDetails(item)}>
            <p className="c-grid_table-cell">{item.name}</p>
            <p className="c-grid_table-cell">{item.quantity ? item.quantity : "-"}</p>
          </div>
        ))}
        {details && (
          <div className="details">
            <p className="details__desc">{details.description}</p>
            {details.quantity && <input className="details__text" type="number" name={details.id} value={details.quantity} onChange={handleQuantity} onFocus={(e: any) => e.target.select()} />}
            <button className="details__text" onClick={deleteItem}>DELETE</button>
          </div>
        )}
      </div>
    </div >
  )
}

export default Equipment;
