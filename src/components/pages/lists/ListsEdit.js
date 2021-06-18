import { useParams, useHistory } from "react-router";
import { useEffect, useState } from "react";
import EditList from "../../lists/EditList";
import Container from '../../common/Container';

export default function ListsEdit({ stores, lists, handleUpdateList }) {
  const { id } = useParams();
  let history = useHistory();
  const [isLoading, updateIsLoading] = useState(true);
  const [list, updateList] = useState([]);
  useEffect(() => {
    const ourList = lists.find(list => list.id === id);
    if (lists && !ourList) {
      return history.push('/lists')
    }
    if (lists.length > 0 && ourList) {
      updateList(ourList);
      updateIsLoading(false);
    }
  }, [lists, history, id])
  return (!isLoading &&
    <Container>
      <h2>Edit Lists</h2>
      <EditList list={list} stores={stores} handleUpdateList={handleUpdateList} />
    </Container>
  )
}
