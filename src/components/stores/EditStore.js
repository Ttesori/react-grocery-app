import { useState } from 'react';
import InputText from '../form/InputText';
import DragDropContainer from '../common/DragDropContainer';
import { useHistory } from 'react-router-dom';
import Button from '../common/Button';

export default function EditStore({ handleUpdateStore, store, newStore }) {
  let history = useHistory();
  const [storeName, updateStoreName] = useState(store.name);
  const [newSectionName, updateNewSectionName] = useState('');
  const [sections, updateSections] = useState(store.sections);
  const [sectionsOrder, updateSectionsOrder] = useState(store.sections.map(section => section.id));
  const [sectionIsValid, updateSectionIsValid] = useState(true);
  const [nameIsValid, updateNameIsValid] = useState(true);

  const handleNameChange = (current) => {
    updateStoreName(current);
    if (current.length > 0) updateNameIsValid(true);
  }
  const handleSectionChange = (current) => {
    updateNewSectionName(current);
  }
  const handleAddSection = (e) => {
    e.preventDefault();
    const text = newSectionName.trim().slice(0, 1).toUpperCase() + newSectionName.trim().slice(1).toLowerCase();
    const newSection = {
      id: `section-${Math.ceil(Math.random() * 999999)}`,
      text: text
    }
    const sectionsUpdate = [...sections, newSection];
    updateSectionIsValid(true);
    updateSections(sectionsUpdate);
    updateSectionsOrder(sectionsUpdate.map(section => section.id))
    updateNewSectionName('');
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check store name
    if (storeName.length === 0) {
      updateNameIsValid(false);
      if (sections.length === 0) updateSectionIsValid(false);
    } else if (sections.length === 0) {
      updateSectionIsValid(false);
    } else {
      handleUpdateStore(store.id, {
        name: storeName,
        sections: sections
      });
      history.push('/stores');
    }

  }
  const handleEdit = (e, sectionToUpdate, text) => {
    const sectionIdx = sections.findIndex(section => section.id === sectionToUpdate.id)
    const keepSections = [...sections]
    sectionToUpdate.text = text.trim().slice(0, 1).toUpperCase() + text.trim().slice(1).toLowerCase();
    keepSections[sectionIdx] = sectionToUpdate;
    updateSections([...keepSections]);
  }
  const handleOnDragEnd = (newSections, newSectionsOrder) => {
    updateSections(newSections);
    updateSectionsOrder(newSectionsOrder);
  }

  const handleRemoveSection = (e, sectionId) => {
    e.preventDefault();
    const newSections = sections.filter(section => section.id !== sectionId);
    updateSections([...newSections]);
    updateSectionsOrder(newSections.map(section => section.id))
  }

  return (
    <>
      <form>
        <InputText id={"store_name"} placeholder="Enter store name..." label="Store Name:" handleChange={handleNameChange} value={storeName} isValid={nameIsValid} invalidText='Please enter store name' />
        <DragDropContainer items={sections} itemsOrder={sectionsOrder} onDragEnd={handleOnDragEnd} listId="sections" isEditable={true} handleEdit={handleEdit} isRemovable={true} handleRemove={handleRemoveSection} />
        <div className="flex">
          <InputText placeholder="Enter section name" label="Section Name:" value={newSectionName} handleChange={handleSectionChange} isValid={sectionIsValid} invalidText='Please enter at least one section' />
          <button className="btn btn-form btn-sm" onClick={handleAddSection}>+ Add Section</button>
        </div>
        <Button className="btn btn-form" handleOnClick={handleSubmit}>{newStore ? 'Add' : 'Update'} Store</Button>
        <Button className="btn btn-outline error ml-3" icon="fas fa-times" handleOnClick={() => history.push('/stores')}> Cancel</Button>
      </form>

    </>
  )
}
