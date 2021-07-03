import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Alert from '../common/Alert';
import InputText from "../form/InputText";
import SelectList from "../form/SelectList";
import ListSection from "./ListSection";
import Button from "../common/Button";
import Modal from '../common/Modal';
import EmptyList from '../common/EmptyList';

export default function EditList({ handleUpdateList, list, stores }) {
  const [name, updateName] = useState(list.name);
  const [items, updateItems] = useState(list.items);
  const [store, updateStore] = useState(stores.find(store => list.store_id === store.id));
  const [modalIsOpen, updateModalIsOpen] = useState(false);
  const [storeMap, updateStoreMap] = useState([]);
  const [modalAlerts, updateModalAlerts] = useState()
  const DEFAULT_ITEM = {
    text: '',
    quantity: 1,
    section_id: store?.sections[0]?.id,
    section_name: store?.sections[0]?.text,
  };
  const [newListItem, updateNewListItem] = useState(DEFAULT_ITEM);
  const allStoresMap = stores.map(store => {
    return {
      value: store.id,
      text: store.name
    }
  });
  const history = useHistory();

  const handleNameChange = (text) => {
    updateName(text);
  }
  const handleStoreChange = (e) => {
    const newStore = stores.find(store => store.id === e.target.value);
    // Update new list item
    updateNewListItem({
      text: '',
      quantity: 1,
      section_id: newStore?.sections[0]?.id,
      section_name: newStore?.sections[0]?.text,
    })
    updateStore(newStore);
  }
  const handleSectionChange = (e) => {
    const section = storeMap.find(section => section.value === e.target.value);
    updateNewListItem({ ...newListItem, section_id: section.value, section_name: section.text })
  }
  const handleNewItemChange = (text) => {
    updateNewListItem({ ...newListItem, text: text });
  }

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newListItem.text.length === 0) return false;
    const newItems = [...items, {
      id: `item-${Math.ceil(Math.random() * 99999999)}`,
      text: newListItem.text,
      quantity: newListItem.quantity,
      section_id: newListItem.section_id,
      section_name: newListItem.section_name,
      original_section: '',
      checked: false
    }];

    updateNewListItem({
      text: '',
      quantity: 1,
      section_id: newListItem.section_id,
      section_name: newListItem.section_name
    });
    updateItems(sortItems(newItems));
    updateModalAlerts({ type: 'success', msg: 'Item added successfully!' });
    setTimeout(() => {
      updateModalAlerts(null);
    }, 3000);
  }
  const handleSaveList = (e) => {
    e.preventDefault();
    if (items.length === 0) return false;
    const newList = {
      name: name || 'New List',
      store_id: store.id,
      items: items
    }
    handleUpdateList(list.id, newList);
    history.push('/dashboard');
  }
  const handleRemove = (e, id) => {
    e.preventDefault();
    let el = e.target.parentElement.parentElement;
    el.classList.add('animate-fade');
    setTimeout(() => {
      const keep = items.filter(item => item.id !== id);
      updateItems([...keep]);
    }, 300);

  }
  const handleEditListItem = (e, id) => {
    const toEdit = items.find(item => item.id === id);
    toEdit.text = e.target.textContent;
    const keep = items.filter(item => item.id !== id);
    updateItems(sortItems([...keep, toEdit]));
  }

  const handleEditListItemQuantity = (id, newQuantity) => {
    const toEdit = items.find(item => item.id === id);
    toEdit.quantity = newQuantity;
    const keep = items.filter(item => item.id !== id);
    updateItems(sortItems([...keep, toEdit]));
  }

  const sortItems = (newItems) => {
    const sortedItems = [...newItems]
    sortedItems.sort(function (a, b) {
      if (a.text < b.text) { return -1; }
      if (a.text > b.text) { return 1; }
      return 0;
    });
    return sortedItems;
  }

  const getNewSection = (item, newSection, originalSection) => {
    return {
      id: item.id,
      text: item.text,
      quantity: item.quantity,
      section_id: newSection.value,
      section_name: newSection.text,
      original_section: originalSection ? originalSection : '',
      checked: item.checked
    }
  }

  const reorderItems = (newStoreMap) => {
    if (items.length === 0) return;
    // make copy of current items
    const remapItems = [...items];
    // loop through items for each new store section
    const newItems = remapItems.map(item => {
      // if it has an original section, check for that first
      // Check for original section if present
      if (item.original_section) {
        let originalSection = newStoreMap.find(section => section.text.toLowerCase().includes(item.original_section.toLowerCase()));
        if (originalSection) {
          return getNewSection(item, originalSection);
        }
      }

      // otherwise, continue with remapping
      let newSection = newStoreMap.find(section => section.text.toLowerCase().includes(item.section_name.toLowerCase()));
      if (newSection) {
        return getNewSection(item, newSection);
      }

      // Else add item to other section
      const otherSection = newStoreMap.find(section => section.text.toLowerCase().includes('other'));
      return getNewSection(item, otherSection, item.section_name)
    });
    updateItems(newItems)
  }

  useEffect(() => {
    const newStoreMap = store?.sections?.map(section => {
      return {
        value: section.id,
        text: section.text
      }
    });
    let otherSection = newStoreMap.find(section => section.text.toLowerCase().includes('other'));
    if (!otherSection) {
      otherSection = {
        value: 'section-xxxxx',
        text: 'Other'
      }
      newStoreMap.push(otherSection);
    }
    updateStoreMap(newStoreMap);
    reorderItems(newStoreMap);
  }, [store]);
  return (
    <>
      <form>
        <InputText label="List Name" id="list-name" placeholder="Enter List Name..." handleChange={handleNameChange} value={name} isValid={true} className="p-2 bg-neutral-light rounded mb-2" focused={true} />

        <SelectList className="p-2 bg-neutral-light rounded" items={allStoresMap} onChange={handleStoreChange} value={store.id} name="store-sections" label="Store" />
        <h3 className="mt-3">List Items</h3>
        {items && store.sections.map(section => (
          <ListSection section={section} sectionItems={items.filter(item => item.section_id === section.id)} handleRemove={handleRemove} handleEditListItem={handleEditListItem} handleEditListItemQuantity={handleEditListItemQuantity} key={section.id}></ListSection>
        ))}
        {items.length === 0 &&
          <EmptyList>Once you add list items, they'll appear here.</EmptyList>
        }
        <Button icon="fas fa-plus" className="btn-outline mt-2 mb-3 w-full" handleOnClick={() => {
          updateModalIsOpen(true);

        }}>Add New Items</Button>

        <Button handleOnClick={handleSaveList} className="btn-block" icon="fas fa-download">Save List</Button>
        <Button className="w-full btn-link text-sm error" icon="fas fa-times" handleOnClick={() => history.push('/dashboard')}> Cancel</Button>
      </form>

      <Modal isOpen={modalIsOpen} handleClose={() => { updateModalIsOpen(false) }}>

        <h4>Add Items to Your List</h4>
        {modalAlerts &&
          <Alert type={modalAlerts.type} message={modalAlerts.msg} />
        }
        {modalIsOpen &&
          <form onSubmit={handleAddItem} autoFocus>
            <InputText placeholder="Enter item name" label="Item Name" value={newListItem.text} handleChange={handleNewItemChange} isValid={true} id="item-name" focused={true} />
            <SelectList label="Item Section" items={storeMap} onChange={handleSectionChange} value={newListItem.section_id} id="store-sections-item" />
            <Button icon="fas fa-plus" className="btn-block" handleOnClick={handleAddItem}>Add Item</Button>
          </form>}
        <Button className="w-full btn-link text-sm error" icon="fas fa-times" handleOnClick={() => updateModalIsOpen(false)}> {items.length > 0 ? 'Done Adding Items' : 'Close'}</Button>


      </Modal>
    </>
  )
}
