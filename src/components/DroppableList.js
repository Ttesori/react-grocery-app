
import DraggableListItem from './DraggableListItem';
import { Droppable } from 'react-beautiful-dnd';

export default function DroppableList({ items, listId, isEditable, isRemovable, handleRemove, handleEdit }) {
  return (
    <Droppable droppableId={listId}
    >
      {(provided) => (
        <ul
          ref={provided.innerRef}
          className="draggable-container"
          {...provided.droppableProps}
        >
          {items.map((item, i) => (
            <DraggableListItem
              key={item.id}
              className='draggable'
              item={item}
              index={i}
              isEditable={isEditable}
              handleEdit={handleEdit}
              isRemovable={isRemovable}
              handleRemove={handleRemove}
            />
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>

  )
}
