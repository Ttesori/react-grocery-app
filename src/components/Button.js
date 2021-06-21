export default function Button({ icon, handleOnClick, children, className, id }) {
  const handleLocalOnClick = (e) => {
    e.preventDefault();
    handleOnClick(e, id);
  }

  return (
    <button className={`btn ${className}`} onClick={handleLocalOnClick}>
      {icon && <i className={icon}></i>}
      {children && children}
    </button>
  )
}
