import Button from "../../common/Button";
import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import ListItem from "../../common/ListItem";
import Alert from "../../common/Alert";
import EmptyList from "../../common/EmptyList";
import '../css/Lists.css';

export default function Lists({ title, stores, lists, alert, handleRemoveList }) {
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
    if (alert?.type === 'loading') {
      return updateIsLoading(true);
    }
    updateIsLoading(false);
  }, [alert]);

  return (
    <section className="rg-lists mb-5 mt-4">
      <h2 className="mb-1">📝 &nbsp;Manage Lists </h2>
      <Button handleOnClick={() => history.push('/lists/new')}
        className="btn-block" icon="fas fa-plus">
        Add New List</Button>
      {lists?.length === 0 &&
        <EmptyList>
          Once you add a list, your lists will appear here.
        </EmptyList>
      }

      {alert && <Alert type={alert.type} message={alert.message} />}
      {!isLoading && lists?.length > 0 && <ul className="rg-list-main mt-3">
        {lists?.length > 0 && lists.map((list, i) => <ListItem key={i} className="mb-1.5">
          <span className="list-name font-semibold">
            <Link to={`/lists/edit/${list.id}`}>
              {list.name}
            </Link>
          </span>
          <span className="list-buttons">
            <Button label="show" className="btn-icon" icon="fas fa-share" handleOnClick={() => handleViewList(list.id)} />
            <Button label="edit" className="btn-icon ml-2" icon="fas fa-cog" handleOnClick={() => handleUpdateList(list.id)} />
            <Button label="remove" className="btn-icon ml-2 pr-0" icon="fas fa-times" handleOnClick={() => handleRemove(list.id)} id={list.id} />
          </span>
          <span className="list-store">
            {stores.find(store => store.id === list.store_id).name}</span>
          <span className="list-items">
            {list.items.length} item{list.items.length !== 1 ? 's' : ''}
          </span>
        </ListItem>)}
      </ul>}
    </section>
  )
}
