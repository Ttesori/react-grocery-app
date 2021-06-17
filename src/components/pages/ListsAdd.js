import EditList from "../lists/EditList"
import { useHistory } from "react-router-dom";
export default function ListsAdd({ stores, handleAddList }) {
  const history = useHistory();
  if (stores?.length === 0) {
    history.push('/stores')
  }
  const defaultList = {
    name: 'New List',
    store_id: stores[0].id,
    items: []
  }
  return (
    <>
      <EditList stores={stores} handleUpdateList={handleAddList} list={defaultList} />
    </>
  )
}
