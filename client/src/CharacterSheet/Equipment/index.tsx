import React, { useState, useContext, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { characterContext } from '../../context/Character';
import { Types } from '../../context/Character/reducer';
import AddEquipment from './AddEquipment';
import Gold from './Gold';
import './styles.scss';

const Equipment: React.FC = () => {
  const { character, dispatch } = useContext(characterContext);
  const initialState = character.Equipment.slice(0).map(item => ({ ...item, active: false }));
  const [eqItems, setEqItems] = useState(initialState);
  const [renderForm, setRenderForm] = useState(false);
  const [rednerGold, setRenderGold] = useState(false);

  useEffect(() => {
    const initialState = character.Equipment.slice(0).map(item => ({ ...item, active: false }));
    setEqItems(initialState);
  }, [character]);

  const deleteItem = ({ target }: any) => dispatch({ type: Types.DELETE_IN_ARRAY, payload: { property: "Equipment", id: target.name } });

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    if (
      result.source.droppableId === result.destination.droppableId &&
      result.source.index === result.destination.index
    ) return;
    const newArr = Array.from(character.Equipment);
    const [removed] = newArr.splice(result.source.index, 1);
    newArr.splice(result.destination.index, 0, removed);
    dispatch({ type: Types.REORDER_ARRAY, payload: { property: "Equipment", newArr } });
  };

  const showDetails = (id: string) => () => {
    const copy = JSON.parse(JSON.stringify(eqItems));
    copy.forEach((item: any) => {
      if (item.id === id) {
        item.active = !item.active
      }
    });
    setEqItems([...copy]);
  };

  return (
    <div className="c-equipment">
      <div className="c-eq__btns">
        <button className="c-eq__btns__btn" onClick={() => setRenderGold(prev => !prev)}>Total Gp: {character.Other.GP}</button>
        <button className="c-eq__btns__btn" onClick={() => setRenderForm(prev => !prev)}>+ Add</button>
      </div>
      {renderForm && <AddEquipment setRenderForm={setRenderForm} />}
      {rednerGold && <Gold />}
      {/* <div className="c-eqq"> */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {eqItems.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <div className={snapshot.isDragging ? "c-item dragged" : "c-item"}>
                        <p className="c-item__field">{item.name}</p>
                        <button onClick={showDetails(item.id)}>S</button>
                        <button name={item.id} onClick={deleteItem}>D</button>
                      </div>
                      <div>
                        {item.active && <p className="c-item__drop">{item.description}</p>}
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
      {/* </div> */}
    </div>
  )
}

export default Equipment;