
import ListItem from './ListItem';
import { Droppable } from 'react-beautiful-dnd';

export default function List({ items }) {
  return (
    <Droppable droppableId={'list-1'}
    >
      {(provided) => (
        <ul
          ref={provided.innerRef}
          className="draggable-container"
          {...provided.droppableProps}
        >
          {items.map((item, i) => (
            <ListItem
              key={item.id}
              className='draggable'
              item={item}
              index={i}
            />
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>

  )
}
