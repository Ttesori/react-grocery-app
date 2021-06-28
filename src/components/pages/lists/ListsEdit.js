import { useParams, useHistory } from "react-router";
import { useEffect, useState } from "react";
import EditList from "../../lists/EditList";

export default function ListsEdit({ title, stores, lists, handleUpdateList }) {
  const { id } = useParams();
  let history = useHistory();
  const [list, updateList] = useState([]);
  useEffect(() => {
    const ourList = lists.find(list => list.id === id);
    if (lists && !ourList) {
      return history.push('/lists')
    }
    if (lists.length > 0 && ourList) {
      updateList(ourList);
    }
  }, [lists, history, id]);

  useEffect(() => {
    document.title = title;
  }, [title])

  return (
    <section className="p-5">
      <h2>Edit Lists</h2>
      <EditList list={list} stores={stores} handleUpdateList={handleUpdateList} />
    </section>
  )
}
