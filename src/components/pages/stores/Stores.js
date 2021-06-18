
import ListItem from '../../common/ListItem';
import { Link, useHistory } from 'react-router-dom';
import Button from '../../Button';

export default function Stores({ stores, handleUpdateStore, handleRemoveStore }) {
  const history = useHistory();
  const handleRemove = (e, id) => {
    handleRemoveStore(id);
  }

  handleUpdateStore = (id) => {
    history.push(`/stores/${id}`)
  }

  return (
    <>
      <h2>Manage Stores</h2>
      <Link to="stores/new">Add New</Link>
      <ul className="list">
        {stores && stores.map((store, i) => <ListItem key={i}>{store.name}
          <div className="buttons">
            <Button label="edit" className="icon" icon="fas fa-edit" handleOnClick={() => handleUpdateStore(store.id)} />
            <Button label="remove" className="icon" icon="fas fa-times" handleOnClick={handleRemove} id={store.id} />
          </div>
        </ListItem>)}
      </ul>

    </>
  )
}
