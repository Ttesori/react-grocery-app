import { useState, useEffect } from 'react';
import InputText from '../form/InputText';
import DragDropContainer from '../DragDropContainer';
import { useHistory } from 'react-router-dom';

export default function AddStore({ handleAddStore }) {
  let history = useHistory();
  const [storeName, updateStoreName] = useState('');
  const [newSectionName, updateNewSectionName] = useState('');
  const [sections, updateSections] = useState([]);
  const [sectionsOrder, updateSectionsOrder] = useState(sections.map(section => section.id));
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
      id: sections.length + '',
      text: newSectionName
    }
    updateSectionIsValid(true);
    updateSections([...sections, newSection]);

    updateSectionsOrder(sections.map(section => section.id))
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
      handleAddStore({
        name: storeName,
        sections: sections
      });
      history.push('/stores');
    }

  }
  const handleOnDragEnd = (newSections, newSectionsOrder) => {
    updateSections(newSections);
    updateSectionsOrder(newSectionsOrder);
  }

  const handleRemoveSection = (e, sectionId) => {
    e.preventDefault();
    const newSections = sections.filter(section => section.id !== sectionId);
    updateSections([...newSections]);
  }

  useEffect(() => {
    updateSectionsOrder(sections.map(section => section.id));
  }, [sections]);

  useEffect(() => {

  })

  return (
    <>
      <form>
        <h3>Add A Store</h3>
        <InputText id={"store_name"} placeholder="Enter store name..." label="Store Name:" handleChange={handleNameChange} value={storeName} isValid={nameIsValid} invalidText='Please enter store name' />
        <DragDropContainer items={sections} itemsOrder={sectionsOrder} onDragEnd={handleOnDragEnd} listId="sections" isEditable={false} isRemovable={true} handleRemove={handleRemoveSection} />
        <div className="flex">
          <InputText placeholder="Enter section name" label="Section Name:" value={newSectionName} handleChange={handleSectionChange} isValid={sectionIsValid} invalidText='Please enter at least one section' />
          <button className="btn btn-form btn-sm" onClick={handleAddSection}>+ Add Section</button>
        </div>
        <button className="btn btn-form" type="submit" onClick={handleSubmit}>Add Store</button>
      </form>

    </>
  )
}
