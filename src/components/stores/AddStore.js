import { useState } from 'react';
import InputText from '../form/InputText';
export default function AddStore() {
  const [storeName, updateStoreName] = useState();
  const handleNameChange = (current) => {
    updateStoreName(current);
    console.log(storeName);
  }
  return (
    <>
      <form>
        <h3>Add A Store</h3>
        <InputText id={"store_name"} placeholder="Enter store name..." label="Store Name:" handleChange={handleNameChange} />
      </form>
    </>
  )
}
