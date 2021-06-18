import ListItem from "../common/ListItem";
import Button from "../Button";

export default function ListSection({ section, sectionItems, handleEditListItem, handleRemove }) {
  const content = <ul className="list" key={section.id}>
    <h3 key={`header-${section.id}`}>{section.text}</h3>
    {sectionItems.map((item, i) => (
      <ListItem key={i}>
        <span contentEditable={true}
          onBlur={(e) => handleEditListItem(e, item.id)} className="edit-text"
          suppressContentEditableWarning={true}>{item.text}</span>
        <Button label="remove" className="icon" icon="fas fa-times" handleOnClick={handleRemove} id={item.id} />
      </ListItem>))}
  </ul>;
  return (sectionItems.length > 0) && content
}
