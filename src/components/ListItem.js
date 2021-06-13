
import { Draggable } from 'react-beautiful-dnd';


export default function ListItem({ className, item, index }) {

  return (
    <Draggable draggableId={item.id + ''} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={className}>
          {item.text}
        </li>
      )}
    </Draggable>

  )
}
