export const FileField = ({ placeholder="", name, value = "", onChange, multiple = false, inputClass = "", required = false, disabled=false}) => {
    return <input className={inputClass + " form-control"} type="file" placeholder={placeholder} name={name} value={value} onChange={(e) => onChange(e)} multiple={multiple} required={required}  disabled={disabled}/>
}