
import { Draggable } from 'react-beautiful-dnd';
import Button from './Button';


export default function DraggableListItem({ className, item, index }) {

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className={className}>
          <span>{item.text}</span>
          <span>
            <Button label="edit" className="icon" icon="fas fa-edit" handleOnClick={() => console.log('edit clicked')} />
            <Button label="remove" className="icon" icon="fas fa-times" handleOnClick={() => console.log('remove clicked')} />
            <span className="btn icon" {...provided.dragHandleProps}> <i className="fas fa-bars"></i> </span>
          </span>
        </li>
      )}
    </Draggable>

  )
}
