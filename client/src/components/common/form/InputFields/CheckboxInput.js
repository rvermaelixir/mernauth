import { Fragment } from "react"

export const CheckboxInput = ({options, label, value = [], required = false, name, onChange, disabled = false}) => {
    let checkboxButtons = []
    for(const key in options){
        const {optionValue, label} = options[key]
        checkboxButtons.push(
            <div class="form-check form-check-inline">
                <input type="checkbox" name={name} value={optionValue} className="form-check-input" onChange={(e) => onChange(e)} checked={value.includes(optionValue)} disabled={disabled}/>
                <label class="form-check-label" for="inlineCheckbox2">{label}</label>
            </div>
        )
    }
    return(
        <Fragment>
            checkboxButtons
        </Fragment>
    )
}