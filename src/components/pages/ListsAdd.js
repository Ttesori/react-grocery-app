import AddList from "../lists/AddList"
import { useHistory } from "react-router-dom";
export default function ListsAdd({ stores, handleAddList }) {
  const history = useHistory();
  if (stores?.length === 0) {
    history.push('/stores')
  }
  return (
    <>
      <AddList stores={stores} handleAddList={handleAddList} />
    </>
  )
}
