export const SelectInput = ({name, inputClass = "", multiple = false, value = "", options = [], defaultLabel = null, required = false, onChange, disabled = false}) => {
    let optionsData = defaultLabel? [<option value="">{defaultLabel}</option>]: []
    options.forEach(({label = null, value}) => {
        optionsData.push(<option value={value}>{label ?? value}</option>)
    });
    <select multiple={multiple} className={inputClass + " form-control"} value={value} name={name}  required={required} onChange={(e) => onChange(e)}  disabled={disabled}>
        {optionsData}
    </select>
}