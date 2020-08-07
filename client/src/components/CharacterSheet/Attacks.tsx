import React from 'react';
import AddAttack from './AddAttack';
import { useExpandableList } from '../../hooks/useExpandableList';

const Attacks: React.FC = () => {
  const { extItems, extVisible, showDetails, formVisiblity } = useExpandableList("Attacks");

  return (
    <div className="sheet--view--attacks">
      <button className="g-btn" onClick={formVisiblity}>+ Add Attack</button>
      {extVisible && <AddAttack formVisibility={formVisiblity} />}
      {extItems.map((item: any) => {
        return (
          <div key={item.id} onClick={showDetails(item.id)}>
            <p>{item.name}</p>
            <p>{item.diceType}</p>
            <p>{item.range}</p>
            {item.active && <p>{item.type}</p>}
          </div>
        )
      })}
    </div>
  )
}

export default Attacks;
