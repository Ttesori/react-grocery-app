
export default function SelectList({ items, id, onChange, label, value }) {
  const localOnChange = (e) => {
    const selected = items.find(item => e.target.value === item.value);
    onChange(e, { value: selected.value, text: selected.text });
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
