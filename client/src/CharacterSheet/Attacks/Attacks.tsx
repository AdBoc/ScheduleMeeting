import React from 'react';
import AddAttack from './AddAttack/AddAttack';
import { useExpandableList } from '../../hooks/UseExpandableList';

const Attacks: React.FC = () => {
  const { extItems, extVisible, showDetails, formVisiblity } = useExpandableList("Attacks");

  return (
    <div className="sheet--view--attacks">
      <button className="g-btn" onClick={formVisiblity}>+ Add Attack</button>
      {extVisible && <AddAttack formVisibility={formVisiblity} />}
      {extItems.map((item: any) => {
        return (
          <div key={item.id} onClick={showDetails(item.id)}>
            <div className="c-atk">
              <p className="c-atk__field">{item.name}</p>
              <p className="c-atk__field">{item.diceType}</p>
              <p className="c-atk__field">{item.range}</p>
            </div>
            {item.active && (
              <>
                <p className="c-atk__drop">Name: {item.name}</p>
                <p className="c-atk__drop">Dice: {item.diceType}</p>
                <p className="c-atk__drop">HitDc: {item.hitDc}</p>
                <p className="c-atk__drop">Range: {item.range}</p>
                <p className="c-atk__drop">Type: {item.type}</p>
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Attacks;
