import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { removeAlert } from '../../actions/alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
const Alert = ({alerts, removeAlert}) => {
    
    const alertsMessage = []
   
    alerts.forEach(alert => {
        alertsMessage.push(<p className={alert.type} key={alert.uuid}>
                {alert.msg}
                <button key={alert.uuid+"a"} onClick={() => removeAlert(alert.uuid)} ><FontAwesomeIcon icon={faClose} /></button>
            </p>
        )
    });
    return(
        <div className="alerts">
            {alertsMessage}
        </div>
    )
}

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
    removeAlert: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps, {removeAlert})(Alert)