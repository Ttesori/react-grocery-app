import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import './App.css';
import List from './components/List';
import data from './data';

function App() {
  const [items, updateItems] = useState(data);
  const [itemsOrder, updateItemsOrder] = useState(['1', '2', '3', '4']);

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
    // Update state w new order
    updateItemsOrder(newOrder);

    // Create empty array to hold new items
    let newItems = [];
    // Populate items with new order
    newOrder.forEach(taskId => {
      newItems.push(items.find(item => item.id === taskId));
    });
    // Update items state
    updateItems(newItems);
  }

  return (
    <>
      <h1>Hello World</h1>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <List items={items} itemsOrder={itemsOrder} />
      </DragDropContext>
    </>
  );
}

export default App;
