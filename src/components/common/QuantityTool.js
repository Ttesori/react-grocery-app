import Button from "./Button";

export default function QuantityTool({ value, onQuantityChange, id }) {
  const localHandleQuantityChange = (newValue) => {
    if (newValue > 0) {
      onQuantityChange(id, newValue);
    }
  }
  return (
    <span className="flex items-center">
      <Button icon="fas fa-minus" className="btn-quantity hover:bg-red-500 hover:text-white" handleOnClick={() => localHandleQuantityChange(value - 1)} />
      <span className="px-2 text-sm font-semibold rounded">{value}</span>
      <Button icon="fas fa-plus" className="btn-quantity  hover:bg-secondary hover:text-white" handleOnClick={() => localHandleQuantityChange(value + 1)} />
    </span>
  )
}
