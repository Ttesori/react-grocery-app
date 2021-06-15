export default function InputText({ label, id, placeholder, className, handleChange }) {
  const localHandleChange = (e) => {
    handleChange(e.target.value);
  }
  return (
    <fieldset className={className}>
      <label className="form-label" htmlFor={id}>{label}</label>
      <input className="form-control" type="text" id={id} placeholder={placeholder} onChange={localHandleChange} />
    </fieldset>
  )
}
