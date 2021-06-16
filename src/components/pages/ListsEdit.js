import { useParams, useHistory } from "react-router";

export default function ListsEdit({ stores, lists }) {
  const { id } = useParams();
  let history = useHistory();
  const list = lists.find(list => list.id === id);
  if (list?.id === undefined) {
    history.push('/lists');
  }
  return (
    <div>
      <h2>Edit Lists</h2>
      <p>Editing list {id}</p>
    </div>
  )
}
