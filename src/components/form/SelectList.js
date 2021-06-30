import './css/SelectList.css'
export default function SelectList({ items, id, onChange, label, value, name, sr_only, className }) {
  const localOnChange = (e) => {
    const selected = items.find(item => e.target.value === item.value);
    onChange(e, { value: selected.value, text: selected.text });
  }
  return (
    <fieldset className={className}>
      <label className={`form-label label-select ${sr_only ? 'sr-only' : ''}`} htmlFor={name}>{label}</label>
      <div className="form-select">
        <select data-id={id} id={name} onChange={localOnChange} value={value} >
          {items && items.map((item, i) => (
            <option value={item.value} key={i}>{item.text}</option>
          ))}

        </select>
        <span className="focus"></span>
      </div>
    </fieldset>

  )
}
