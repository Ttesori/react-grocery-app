import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import EditStore from "../../stores/EditStore";

export default function StoresEdit({ newStore, title, handleUpdateStore, stores }) {
  const [isLoading, updateIsLoading] = useState(true);
  const [ourStore, updateOurStore] = useState(null);
  const { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    console.log(newStore);
    if (stores.length) {
      const ourStore = stores.find(store => store.id === id);
      updateOurStore(ourStore);
      if (ourStore?.id) return updateIsLoading(false);
      //if (!ourStore && !newStore) return history.push('/dashboard');
    }
  }, [stores, history, id, newStore]);

  useEffect(() => {
    document.title = title;
    document.body.className = 'page-add-store';
  }, [title])

  if (isLoading) return <></>;
  return !isLoading &&
    <section className="rg-add-store my-5 mx-3">
      <h2>🛒 Edit Store</h2>
      {ourStore && <EditStore handleUpdateStore={handleUpdateStore} store={ourStore} />}
    </section>

}
