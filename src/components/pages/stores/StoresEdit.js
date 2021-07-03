import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import EditStore from "../../stores/EditStore";

export default function StoresEdit({ newStore, title, handleUpdateStore, stores }) {
  const [ourStore, updateOurStore] = useState(null);
  const { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    if (stores.length) {
      const ourStore = stores.find(store => store.id === id);
      updateOurStore(ourStore);
      //if (!ourStore && !newStore) return history.push('/dashboard');
    }
  }, [stores, history, id, newStore]);

  useEffect(() => {
    document.title = title;
    document.body.className = 'page-add-store';
  }, [title])

  return (
    <section className="rg-add-store py-5 my-5 mx-auto max-w-screen-sm px-5">
      <h2>🛒 Edit Store</h2>
      {ourStore && <EditStore handleUpdateStore={handleUpdateStore} store={ourStore} />}
    </section>
  )
}
