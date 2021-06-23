import ShowList from '../../lists/ShowList';
import Container from '../../common/Container';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

export default function ListsShow({ title, lists, stores }) {
  const { id } = useParams();
  let history = useHistory();
  const [list, updateList] = useState([]);
  const [isLoading, updateIsLoading] = useState(true);
  const [listStore, updateListStore] = useState([]);

  useEffect(() => {
    const newList = lists.find(list => list.id === id);
    updateList(newList);
    if (lists.length > 0 && !newList?.id) {
      return history.push('/lists');
    }
    updateListStore(stores.find(store => store.id === newList.store_id));
    if (newList?.id) {
      updateIsLoading(false)
    }
  }, [lists, stores, id, history])

  useEffect(() => {
    document.title = title;
  }, [title])

  return (!isLoading &&
    <Container>
      <h2>{list?.name} at {listStore.name}</h2>
      <ShowList list={list} store={listStore} />
    </Container>
  )
}
