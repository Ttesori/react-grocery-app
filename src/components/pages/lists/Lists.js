import Button from "../../common/Button";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import ListItem from "../../common/ListItem";
import Container from '../../common/Container';
import Alert from "../../common/Alert";

export default function Lists({ lists, alert, handleRemoveList }) {
  const history = useHistory();
  const [isLoading, updateIsLoading] = useState(false);
  const handleRemove = (id) => {
    handleRemoveList(id);
  }

  const handleUpdateList = (id) => {
    history.push(`/lists/edit/${id}`)
  }
  const handleViewList = (id) => {
    history.push(`/lists/${id}`)
  }


  useEffect(() => {
    if (lists.length) {
      return updateIsLoading(false);
    }
    updateIsLoading(true);
  }, [lists])

  useEffect(() => {
    if (alert?.type === 'loading') {
      return updateIsLoading(true);
    }
    updateIsLoading(false);
  }, [alert])

  return (
    <Container>
      <h2>Manage Lists</h2>
      <Link to="lists/new">Add New</Link>
      {alert && <Alert type={alert.type} message={alert.message} />}
      {!isLoading &&
        <ul className="list">
          {lists && lists.map((list, i) => <ListItem key={i} >{list.name}
            <div className="buttons">
              <Button label="show" className="icon" icon="fas fa-eye" handleOnClick={() => handleViewList(list.id)} />
              <Button label="edit" className="icon" icon="fas fa-edit" handleOnClick={() => handleUpdateList(list.id)} />
              <Button label="remove" className="icon" icon="fas fa-times" handleOnClick={() => handleRemove(list.id)} id={list.id} />
            </div>
          </ListItem>)}
        </ul>}
    </Container>
  )
}
