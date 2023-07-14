import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../../actions/user";
import { connect } from "react-redux";
import PropTypes from 'prop-types'
const SignUp = ({register}) => {
    const [formData, setFormData] = useState({
        name: "",
        dob: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const {
        name, dob, phone, email, password, confirmPassword
    } = formData

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const submitForm = (e) => {
        e.preventDefault();
        register(formData);
    }
    return(
        <div className="section">
            <div className="row">
                <div className="container container--mini">
                    <h1 className="large text-primary text-center">Sign Up</h1>
                    <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
                    <form className="form" onSubmit={(e) => submitForm(e)}>
                        <div className="form-group">
                            <label htmlFor="name">
                                Name
                                <span className="required">*</span>
                            </label>
                            <input 
                                type="text" 
                                placeholder="Name" 
                                name="name" 
                                required 
                                value={name} 
                                onChange={onChange}
                                className="form-control"
                            />
                        </div>
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
                        <div className="form-group">
                            <label htmlFor="phone">
                                Phone Number
                                <span className="required">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Phone Number"
                                name="phone"
                                minLength="6"
                                value={phone}
                                onChange = {onChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dob">
                                Date of birth
                                <span className="required">*</span>
                            </label>
                            <input
                                type="date"
                                name="dob"
                                minLength="6"
                                value={dob}
                                onChange = {onChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">
                                Password
                                <span className="required">*</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                minLength="6"
                                value= {password}
                                onChange = {onChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">
                                Confirm Password
                                <span className="required">*</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                minLength="6"
                                value={confirmPassword}
                                onChange = {onChange}
                                className="form-control"
                            />
                        </div>
                        <input type="submit" className="btn btn-success btn-block mb-4" value="Register" />
                    </form>
                    <p className="small text-center text-gray-soft">
                        Already have an account? <Link to="/login">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

SignUp.propTypes = {
    register: PropTypes.func.isRequired
}

export default connect(null, { register })(SignUp)
