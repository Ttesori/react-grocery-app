import { useParams, useHistory } from 'react-router-dom';
import EditStore from "../stores/EditStore";

export default function StoresEdit({ handleUpdateStore, stores }) {
  const { id } = useParams();
  let history = useHistory();
  const store = stores.find(store => store.id === id);
  if (store?.id === undefined) {
    history.push('/stores');
  }
  return (
    <>
      {store && <EditStore handleUpdateStore={handleUpdateStore} store={store} />}
    </>
  )
}
