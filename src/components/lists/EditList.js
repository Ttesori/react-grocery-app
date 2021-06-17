import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import InputText from "../form/InputText";
import SelectList from "../form/SelectList";
import ListItem from "../common/ListItem";
import Button from "../Button";

export default function EditList({ handleUpdateList, list, stores }) {
  const [name, updateName] = useState(list.name);
  const [items, updateItems] = useState(list.items);
  const [store, updateStore] = useState(stores.find(store => list.store_id === store.id));
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
    updateNewListItem({ ...newListItem, section_id: e.target.value })
  }
  const handleNewItemChange = (text) => {
    updateNewListItem({ ...newListItem, text: text });
  }
  const handleAddItem = (e) => {
    e.preventDefault();
    const newItems = [...items, {
      id: `item-${items.length}`,
      text: newListItem.text,
      section_id: newListItem.section_id
    }];
    updateNewListItem({
      text: '',
      section_id: newListItem.section_id
    });
    updateItems(sortItems(newItems));
  }
  const handleSaveList = (e) => {
    e.preventDefault();
    const newList = {
      id: list.id,
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
  const editedListItem = (e, id) => {
    const toEdit = items.find(item => item.id === id);
    toEdit.text = e.target.textContent;
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

  useEffect(() => {
    const newStoreMap = store?.sections?.map(section => {
      return {
        value: section.id,
        text: section.text
      }
    });
    updateStoreMap(newStoreMap);
  }, [store]);
  return (
    <div>
      <form>
        <InputText label="List Name:" id="" placeholder="Enter List Name..." handleChange={handleNameChange} value={name} isValid={isValid.name} invalidText='Please enter a list name...' />
        <SelectList items={allStoresMap} onChange={handleStoreChange} value={store.id} />
        {items && <ul className="list">
          {store.sections.map(section => {
            const sectionItems = items.filter(item => item.section_id === section.id);
            return sectionItems && sectionItems.map((item, i) =>
              <>
                {i === 0 ? <h3>{section.text}</h3> : ''}
                <ListItem key={item.id}>
                  <span contentEditable={true}
                    onBlur={(e) => editedListItem(e, item.id)} className="edit-text"
                    suppressContentEditableWarning={true}>{item.text}</span>
                  <Button label="remove" className="icon" icon="fas fa-times" handleOnClick={handleRemove} id={item.id} />
                </ListItem>
              </>
            )
          })}
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
