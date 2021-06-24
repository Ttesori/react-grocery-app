import './css/Alert.css';
export default function Alert({ type, message }) {
  return (
    <div className={`alert ${type}`}>
      <strong>{type.toUpperCase()}: </strong>
      {message}
    </div>
  )
}
