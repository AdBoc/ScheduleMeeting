import React, { useState, useContext } from 'react';
import AddEquipment from './AddEquipment';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { characterContext } from '../../context/Character';
import { Types } from '../../context/Character/reducer';

const Equipment: React.FC = () => {
  const [renderForm, setRenderForm] = useState(false);
  const { character, dispatch } = useContext(characterContext);

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
    dispatch({ type: Types.REORDER_ARRAY, payload: { newArr } });
  };

  return (
    <div className="c-equipment">
      <button className="g-btn" onClick={() => setRenderForm(prev => !prev)}>+ Add Equipment</button>
      {renderForm && <AddEquipment setRenderForm={setRenderForm} />}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {character.Equipment.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div className={snapshot.isDragging ? "c-item dragged" : "c-item"} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <p className="c-item__field">{item.name}</p>
                      <button>S</button>
                      <button name={item.id} onClick={deleteItem}>D</button>
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