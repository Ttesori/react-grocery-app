
import { useEffect, useState } from 'react';
import ListItem from '../../common/ListItem';
import { useHistory } from 'react-router-dom';
import Button from '../../common/Button';
import Alert from '../../common/Alert';
import '../css/Stores.css';
import EmptyList from '../../common/EmptyList';

export default function Stores({ title, lists, stores, handleUpdateStore, handleRemoveStore, alert }) {
  const history = useHistory();
  const [isLoading, updateIsLoading] = useState(false);
  const handleRemove = (e, id) => {
    handleRemoveStore(id);
  }

  handleUpdateStore = (id) => {
    history.push(`/stores/${id}`)
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
    <section className="rg-stores">
      <h2 className="mb-1">🏪 &nbsp;Manage Stores</h2>
      <Button
        handleOnClick={() => history.push('/stores/new')}
        className="btn-block" icon="fas fa-plus">
        Create New Store</Button>

      {alert && <Alert type={alert.type} message={alert.message} />}
      {!isLoading && stores?.length > 0 &&
        <ul className="mt-3 rg-store-main">
          {(stores.length > 0) && stores.map((store, i) => <ListItem key={i} className="mb-1.5">
            <span className="store-name">{store.name}</span>
            <span className="store-buttons">
              <Button label="edit" className="icon p-0 pr-1" icon="fas fa-cog" handleOnClick={() => handleUpdateStore(store.id)} />
              {lists && lists.filter(list => list.store_id === store.id).length === 0 && <Button label="remove" className="icon p-0" icon="fas fa-times" handleOnClick={handleRemove} id={store.id} />}
            </span>
          </ListItem>)}
        </ul>
      }
      {stores?.length === 0 &&
        <EmptyList>
          Once you create a store, you'll see a list of all of your stores here.
        </EmptyList>
      }
    </section>
  )
}
