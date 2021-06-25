import Button from "../../common/Button";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ListItem from "../../common/ListItem";
import Alert from "../../common/Alert";
import EmptyList from "../../common/EmptyList";
import '../css/Lists.css';

export default function Lists({ title, stores, lists, alert, handleRemoveList }) {
  const history = useHistory();
  const [isLoading, updateIsLoading] = useState(true);
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
    if (lists?.length) {
      return updateIsLoading(false);
    }
    updateIsLoading(true);
  }, [lists])

  useEffect(() => {
    if (alert?.type === 'loading') {
      return updateIsLoading(true);
    }
    updateIsLoading(false);
  }, [alert]);

  useEffect(() => {
    document.title = title;
    document.body.className = 'page-lists';
  }, [title])

  return (
    <section className="rg-lists">
      <h2>Manage Lists </h2>
      {stores?.length > 0 ?
        <Button handleOnClick={() => history.push('/lists/new')}
          className="block" icon="fas fa-plus">
          Add New List</Button>
        : <EmptyList>Add a store to create lists</EmptyList>}

      {alert && <Alert type={alert.type} message={alert.message} />}
      {!isLoading && lists?.length > 0 && <ul className="rg-list-main mt-3">
        {lists?.length > 0 && lists.map((list, i) => <ListItem key={i}>
          <span className="list-name">{list.name}</span>
          <span className="list-buttons">
            <Button label="show" className="icon" icon="fas fa-share" handleOnClick={() => handleViewList(list.id)} />
            <Button label="edit" className="icon" icon="fas fa-cog" handleOnClick={() => handleUpdateList(list.id)} />
            <Button label="remove" className="icon pr-0" icon="fas fa-times" handleOnClick={() => handleRemove(list.id)} id={list.id} />
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
