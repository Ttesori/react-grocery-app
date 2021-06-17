import { useParams, useHistory } from "react-router";
import EditList from "../lists/EditList";

export default function ListsEdit({ stores, lists, handleUpdateList }) {
  const { id } = useParams();
  let history = useHistory();
  const list = lists.find(list => list.id === id);
  console.log(id, list.id);
  if (list === undefined) {
    history.push('/lists');
  }
  return (
    <div>
      <h2>Edit Lists</h2>
      <EditList list={list} stores={stores} handleUpdateList={handleUpdateList} />
    </div>
  )
}
