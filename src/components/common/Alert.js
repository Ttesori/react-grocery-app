import './css/Alert.css';
export default function Alert({ type, message }) {
  return (
    <div className={`alert ${type}`}>
      {message}
    </div>
  )
}
