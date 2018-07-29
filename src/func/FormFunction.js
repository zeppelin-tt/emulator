import {connect} from 'react-redux'

function mapDispatchToProps(dispatch) {
    return {
        submitButtonClicked : (payload) => dispatch(getPublicKeyLogin(payload)),
    }
}
