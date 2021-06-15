import { useEffect, useRef } from "react";
export default function InputText({ label, id, placeholder, className, handleChange, value, isValid, invalidText }) {
  const field = useRef();
  const localHandleChange = (e) => {
    handleChange(e.target.value);
  }
  useEffect(() => {
    field.current.value = value;
  }, [value])

  return (
    <fieldset className={`${className} ${!isValid ? 'is-invalid' : ''}`}>
      <label className="form-label" htmlFor={id}>{label}</label>
      <input className="form-control" type="text" id={id} placeholder={placeholder} onChange={localHandleChange} value={value} ref={field} />
      {!isValid && <span className="invalid-text">{invalidText}</span>}
    </fieldset>
  )
}
