
import ListItem from "../common/ListItem";
import Button from "../common/Button";
import QuantityTool from "../common/QuantityTool";

export default function ListSection({ section, sectionItems, handleEditListItem, handleEditListItemQuantity, handleRemove }) {
  const content = <ul className="list" key={section.id}>
    <h3>{section.text}</h3>
    {sectionItems.map((item, i) => (
      <ListItem key={i}>
        <span contentEditable={true}
          onBlur={(e) => handleEditListItem(e, item.id)} className="edit-text"
          suppressContentEditableWarning={true}>{item.text}</span>
        <QuantityTool id={item.id} value={item.quantity} onQuantityChange={(id, value) => handleEditListItemQuantity(id, value)}></QuantityTool>
        <Button label="remove" className="icon" icon="fas fa-times" handleOnClick={handleRemove} id={item.id} />
      </ListItem>))}
  </ul>;
  return (sectionItems.length > 0) && content
}
