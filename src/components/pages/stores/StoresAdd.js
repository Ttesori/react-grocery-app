
import EditStore from "../../stores/EditStore";
import Container from '../../common/Container';
import { useEffect } from "react";

export default function StoresAdd({ title, handleAddStore }) {
  let defaultSections = ['Beverages', 'Bakery', 'Canned Goods', 'Dairy', 'Deli', 'Dry/Baking Goods', 'Frozen Foods', 'Meat/Seafood', 'Produce', 'Snacks', 'Household/Cleaning', 'Paper Products', 'Personal Care', 'Other'];
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
  }, [title])

  return (
    <Container>
      <EditStore handleUpdateStore={handleAddStore} store={defaultStore} newStore={true} />
    </Container>
  )
}
