import { FormField } from "./FormField"
export const FormComponent = ({fields, name = "", className = "", id = "", onSubmit = "", submitClass = "btn btn-success btn-block mb-4", submitLabel = "submit"}) => {
    let formFields = []

    for(const key in fields){
        const formField = fields[key]
        formFields.push(<FormField key={key} {...formField}/>)
    }
    

    return (
        <form name={name} className={"form "+className} id={id} onSubmit={(e) => onSubmit(e)}>
            {formFields}
            <input type="submit" className={submitClass} value={submitLabel}/>
        </form>
    )
}