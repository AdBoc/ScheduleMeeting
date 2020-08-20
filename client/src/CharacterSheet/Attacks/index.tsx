import React, { useState, useContext, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { characterContext } from '../../context/Character';
import { Types } from '../../context/Character/reducer';
import AddAttack from './AddAttack';
import './styles.scss';

const Attacks: React.FC = () => {
  const { character, dispatch } = useContext(characterContext);
  const [renderForm, setRenderForm] = useState(false);
  const initialState = character.Attacks.slice(0).map(item => ({ ...item, active: false }));
  const [attacks, setAttacks] = useState(initialState);

  useEffect(() => {
    const initialState = character.Attacks.slice(0).map(item => ({ ...item, active: false }));
    setAttacks(initialState);
  }, [character]);

  const deleteItem = ({ target }: any) => dispatch({ type: Types.DELETE_IN_ARRAY, payload: { property: "Attacks", id: target.name } });

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    if (
      result.source.droppableId === result.destination.droppableId &&
      result.source.index === result.destination.index
    ) return;
    const newArr = Array.from(character.Attacks);
    const [removed] = newArr.splice(result.source.index, 1);
    newArr.splice(result.destination.index, 0, removed);
    dispatch({ type: Types.REORDER_ARRAY, payload: { property: "Attacks", newArr } });
  };

  const showDetails = (id: string) => () => {
    const copy = JSON.parse(JSON.stringify(attacks));
    copy.forEach((item: any) => {
      if (item.id === id) {
        item.active = !item.active
      }
    });
    setAttacks([...copy]);
  };

  return (
    <>
      <div className="c-atk__btns">
        <button className="c-atk__btns__btn">Attacks</button>
        <button className="c-atk__btns__btn" onClick={() => setRenderForm(prev => !prev)}>+ Add</button>
      </div>
      {renderForm && <AddAttack setRenderForm={setRenderForm} />}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {attacks.map((attack, index) => (
                <Draggable key={attack.id} draggableId={attack.id} index={index}>
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <div className={snapshot.isDragging ? "c-atk dragged" : `c-atk ${attack.type}`}>
                        <p className="c-atk__field">{attack.name}</p>
                        <p>{attack.baseDmg} + {attack.diceType} + {attack.abilityMod}</p>
                        <button onClick={showDetails(attack.id)}>S</button>
                        <button name={attack.id} onClick={deleteItem}>D</button>
                      </div>
                      <div>
                        {attack.active && (
                          <>
                            <p className="c-atk__drop">Name: {attack.name}</p>
                            <p className="c-atk__drop">Ability Mod: {attack.abilityMod}</p>
                            <p className="c-atk__drop">Dice: {attack.diceType}</p>
                            <p className="c-atk__drop">Base Dmg: {attack.baseDmg}</p>
                            <p className="c-atk__drop">Range: {attack.range}</p>
                            <p className="c-atk__drop">Type: {attack.type}</p>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}

export default Attacks;
