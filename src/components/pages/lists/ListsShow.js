import ShowList from '../../lists/ShowList';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Button from '../../common/Button';

export default function ListsShow({ title, lists, stores }) {
  const { id } = useParams();
  let history = useHistory();
  const [list, updateList] = useState([]);
  const [listStore, updateListStore] = useState([]);

  useEffect(() => {
    const newList = lists.find(list => list.id === id);
    updateList(newList);
    if (lists.length > 0 && !newList?.id) {
      return history.push('/lists');
    }
    updateListStore(stores.find(store => store.id === newList.store_id));
  }, [lists, stores, id, history])

  useEffect(() => {
    document.title = title;
  }, [title])

  return (
    <section className="p-5">
      <h2>{list?.name} at {listStore.name}</h2>
      <ShowList list={list} store={listStore} />
      <Button className="w-full btn-link text-sm error mt-5" icon="fas fa-arrow-left" handleOnClick={() => history.push('/dashboard')}> Back to Dashboard</Button>
    </section>
  )
}
