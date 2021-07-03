import './css/Button.css';
export default function Button({ icon, handleOnClick, children, className, id, icon_color }) {
  const handleLocalOnClick = (e) => {
    e.preventDefault();
    handleOnClick(e, id);
  }

  return (
    <button className={`btn ${className}`} onClick={handleLocalOnClick}>
      {icon && <i className={`${icon} ${icon_color || ''}`}></i>}
      {children && children}
    </button>
  )
}
