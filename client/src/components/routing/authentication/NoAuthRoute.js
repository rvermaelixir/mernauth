import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const NoAuthRoute = ({children, auth: {isAuthenticated}}) => {
    const navigate = useNavigate()
    console.log("hello")
    if(isAuthenticated){
        navigate("/dashboard")
    }else{
        return children
    }
}

NoAuthRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth 
})

export default connect(mapStateToProps, null)(NoAuthRoute)