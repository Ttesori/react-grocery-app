import { useParams, useHistory } from "react-router";
import { useEffect, useState } from "react";
import EditList from "../../lists/EditList";
import Loader from "../../common/Loader";

export default function ListsEdit({ title, stores, lists, handleUpdateList }) {
  const { id } = useParams();
  let history = useHistory();
  const [list, updateList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const ourList = lists.find(list => list.id === id);
    if (lists && !ourList) {
      return history.push('/dashboard')
    }
    if (lists.length > 0 && ourList) {
      updateList(ourList);
      setIsLoading(false);
    }
  }, [lists, history, id]);

  useEffect(() => {
    document.title = title;
  }, [title])

  if (isLoading) return <Loader />
  return (
    <section className="p-5 mx-auto w-full max-w-screen-sm my-5">
      <h2>📝 Edit List</h2>
      <EditList list={list} stores={stores} handleUpdateList={handleUpdateList} />
    </section>
  )
}
