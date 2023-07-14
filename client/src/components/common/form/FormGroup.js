import { Fragment } from "react"

export const FormGroup = ({label, error, className, children, fieldName}) => {
    return (
        <div className={(error? "error": "")+" form-group "+className}>
            {label?<label htmlFor={fieldName} className={error? "error": ""}>{label}</label>: <Fragment></Fragment>}
            {children}

            {error?<div className="invalid-feedback">{error}</div>:<Fragment></Fragment>}
        </div>
    )
}