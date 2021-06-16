import { useState, useEffect } from "react";
import InputText from "../form/InputText";
import SelectList from "../form/SelectList";
import ListItem from "../common/ListItem";
import Button from "../Button";

export default function AddList({ handleAddList, stores }) {
  const [name, updateName] = useState('');
  const [items, updateItems] = useState([]);
  const [store, updateStore] = useState(stores[0]);
  const [storeMap, updateStoreMap] = useState([]);
  const [newListItem, updateNewListItem] = useState({
    text: '',
    section_id: store?.sections[0]?.id
  });
  const [isValid, updateIsValid] = useState({
    name: true,
    store: true,
    items: true
  });
  const allStoresMap = stores.map(store => {
    return {
      value: store.id,
      text: store.name
    }
  })


  const handleNameChange = (text) => {
    console.log('Name changed');
    updateName(text);
  }
  const handleStoreChange = (e) => {
    console.log('Select changed');
    console.log(e.target.value);
  }
  const handleSectionChange = (e) => {
    console.log('Select changed');
    console.log(e.target.value);
    updateNewListItem({ ...newListItem, section_id: e.target.value })
  }
  const handleNewItemChange = (text) => {
    console.log(text);
    updateNewListItem({ ...newListItem, text: text });
  }
  const handleAddItem = (e) => {
    e.preventDefault();
    console.log(newListItem);
    updateItems([...items, {
      id: `item-${items.length}`,
      text: newListItem.text,
      section_id: newListItem.section_id
    }]);
    updateNewListItem({
      text: '',
      section_id: store?.sections[0]?.id
    })
  }
  const handleSaveList = (e) => {
    e.preventDefault();
    const newList = {
      name: name || 'New List',
      store_id: store.id,
      items: items
    }
    handleAddList(newList)
  }
  const handleRemove = (e, id) => {
    e.preventDefault();
    const keep = items.filter(item => item.id !== id);
    updateItems([...keep]);
  }
  useEffect(() => {
    const newStoreMap = store?.sections?.map(section => {
      return {
        value: section.id,
        text: section.text
      }
    });
    updateStoreMap(newStoreMap);
  }, [store])
  return (
    <div>
      <h2>Add List</h2>
      <form>
        <InputText label="List Name:" id="" placeholder="Enter List Name..." handleChange={handleNameChange} value={name} isValid={isValid.name} invalidText='Please enter a list name...' />
        <SelectList items={allStoresMap} onChange={handleStoreChange} value={store} />
        {items && <ul className="list">
          {items.map((item, i) => <ListItem key={i}>{item.text} - {storeMap.find(section => item.section_id === section.value).text}
            <Button label="remove" className="icon" icon="fas fa-times" handleOnClick={handleRemove} id={item.id} />
          </ListItem>)}
        </ul>}
        <div className="flex flex-start">
          <InputText placeholder="Enter item name" label="Item name:" value={newListItem.text} handleChange={handleNewItemChange} isValid={true} />
          <SelectList items={storeMap} onChange={handleSectionChange} value={newListItem.section_id} />
          <button className="btn btn-form btn-sm" onClick={handleAddItem}>+ Add Item</button>
        </div>
        <Button handleOnClick={handleSaveList} className="btn btn-form">Save List</Button>
      </form>
    </div>
  )
}
