import EditList from "../../lists/EditList";
import Container from '../../common/Container';
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
export default function ListsAdd({ stores, handleAddList }) {
  const history = useHistory();
  const [isLoading, updateIsLoading] = useState(true);

  useEffect(() => {
    if (stores.length > 0) {
      return updateIsLoading(false);
    }
    if (stores && stores.length === 0) {
      return history.push('/stores')
    }
  }, [stores, history])
  return (!isLoading &&
    <Container>
      <EditList
        stores={stores}
        handleUpdateList={handleAddList}
        list={({
          name: 'New List',
          store_id: stores[0].id,
          items: []
        })} />
    </Container>
  )
}
