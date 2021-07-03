import './css/ShowList.css';
import ListItem from "../common/ListItem";

export default function ShowList({ items, store, handleCheck }) {
  return store.sections.map((section, i) => {
    const itemsInSection = items.filter(item => item.section_id === section.id);
    return (itemsInSection?.length > 0) &&
      <section key={section.id}>
        <h4 className="mb-1 mt-4">{section.text}</h4>
        <ul>
          {itemsInSection.map((item, i) =>
            <ListItem className="list-check bg-neutral-light p-2 rounded mb-2 flex justify-between items-center" key={`${item.id}-${i}`}>
              <label className="checkbox flex-1" >
                <input data-id={item.id} type="checkbox" className="checkbox-check" defaultChecked={item.checked} onChange={handleCheck} />
                <span className="checkbox-label">{item.text}</span>
              </label>
              <span className="ml-2 item-quantity text-sm font-semibold text-neutral">x {item.quantity}</span>
            </ListItem>
          )}
        </ul>
      </section>
  })

}
