export default function SelectList({ items, id, onChange, label, value }) {
  const localOnChange = (e) => {
    console.log(e.target.value);
    onChange(e);
  }
  return (
    <fieldset>
      <label className="form-label label-select">{label}</label>
      <select data-id={id} onChange={localOnChange} value={value}>
        {items && items.map((item, i) => (
          <option value={item.value} key={i}>{item.text}</option>
        ))}

      </select>
    </fieldset>

  )
}
