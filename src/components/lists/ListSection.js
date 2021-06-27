import './css/ListSection.css';
import ListItem from "../common/ListItem";
import Button from "../common/Button";
import QuantityTool from "../common/QuantityTool";

export default function ListSection({ section, sectionItems, handleEditListItem, handleEditListItemQuantity, handleRemove }) {
  const content = <>
    <h4 className="pt-3 mb-1 border-t-2 border-neutral-light mt-3" key={`title-${section.id}`}>{section.text}</h4>
    <ul className="rg-list-items" key={section.id}>
      {sectionItems.map((item, i) => (
        <ListItem key={i} className="px-3 py-2 bg-neutral-light mb-1 rounded">
          <span contentEditable={true}
            onBlur={(e) => handleEditListItem(e, item.id)} className="edit-text"
            suppressContentEditableWarning={true}>{item.text}</span>
          <QuantityTool id={item.id} value={item.quantity} onQuantityChange={(id, value) => handleEditListItemQuantity(id, value)}></QuantityTool>
          <Button label="remove" className="btn-icon ml-3 mr-0.5" icon="fas fa-times" handleOnClick={handleRemove} id={item.id} />
        </ListItem>))}
    </ul>
  </>;
  return (sectionItems.length > 0) && content
}
