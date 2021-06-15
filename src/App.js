import { useState } from 'react';

import './App.css';
import DragDropContainer from './components/DragDropContainer';
import data from './data';
import data2 from './data2';

function App() {
  const [items, updateItems] = useState(data);
  const [itemsOrder, updateItemsOrder] = useState(data.map(item => item.id));

  const [items2, updateItems2] = useState(data2);
  const [items2Order, updateItems2Order] = useState(data2.map(item => item.id));

  const handleList1OnDragEnd = (newItems, newItemsOrder) => {
    updateItems(newItems);
    updateItemsOrder(newItemsOrder);
  }

  const handleList2OnDragEnd = (newItems, newItemsOrder) => {
    updateItems2(newItems);
    updateItems2Order(newItemsOrder);
  }

  return (
    <>
      <h1>Hello World</h1>
      <DragDropContainer items={items} itemsOrder={itemsOrder} onDragEnd={handleList1OnDragEnd} listId='list-1' />
      <DragDropContainer items={items2} itemsOrder={items2Order} onDragEnd={handleList2OnDragEnd} listId='list-2' />
    </>
  );
}

export default App;
