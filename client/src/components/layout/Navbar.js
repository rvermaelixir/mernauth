import { Fragment } from "react"
import Alert from "./Alert"
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import { logout } from "../../actions/auth"
const Navbar = ({isAuthenticated, logout}) => {
    const signedOutMenu = 
        <Fragment>
            <li className="nav-item">
                <a className="nav-link" href='/login'> Login </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href='/sign-up'> Register </a>
            </li>
        </Fragment>
    
    const signedInMenu = 
        <li className="nav-item">
            <button className="nav-link" onClick={logout}> logout </button>
        </li>
    return(
        <Fragment>
            <Alert />
            <nav className="navbar">
                {/* <div className="right-nav"> */}
                   <ul className="navbar-nav d-none d-lg-flex ml-2 order-3  block-navbar">
                   {(isAuthenticated)? signedInMenu : signedOutMenu}
                       
                    </ul>
                {/* </div> */}
            </nav>
        </Fragment>
    )
}

Navbar.propTypes = {
    isAuthenticated: PropTypes.bool,
    logout: PropTypes.func.isRequired   
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {logout})(Navbar)