import { Link, useLocation } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { ERROR_ALERT } from "../../global";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { forgotPassword } from "../../actions/auth";

const ForgotPassword = ({setAlert, forgotPassword}) => {
    const {state} = useLocation() 
    const {resetPasswordError} = state || false;
    useEffect(() => {
        window.history.replaceState({}, "")
        return () => resetPasswordError ? setAlert({msg: "Invalid token", type: ERROR_ALERT}) : null
    }, [""])

    const [formData, setEmail] = useState({
        email: "",
    })

    const {email} = formData
    const onChange = (e) => {
        setEmail({email: e.target.value})
    }

    const submitForm = async(e) => {
        e.preventDefault();
        forgotPassword(email)
    }
    return(
        <div className="section">
            <div className="row">
                <div className="container container--mini">
                    <h1 className="large text-primary text-center">Forgot Password</h1>
                    <form className="form" onSubmit={(e) => submitForm(e)}>
                        
                        <div className="form-group">
                            <label htmlFor="email">
                                Email
                                <span className="required">*</span>
                            </label>
                            <input 
                                type="email" 
                                placeholder="Email Address" 
                                name="email" 
                                value={email} 
                                onChange={onChange}
                                className="form-control"
                            />
                        </div>
                        <input type="submit" className="btn btn-success btn-block mb-4" value="Reset Password" />
                    </form>
                    <p className="small text-center text-gray-soft small mb-2">
                        Don't have account yet? <Link to="/sign-up">Register</Link>
                    </p>
                    <p className="small text-center text-gray-soft small mb-2">
                        Already have an account? <Link to="/login">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

ForgotPassword.propTypes = ({
    setAlert: PropTypes.func.isRequired,
    forgotPassword: PropTypes.func.isRequired
})

export default connect(null, { setAlert, forgotPassword })(ForgotPassword)

