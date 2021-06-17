import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
  const history = useHistory();
  const allStoresMap = stores.map(store => {
    return {
      value: store.id,
      text: store.name
    }
  })

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
    console.log(newListItem);
    const newItems = [...items, {
      id: `item-${items.length}`,
      text: newListItem.text,
      section_id: newListItem.section_id,

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
      name: name || 'New List',
      store_id: store.id,
      items: items
    }
    handleAddList(newList);
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
  const reorganizeItems = () => {
    const currItems = [...items];
    // need to map items to new sections using section text
    const newItems = currItems.map(item => {

    })
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
      <h2>Add List</h2>
      <form>
        <InputText label="List Name:" id="" placeholder="Enter List Name..." handleChange={handleNameChange} value={name} isValid={isValid.name} invalidText='Please enter a list name...' />
        <SelectList items={allStoresMap} onChange={handleStoreChange} value={store.id} />
        {items && <ul className="list">
          {store.sections.map(section => {
            const sectionItems = items.filter(item => item.section_id === section.id);
            return sectionItems && sectionItems.map((item, i) =>
              <>
                {i === 0 ? <h3>{section.text}</h3> : ''}
                <ListItem key={i}>
                  <span contentEditable={true}
                    onBlur={(e) => editedListItem(e, item.id)} className="edit-text"
                    suppressContentEditableWarning={true}
                  >{item.text}</span>
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
