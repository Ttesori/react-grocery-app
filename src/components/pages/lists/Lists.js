import Button from "../../Button";
import { Link, useHistory } from "react-router-dom";
import ListItem from "../../common/ListItem";
import Container from '../../common/Container';

export default function Lists({ lists, handleRemoveList }) {
  const history = useHistory();
  const handleRemove = (e, id) => {
    handleRemoveList(id);
  }

  const handleUpdateList = (id) => {
    history.push(`/lists/edit/${id}`)
  }
  const handleViewList = (id) => {
    history.push(`/lists/${id}`)
  }
  return (
    <Container>
      <h2>Manage Lists</h2>
      <Link to="lists/new">Add New</Link>
      <ul className="list">
        {lists && lists.map((list, i) => <ListItem key={i} >{list.name}
          <div className="buttons">
            <Button label="show" className="icon" icon="fas fa-eye" handleOnClick={() => handleViewList(list.id)} />
            <Button label="edit" className="icon" icon="fas fa-edit" handleOnClick={() => handleUpdateList(list.id)} />
            <Button label="remove" className="icon" icon="fas fa-times" handleOnClick={handleRemove} id={list.id} />
          </div>
        </ListItem>)}
      </ul>
    </Container>
  )
}
