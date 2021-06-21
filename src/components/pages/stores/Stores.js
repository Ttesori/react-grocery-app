
import { useEffect, useState } from 'react';
import ListItem from '../../common/ListItem';
import { Link, useHistory } from 'react-router-dom';
import Button from '../../common/Button';
import Container from '../../common/Container';
import Alert from '../../common/Alert';
import { auth } from '../../../firebase';

export default function Stores({ lists, stores, handleUpdateStore, handleRemoveStore, alert }) {
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
        history.push('/');
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
  }, [alert])

  return (
    <Container>
      <h2>Manage Stores</h2>
      <Link to="stores/new">Add New</Link>
      {alert && <Alert type={alert.type} message={alert.message} />}
      {!isLoading &&
        <ul className="list">
          {stores && stores.map((store, i) => <ListItem key={i}>{store.name}
            <div className="buttons">
              <Button label="edit" className="icon" icon="fas fa-edit" handleOnClick={() => handleUpdateStore(store.id)} />
              {lists.filter(list => list.store_id === store.id).length === 0 && <Button label="remove" className="icon" icon="fas fa-times" handleOnClick={handleRemove} id={store.id} />}
            </div>
          </ListItem>)}
        </ul>
      }
    </Container>
  )
}
