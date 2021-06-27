import { useState } from 'react';
import InputText from '../form/InputText';
import DragDropContainer from '../common/DragDropContainer';
import { useHistory } from 'react-router-dom';
import Button from '../common/Button';
import Modal from '../common/Modal';

export default function EditStore({ handleUpdateStore, store, newStore }) {
  let history = useHistory();
  const [storeName, updateStoreName] = useState(store.name);
  const [newSectionName, updateNewSectionName] = useState('');
  const [sections, updateSections] = useState(store.sections);
  const [sectionsOrder, updateSectionsOrder] = useState(store.sections.map(section => section.id));
  const [sectionIsValid, updateSectionIsValid] = useState(true);
  const [nameIsValid, updateNameIsValid] = useState(true);
  const [modalIsOpen, updateModalisOpen] = useState(false);

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
    updateModalisOpen(false);
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
      history.push('/dashboard');
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
        <InputText id={"store_name"} placeholder="Enter store name..." label="Store Name" handleChange={handleNameChange} value={storeName} isValid={nameIsValid} invalidText='Please enter store name' className="p-2 bg-neutral-light rounded" />
        <h4 className="border-t-2 border-neutral-light mt-6 pt-4 text-neutral text-lg font-bold text-center">Store Sections</h4>
        <DragDropContainer items={sections} itemsOrder={sectionsOrder} onDragEnd={handleOnDragEnd} listId="sections" isEditable={true} handleEdit={handleEdit} isRemovable={true} handleRemove={handleRemoveSection} />
        <Button icon="fas fa-plus" className="btn-outline mt-2 mb-3 w-full" handleOnClick={() => updateModalisOpen(true)}>Add New Section</Button>
        <Modal isOpen={modalIsOpen} handleClose={() => updateModalisOpen(false)}>
          <InputText placeholder="Enter section name" label="Section Name:" value={newSectionName} handleChange={handleSectionChange} isValid={sectionIsValid} invalidText='Please enter at least one section' />
          <Button className="btn-block" handleOnClick={handleAddSection}>Add Section</Button>
        </Modal>
        <Button icon="fas fa-download" className="btn-block" handleOnClick={handleSubmit}>Save Store</Button>
        <Button className="w-full btn-link text-sm error" icon="fas fa-times" handleOnClick={() => history.push('/dashboard')}> Cancel</Button>
      </form>

    </>
  )
}
