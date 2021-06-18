
import EditStore from "../../stores/EditStore";
import Container from '../../common/Container';

export default function StoresAdd({ handleAddStore }) {
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
  return (
    <Container>
      <EditStore handleUpdateStore={handleAddStore} store={defaultStore} newStore={true} />
    </Container>
  )
}
