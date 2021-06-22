import Button from "./Button";

export default function QuantityTool({ value, onQuantityChange, id }) {
  const localHandleQuantityChange = (newValue) => {
    if (newValue > 0) {
      onQuantityChange(id, newValue);
    }
  }
  return (
    <>
      <Button handleOnClick={() => localHandleQuantityChange(value - 1)}>-</Button>
      <span>{value}</span>
      <Button handleOnClick={() => localHandleQuantityChange(value + 1)}>+</Button>
    </>
  )
}
