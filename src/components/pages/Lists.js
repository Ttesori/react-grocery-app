import Button from "../Button";
import { Link } from "react-router-dom";
import ListItem from "../common/ListItem";

export default function Lists({ lists, stores }) {
  const handleRemove = () => {

  }

  const handleUpdateList = () => {

  }
  return (
    <div>
      <h2>Manage Lists</h2>
      <Link to="lists/new">Add New</Link>
      <ul className="list">
        {lists && lists.map((list, i) => <ListItem key={i} >{list.name}
          <div className="buttons">
            <Button label="edit" className="icon" icon="fas fa-edit" handleOnClick={() => handleUpdateList(list.id)} />
            <Button label="remove" className="icon" icon="fas fa-times" handleOnClick={handleRemove} id={list.id} />
          </div>
        </ListItem>)}
      </ul>
    </div>
  )
}
