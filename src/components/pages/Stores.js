import { useState } from 'react';
import DragDropContainer from '../DragDropContainer';
import Modal from '../common/Modal';
import AddStore from '../stores/AddStore';

export default function Stores({ items, itemsOrder, handleOnDragEnd }) {
  const [modalisOpen, setModalisOpen] = useState(false);
  const modalContent = (
    <Modal handleClose={() => setModalisOpen(false)} isOpen={modalisOpen}>
    </Modal>
  );

  return (
    <>
      <h2>Manage Stores</h2>
      <DragDropContainer items={items} itemsOrder={itemsOrder} onDragEnd={handleOnDragEnd} listId='list-1' />

      <AddStore />
    </>
  )
}
