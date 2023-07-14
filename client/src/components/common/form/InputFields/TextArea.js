export const TextArea = ({ name, value = "", event, cols = "100", rows="10", inputClass = "", required= false, onChange, disabled = false}) => {
    return <textarea className={inputClass + " form-control"} name={name} value={value} event={event} cols={cols} rows={rows}  required={required} onChange={(e) => onChange(e)}  disabled={disabled}/>
}