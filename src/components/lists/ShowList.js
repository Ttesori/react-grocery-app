import ListItem from "../common/ListItem";
export default function ShowList({ list, store }) {
  return store.sections.map((section, i) => {
    const itemsInSection = list.items.filter(item => item.section_id === section.id);
    return (itemsInSection?.length > 0) &&
      <section key={section.id}>
        <h3>{section.text}</h3>
        <ul>
          {itemsInSection.map((item, i) =>
            <ListItem className="list-check" key={`${item.id}-${i}`}>
              <input type="checkbox" id={item.id} />{item.text}
            </ListItem>
          )}
        </ul>
      </section>
  })

}
