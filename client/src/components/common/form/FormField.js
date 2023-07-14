import { Fragment } from "react"
import { HIDDEN_INPUT, NUMBER_INPUT, FILE_INPUT, TEXT_AREA, TEXT_INPUT, SELECT_INPUT, RADIO_INPUT, CHECKBOX_INPUT, PASSWORD_INPUT, EMAIL_INPUT, DATE_INPUT, CUSTOM_ELEMENT } from "./types"
import { SelectInput, TextArea, TextInput, FileField, RadioInput } from "./InputFields"
import { FormGroup } from "./FormGroup"
import { CheckboxInput } from "./InputFields/CheckboxInput"
export const FormField = (field) => {
    let {groupClass, error = null, label, name} = field
    let childField = null
    switch(field.type){
        case HIDDEN_INPUT:
        case NUMBER_INPUT:
        case TEXT_INPUT:
        case PASSWORD_INPUT:
        case EMAIL_INPUT:
        case DATE_INPUT:
            childField = <TextInput {...field} />
            break;
        case FILE_INPUT:
            childField = <FileField {...field} />
            break;
        case TEXT_AREA:
            childField = <TextArea {...field} />
            break;
        case SELECT_INPUT:
            childField = <SelectInput {...field}/>
            break;
        case RADIO_INPUT:
            childField = <RadioInput {...field}/>
            break;
        case CHECKBOX_INPUT:
            childField = <CheckboxInput {...field}/>
            break;
        case CUSTOM_ELEMENT: 
            childField = field.element
            break
        default:
            childField = null
    }
    if(childField !== null){
        if (field.type === CUSTOM_ELEMENT){
            return childField
        }else{
            label = field.type === RADIO_INPUT || field.type === CHECKBOX_INPUT ? null : label
            return <FormGroup className={groupClass+ " form-group "+ (error? "error": "")} label= {label} error = {error} fieldName={name}>{childField}</FormGroup>
        }
    }
    else{
        return <Fragment></Fragment>
    }
}