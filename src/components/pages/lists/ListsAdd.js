import EditList from "../../lists/EditList";
import Container from '../../common/Container';
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
export default function ListsAdd({ title, stores, handleAddList }) {
  const history = useHistory();
  const [isLoading, updateIsLoading] = useState(true);

  useEffect(() => {
    if (stores.length > 0) {
      return updateIsLoading(false);
    }
    if (stores && stores.length === 0) {
      return history.push('/dashboard')
    }
  }, [stores, history]);

  useEffect(() => {
    document.title = title;
  }, [title])

  return (!isLoading &&
    <section className="p-5">
      <h2>Add New List</h2>
      <EditList
        stores={stores}
        handleUpdateList={handleAddList}
        list={({
          name: 'New List',
          store_id: stores[0].id,
          items: []
        })} />
    </section>
  )
}
