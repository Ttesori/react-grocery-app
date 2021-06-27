
import { Draggable } from 'react-beautiful-dnd';
import Button from './Button';


export default function DraggableListItem({ className, item, index, isEditable, isRemovable, handleRemove, handleEdit }) {
  const handleLocalEdit = (e) => {
    handleEdit(e, item, e.target.textContent)
  }
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className={className}>
          <span contentEditable={isEditable} onBlur={handleLocalEdit} suppressContentEditableWarning={true} className='edit-text'>{item.text}</span>
          <span>
            {isRemovable && <Button label="remove" className="icon p-0 mr-1" icon="fas fa-times" handleOnClick={handleRemove} id={item.id} />}
            <span className="btn icon p-0" {...provided.dragHandleProps}> <i className="fas fa-bars"></i> </span>
          </span>
        </li>
      )}
    </Draggable>

  )
}
