export default function Button({ icon, handleOnClick, children, className }) {
  const handleLocalOnClick = () => {
    handleOnClick();
  }

  return (
    <button className={`btn ${className}`} onClick={handleLocalOnClick}>
      {icon && <i className={icon}></i>}
      {children && children}
    </button>
  )
}
