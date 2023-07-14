import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const CustomerRoute = ({children, auth: {isAuthenticated}}) => {
    const navigate = useNavigate()
    if(isAuthenticated){
        return children;
    }else{
        navigate("/login")
    }
}

CustomerRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth 
})

export default connect(mapStateToProps, null)(CustomerRoute)