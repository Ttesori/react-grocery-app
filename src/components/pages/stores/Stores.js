
import { useEffect, useState } from 'react';
import ListItem from '../../common/ListItem';
import { useHistory } from 'react-router-dom';
import Modal from '../../common/Modal';
import Button from '../../common/Button';
import Alert from '../../common/Alert';
import '../css/Stores.css';
import EmptyList from '../../common/EmptyList';

export default function Stores({ title, lists, stores, handleRemoveStore, alert }) {
  const history = useHistory();
  const [isLoading, updateIsLoading] = useState(false);
  const [removeIsOpen, setRemoveIsOpen] = useState(false);
  const [storeIdToDelete, setStoreIdToDelete] = useState();

  const handleRemove = (id) => {
    setRemoveIsOpen(true);
    setStoreIdToDelete(id);
  }

  const handleUpdateClick = (id) => {
    history.push(`/stores/${id}`)
  }

  const handleCancelRemove = () => {
    setRemoveIsOpen(false);
    setStoreIdToDelete(undefined);
  }

  const handleConfirmRemove = (e) => {
    handleRemoveStore(e, storeIdToDelete);
    setRemoveIsOpen(false);
    setStoreIdToDelete(undefined);
  }

  useEffect(() => {
    if (alert?.type === 'loading') {
      return updateIsLoading(true);
    }
    updateIsLoading(false);
  }, [alert]);

  useEffect(() => {
    document.title = title;
    document.body.className = 'page-dashboard';
  }, [title])

  return (
    <section className="rg-stores relative pb-10">
      <div className="mx-auto rg-stores-container">
        <h2 className="mb-1 lg:mb-3">🏪 &nbsp;My Stores</h2>
        <Button
          handleOnClick={() => history.push('/stores/new')}
          className="my-3 btn-block rg-btn-create-store" icon="fas fa-plus">
          Create New Store</Button>

        {alert && <Alert type={alert.type} message={alert.message} />}
        {isLoading && stores?.length > 0 &&
          stores.map((store, i) => <div key={i} className="h-9 bg-white bg-opacity-10 mb-1.5"></div>)
        }
        {!isLoading && stores?.length > 0 &&
          <ul className="rg-store-main">
            {(stores.length > 0) && stores.map((store, i) => <ListItem key={i} className={`rg-store-li bg-${store.color} mb-1.5 lg:mb-2.5`}>
              <span className="store-name">{store.name}</span>
              <span className="store-buttons">
                <Button label="edit" className="btn-icon p-0 pr-3"
                  icon="fas fa-cog"
                  sr_content='Edit Store'
                  handleOnClick={() => handleUpdateClick(store.id)} />
                {lists && lists.filter(list => list.store_id === store.id).length === 0 && <Button label="remove" className="btn-icon p-0" icon="fas fa-times" handleOnClick={() => handleRemove(store.id)} id={store.id} sr_content='Delete Store' />}
              </span>
            </ListItem>)}
          </ul>
        }
        {stores?.length === 0 &&
          <EmptyList>
            Once you create a store, you'll see a list of all of your stores here.
          </EmptyList>
        }
      </div>
      {removeIsOpen &&
        <Modal isOpen={removeIsOpen} handleClose={handleCancelRemove}>
          <p>Are you sure you'd like to <strong>remove this store?</strong></p>
          <Button handleOnClick={(e) => handleConfirmRemove(e)}>Yes, Remove Store</Button>
          <Button className="w-full btn-link text-sm error" icon="fas fa-times" handleOnClick={handleCancelRemove}>Cancel</Button>
        </Modal>}
    </section>
  )
}
