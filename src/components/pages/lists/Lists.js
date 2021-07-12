import Button from "../../common/Button";
import Modal from "../../common/Modal";
import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import ListItem from "../../common/ListItem";
import Alert from "../../common/Alert";
import EmptyList from "../../common/EmptyList";
import '../css/Lists.css';

export default function Lists({ title, stores, lists, alert, handleRemoveList }) {
  const history = useHistory();
  const [isLoading, updateIsLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState();

  const handleRemove = (e) => {
    handleRemoveList(e, itemToRemove);
    setModalIsOpen(false);
    setItemToRemove(undefined);
  }

  const handleCancelRemove = () => {
    setModalIsOpen(false);
    setItemToRemove(undefined);
  }

  const handleUpdateList = (id) => {
    history.push(`/lists/edit/${id}`)
  }
  const handleViewList = (id) => {
    history.push(`/lists/view/${id}`)
  }

  const handleRemoveClick = (id) => {
    setModalIsOpen(true);
    setItemToRemove(id);
  }

  useEffect(() => {
    if (alert?.type === 'loading') {
      return updateIsLoading(true);
    }
    updateIsLoading(false);
  }, [alert]);

  return lists && stores && (

    <section className="mx-auto rg-lists mb-8 mt-4">
      <div className="rg-lists-header">
        <h2 className="mb-1">📝 &nbsp;My Lists </h2>
        <Button handleOnClick={() => history.push('/lists/new')}
          className="btn-block mb-3" icon="fas fa-plus">
          Add New List</Button>
      </div>

      {alert && <Alert type={alert.type} message={alert.message} />}
      {isLoading && lists?.length > 0 &&
        lists.map((list, i) => <div key={i} className="h-16 bg-neutral-light mb-1.5"></div>)
      }
      {lists?.length === 0 &&
        <EmptyList>
          Once you add a list, your lists will appear here.
        </EmptyList>
      }
      {!isLoading && lists?.length > 0 && <ul className="rg-list-main">
        {lists?.length > 0 && lists.map((list, i) => <ListItem key={i} className={`rg-list-li mb-1.5 bg-${stores.find(store => store.id === list.store_id).color}`}>
          <span className="list-name font-semibold">
            <Link to={`/lists/edit/${list.id}`}>
              {list.name}
            </Link>
          </span>
          <span className="list-buttons">
            <Button label="show" className="btn-icon"
              icon="fas fa-share"
              sr_content='View/Share List'
              handleOnClick={() => handleViewList(list.id)} />
            <Button label="edit" className="btn-icon ml-2"
              icon="fas fa-cog"
              sr_content='Edit List'
              handleOnClick={() => handleUpdateList(list.id)} />
            <Button label="remove" className="btn-icon ml-2 pr-0"
              icon="fas fa-times"
              sr_content='Remove List'
              handleOnClick={() => handleRemoveClick(list.id)} id={list.id} />
          </span>
          <span className="list-store">
            {stores.find(store => store.id === list.store_id).name}</span>
          <span className="list-items">
            {list.items.length} item{list.items.length !== 1 ? 's' : ''}
          </span>
        </ListItem>)}
      </ul>}
      {modalIsOpen &&
        <Modal isOpen={modalIsOpen} handleClose={handleCancelRemove}>
          <p>Are you sure you'd like to <strong>remove this list?</strong></p>
          <Button handleOnClick={(e) => handleRemove(e)}>Yes, Remove List</Button>
          <Button className="w-full btn-link text-sm error" icon="fas fa-times" handleOnClick={handleCancelRemove}>Cancel</Button>
        </Modal>}
    </section>
  )
}
