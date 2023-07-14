import { login } from "../../actions/auth";
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { FormComponent } from "../common/form/Form";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CUSTOM_ELEMENT } from "../common/form/types";
const Login = ({login}) => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const {
        email, password
    } = formData

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const submitForm = (e) => {
        e.preventDefault();
        login(formData)
    }

    const passwordField = <div className="form-group">
            <label htmlFor="email">
                Password
                <span className="required">*</span>
            </label>
            <Link className="form-sublink small text-center text-gray-soft" to="/forgot-password">Forgot password?</Link>
            <input 
                type="password" 
                placeholder="Password" 
                name="password" 
                value={password} 
                onChange={onChange}
                className="form-control"
            />
        </div>
        
    let formContent = {
        id: "loginform",
        onSubmit: submitForm,
        fields: {
            "email": {
                type: "email",
                name: "email",
                value: email,
                onChange: onChange,
                placeholder: "Email Address",
                groupClass: "group-class-email",
                inputClass: "input-class-email",
                label: "Email",
            },
            "password": {
                name: "password",
                element: passwordField,
                type: CUSTOM_ELEMENT
                
            }
        },
        submitClass: "btn btn-form-submit btn-block mb-4",
        submitLabel: "Login"
    }


    return(
        <div className="section">
            <div className="row">
                <div className="container container--mini">
                    <h1 className="large text-primary text-center">Sign In</h1>
                    <FormComponent {... formContent} />
                    <p className="small text-center text-gray-soft">
                        Don't have account yet? <Link to="/sign-up">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired
}

export default connect(null, { login })(Login)
