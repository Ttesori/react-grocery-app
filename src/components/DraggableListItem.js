
import { Draggable } from 'react-beautiful-dnd';
import Button from './Button';


export default function DraggableListItem({ className, item, index, isEditable, isRemovable, handleRemove }) {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className={className}>
          <span>{item.text}</span>
          <span>
            {isEditable && <Button label="edit" className="icon" icon="fas fa-edit" handleOnClick={() => console.log('edit clicked')} />}
            {isRemovable && <Button label="remove" className="icon" icon="fas fa-times" handleOnClick={handleRemove} id={item.id} />}
            <span className="btn icon" {...provided.dragHandleProps}> <i className="fas fa-bars"></i> </span>
          </span>
        </li>
      )}
    </Draggable>

  )
}
