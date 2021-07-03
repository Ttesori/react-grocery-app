import './css/InputText.css';
import { useEffect, useRef } from "react";
export default function InputText({ label, id, placeholder, className, handleChange, value, isValid, invalidText, type, required, focused }) {
  const field = useRef();
  const localHandleChange = (e) => {
    handleChange(field.current.value);
  }
  useEffect(() => {
    field.current.value = value;
  }, [value]);

  useEffect(() => {
    if (focused) {
      setTimeout(() => {
        field.current.focus();
      }, 50);
    }
  }, [focused])

  return (
    <fieldset className={`fieldset ${className || ''}${!isValid ? 'is-invalid' : ''}`}>
      <label className="form-label" htmlFor={id}>{label}</label>
      <input className="form-control" type={type ? type : 'text'} id={id} placeholder={placeholder} onChange={localHandleChange} value={value} ref={field} required={required || false} />
      {!isValid && <span className="invalid-text">{invalidText}</span>}
    </fieldset>
  )
}
