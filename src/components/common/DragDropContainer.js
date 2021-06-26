import { DragDropContext } from 'react-beautiful-dnd';
import DroppableList from './DroppableList';
import './css/DragDropContainer.css';

export default function DragDropContainer({ items, itemsOrder, onDragEnd, listId, isEditable, isRemovable, handleRemove, handleEdit }) {
  const handleOnDragEnd = (result) => {
    const { destination, source } = result;

    // Dropped outside of frame
    if (!destination) return;
    // Dropped in same pos
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    // get copy of order
    const newOrder = [...itemsOrder];
    // Remove moved item
    const oldItem = newOrder.splice(source.index, 1);
    // Add item back in new position
    newOrder.splice(destination.index, 0, ...oldItem);

    // Create empty array to hold new items
    let newItems = [];
    // Populate items with new order
    newOrder.forEach(id => {
      newItems.push(items.find(item => item.id === id));
    });
    // Update items state
    onDragEnd(newItems, newOrder)
  }


  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <DroppableList items={items} itemsOrder={itemsOrder} listId={listId} isEditable={isEditable} handleEdit={handleEdit} isRemovable={isRemovable} handleRemove={handleRemove} />
    </DragDropContext>
  )
}
