import EditList from "../../lists/EditList";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
export default function ListsAdd({ stores, handleAddList }) {
  const history = useHistory();
  const [isLoading, updateIsLoading] = useState(true);
  const defaultList = {
    name: 'New List',
    store_id: stores[0].id,
    items: []
  }
  useEffect(() => {
    if (stores && stores.length === 0) {
      return history.push('/stores')
    }
    if (stores.length > 0) {
      updateIsLoading(false);
    }
  }, [stores, history])
  return (!isLoading &&
    <>
      <EditList stores={stores} handleUpdateList={handleAddList} list={defaultList} />
    </>
  )
}
