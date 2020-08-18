import React, { useState, useContext, useEffect } from 'react';
import AddEquipment from './AddEquipment';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { characterContext } from '../../context/Character';
import { Types } from '../../context/Character/reducer';

const Equipment: React.FC = () => {
  const { character, dispatch } = useContext(characterContext);
  const [renderForm, setRenderForm] = useState(false);
  const initialState = character.Equipment.slice(0).map(item => ({ ...item, active: false }));
  const [eqItems, setEqItems] = useState(initialState);

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
      <button className="g-btn" onClick={() => setRenderForm(prev => !prev)}>+ Add Equipment</button>
      {renderForm && <AddEquipment setRenderForm={setRenderForm} />}
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
    </div>
  )
}

export default Equipment;