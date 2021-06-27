import { useHistory } from 'react-router-dom';
import './css/ShowList.css';
import ListItem from "../common/ListItem";

export default function ShowList({ list, store }) {
  return store.sections.map((section, i) => {
    const itemsInSection = list.items.filter(item => item.section_id === section.id);
    return (itemsInSection?.length > 0) &&
      <section key={section.id}>
        <h3 className="mb-1 mt-2">{section.text}</h3>
        <ul>
          {itemsInSection.map((item, i) =>
            <ListItem className="list-check bg-neutral-light py-1 px-2 rounded mb-1 flex justify-between items-center" key={`${item.id}-${i}`}>
              <label className="checkbox">
                <input type="checkbox" className="checkbox-check" />
                <span className="checkbox-label">{item.text}</span>
              </label>
              <span className="ml-2 item-quantity text-sm font-semibold text-neutral">x {item.quantity}</span>
            </ListItem>
          )}
        </ul>
      </section>
  })

}
