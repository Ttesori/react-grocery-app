import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import EditStore from "../../stores/EditStore";

export default function StoresEdit({ handleUpdateStore, stores }) {
  const [isLoading, updateIsLoading] = useState(true);
  const [ourStore, updateOurStore] = useState(null);
  const { id } = useParams();
  let history = useHistory();
  const content = (<>
    {ourStore && <EditStore handleUpdateStore={handleUpdateStore} store={ourStore} />}
  </>);
  const contentLoading = (<div>Loading...</div>);

  useEffect(() => {
    if (stores.length > 0) {
      const ourStore = stores.find(store => store.id === id);
      updateOurStore(ourStore);
      if (ourStore?.id) return updateIsLoading(false);
      if (!ourStore) return history.push('/stores');
    }
  }, [stores, history, id]);

  if (isLoading) return contentLoading;
  if (!isLoading) return content;
}
