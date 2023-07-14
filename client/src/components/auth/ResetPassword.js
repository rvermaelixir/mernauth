import { useState ,useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import api from "../../api";
import { resetPassword } from "../../actions/auth";

const ResetPassword = ({resetPassword}) => {
    const {token} = useParams();
    const navigate = useNavigate();
    console.log(token);
    const emptyFormData = {
        password: "",
        confirmPassword: ""
    }
    const [formData, setFormData] = useState(emptyFormData)
    
    const {password, confirmPassword} = formData;


    const isUserValid = async () => {
        try {
          const res = await api.get(`/user/reset-password/${token}`);
          const data = res.data;
          if (data.status === 200) {
            console.log("Valid User");
          } else {
            // Redirect to forgot password page directly
            navigate('/forgot-password', {
                state: { resetPasswordError:true }
            });
          }
        } catch (error) {
          // Redirect to forgot password page directly
          navigate('/forgot-password',{
            state: { resetPasswordError:true }
          });
        }
      };

    const onChange = (e) => {
        //console.log(e.target.name);
        console.log(e.target.value);
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const submitForm = async (e) => {
        e.preventDefault();
        resetPassword({...formData, token});
        setFormData(emptyFormData);
    }
    useEffect(() => {
        return () => isUserValid();
    }, [""]);

    return(
        <div className="section">
            <div className="row">
                <div className="container container--mini">
                    <h1 className="large text-primary text-center">Reset Password</h1>
                    <form className="form" onSubmit={(e) => submitForm(e)}>
                        
                        <div className="form-group">
                            <label htmlFor="email">
                                New Password
                                <span className="required">*</span>
                            </label>
                            <input 
                                type="password" 
                                placeholder="New Password" 
                                name="password" 
                                value={password} 
                                onChange={onChange}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">
                                Confirm New Password
                                <span className="required">*</span>
                            </label>
                            <input 
                                type="password" 
                                placeholder="Confirm New Password" 
                                name="confirmPassword" 
                                value={confirmPassword} 
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

ResetPassword.propTypes = {
    resetPassword: PropTypes.func.isRequired
}

// export default connect(null, { register })(SignUp)

export default connect(null, {resetPassword})(ResetPassword);