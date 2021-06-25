
import { useEffect, useState } from 'react';
import ListItem from '../../common/ListItem';
import { useHistory } from 'react-router-dom';
import Button from '../../common/Button';
import Alert from '../../common/Alert';
import { auth } from '../../../firebase';
import '../css/Stores.css';

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
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        //history.push('/');
      }
    });
  }, [history]);

  useEffect(() => {
    if (stores.length > 0) {
      return updateIsLoading(false);
    }
    updateIsLoading(true);
  }, [stores])

  useEffect(() => {
    if (alert?.type === 'loading') {
      return updateIsLoading(true);
    }
    updateIsLoading(false);
  }, [alert]);

  useEffect(() => {
    document.title = title;
  }, [title])

  return (
    <section className="rg-stores">
      <h2>Manage Stores</h2>
      <Button
        handleOnClick={() => history.push('/stores/new')}
        className="block" icon="fas fa-plus">
        Add New Store</Button>

      {alert && <Alert type={alert.type} message={alert.message} />}
      {!isLoading && stores?.length > 0 &&
        <ul className="mt-3 rg-store-main">
          {(stores.length > 0) && stores.map((store, i) => <ListItem key={i}>
            <span className="store-name">{store.name}</span>
            <span className="store-buttons">
              <Button label="edit" className="icon" icon="fas fa-cog" handleOnClick={() => handleUpdateStore(store.id)} />
              {lists && lists.filter(list => list.store_id === store.id).length === 0 && <Button label="remove" className="icon" icon="fas fa-times" handleOnClick={handleRemove} id={store.id} />}
            </span>
          </ListItem>)}
        </ul>
      }
    </section>
  )
}
