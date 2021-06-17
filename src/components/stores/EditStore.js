import { useState } from 'react';
import InputText from '../form/InputText';
import DragDropContainer from '../DragDropContainer';
import { useHistory } from 'react-router-dom';

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
    const newSection = {
      id: `section-${Math.ceil(Math.random() * 999999)}`,
      text: newSectionName
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
    console.log(sectionToUpdate, text);
    const sectionIdx = sections.findIndex(section => section.id === sectionToUpdate.id)
    const keepSections = [...sections]
    sectionToUpdate.text = text;
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

  // useEffect(() => {
  //   updateSectionsOrder(sections.map(section => section.id));
  // }, [sections]);


  return (
    <>
      <form>
        <h3>{newStore ? 'Add' : 'Edit'} Store</h3>
        <InputText id={"store_name"} placeholder="Enter store name..." label="Store Name:" handleChange={handleNameChange} value={storeName} isValid={nameIsValid} invalidText='Please enter store name' />
        <DragDropContainer items={sections} itemsOrder={sectionsOrder} onDragEnd={handleOnDragEnd} listId="sections" isEditable={true} handleEdit={handleEdit} isRemovable={true} handleRemove={handleRemoveSection} />
        <div className="flex">
          <InputText placeholder="Enter section name" label="Section Name:" value={newSectionName} handleChange={handleSectionChange} isValid={sectionIsValid} invalidText='Please enter at least one section' />
          <button className="btn btn-form btn-sm" onClick={handleAddSection}>+ Add Section</button>
        </div>
        <button className="btn btn-form" type="submit" onClick={handleSubmit}>{newStore ? 'Add' : 'Update'} Store</button>
      </form>

    </>
  )
}
