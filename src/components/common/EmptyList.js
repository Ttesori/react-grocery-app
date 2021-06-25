import './css/EmptyList.css';

export default function EmptyList({ children }) {
  return (
    <div className="empty-list">
      {children}
    </div>
  )
}
