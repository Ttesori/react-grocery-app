import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import InputText from "../form/InputText";
import SelectList from "../form/SelectList";
import ListSection from "./ListSection";
import Button from "../common/Button";

export default function EditList({ handleUpdateList, list, stores }) {
  const [name, updateName] = useState(list.name);
  const [items, updateItems] = useState(list.items);
  const [store, updateStore] = useState(stores.find(store => list.store_id === store.id));
  const [storeMap, updateStoreMap] = useState([]);
  const [newListItem, updateNewListItem] = useState({
    text: '',
    quantity: 1,
    section_id: store?.sections[0]?.id,
    section_name: store?.sections[0]?.text,
  });
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
    const newItems = [...items, {
      id: `item-${Math.ceil(Math.random() * 9999999)}`,
      text: newListItem.text,
      quantity: newListItem.quantity,
      section_id: newListItem.section_id,
      section_name: newListItem.section_name
    }];
    updateNewListItem({
      text: '',
      quantity: 1,
      section_id: newListItem.section_id,
      section_name: newListItem.section_name
    });
    updateItems(sortItems(newItems));
  }
  const handleSaveList = (e) => {
    e.preventDefault();
    const newList = {
      name: name || 'New List',
      store_id: store.id,
      items: items
    }
    handleUpdateList(list.id, newList);
    history.push('/lists');
  }
  const handleRemove = (e, id) => {
    e.preventDefault();
    const keep = items.filter(item => item.id !== id);
    updateItems([...keep]);
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

  const reorderItems = (newStoreMap) => {
    if (items.length === 0) return;
    // make copy of current items
    const remapItems = [...items];
    // loop through items for each new store section
    const newItems = remapItems.map(item => {
      const newSection = newStoreMap.find(section => item.section_name === section.text);
      const otherSection = newStoreMap.find(section => section.text === 'Other');
      if (newSection) {
        return {
          id: item.id,
          text: item.text,
          quantity: item.quantity,
          section_id: newSection.value,
          section_name: newSection.text
        }
      }
      return {
        id: item.id,
        text: item.text,
        quantity: item.quantity,
        section_id: otherSection.value,
        section_name: otherSection.text
      }
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
    const otherSection = newStoreMap.find(section => section.text.toLowerCase() === 'other');
    if (!otherSection) {
      newStoreMap.push({
        value: `section-xxxxx`,
        text: 'Other'
      })
    }
    updateStoreMap(newStoreMap);
    reorderItems(newStoreMap)
  }, [store]);
  return (
    <div>
      <form>
        <InputText label="List Name:" id="" placeholder="Enter List Name..." handleChange={handleNameChange} value={name} isValid={true} />
        <SelectList items={allStoresMap} onChange={handleStoreChange} value={store.id} name="store-sections" label="Store: " />
        {items && store.sections.map(section => (
          <ListSection section={section} sectionItems={items.filter(item => item.section_id === section.id)} handleRemove={handleRemove} handleEditListItem={handleEditListItem} handleEditListItemQuantity={handleEditListItemQuantity} key={section.id}></ListSection>
        ))}

        <div className="flex flex-start">
          <InputText placeholder="Enter item name" label="Item name:" value={newListItem.text} handleChange={handleNewItemChange} isValid={true} />
          <SelectList items={storeMap} onChange={handleSectionChange} value={newListItem.section_id} name="store-sections-item" sr_only={true} />
          <button className="btn btn-form btn-sm" onClick={handleAddItem}>+ Add Item</button>
        </div>
        <Button handleOnClick={handleSaveList} className="btn btn-form">Save List</Button>
      </form>
    </div>
  )
}
