import { useParams, useHistory } from 'react-router-dom';

export default function ListsShow({ lists }) {
  const { id } = useParams();
  let history = useHistory();
  const list = lists.find(list => list.id === id);
  if (list?.id === undefined) {
    history.push('/lists');
  }
  return (
    <div>
      <h2>Display List</h2>
      <p>Editing list {id}</p>
    </div>
  )
}
