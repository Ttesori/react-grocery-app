import '../css/StoresEdit.css';
import EditStore from "../../stores/EditStore";
import { useEffect } from "react";

export default function StoresAdd({ title, handleAddStore }) {
  let defaultSections = ['Beverages', 'Bakery', 'Dairy', 'Deli', 'Frozen Foods', 'Meat/Seafood', 'Pantry', 'Produce', 'Snacks', 'Household', 'Other'];
  defaultSections.sort();
  const newSections = defaultSections.map((section, i) => ({
    id: `section-${Math.ceil(Math.random() * 9999999)}`,
    text: section
  }))
  let defaultStore = {
    id: 'store-x',
    name: 'New Store',
    sections: newSections
  }

  useEffect(() => {
    document.title = title;
    document.body.className = 'page-add-store';
  }, [title])

  return (
    <section className="rg-add-store mx-auto max-w-screen-sm my-5">
      <h2>Create New Store</h2>
      <EditStore handleUpdateStore={handleAddStore} store={defaultStore} newStore={true} />
    </section>
  )
}
