export const TextInput = ({type, placeholder, name, value, onChange, inputClass="", required = false, disabled = false}) => {
    return <input className={inputClass + " form-control"} type={type} placeholder={placeholder} name={name} value={value ?? ""} onChange={(e) => onChange(e)} required={required}  disabled={disabled}/>
}