import { Fragment } from "react"

export const RadioInput = ({options, label, value = "", required = false, name, onChange}) => {
    let radioButtons = []
    for(const key in options){
        const {optionValue, label, disabled = false} = options[key]
        radioButtons.push(
            <div class="form-check form-check-inline">
                <input type="radio" name={name} value={optionValue} className="form-check-input" onChange={(e) => onChange(e)} checked={value === optionValue}  disabled={disabled}/>
                <label class="form-check-label" for="inlineCheckbox2">{label}</label>
            </div>
        )
    }
    return(
        <Fragment>
            radioButtons
        </Fragment>
    )
}