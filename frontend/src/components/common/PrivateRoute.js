import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import {Spinner} from 'react-bootstrap';

const PrivateRoute = ({ component: Component, auth, ...rest}) => (
    <Route
    {...rest}
    render={props=> {
        if(auth.isLoading) {
            
            return <Spinner animation="grow" />
           
        } else if(!auth.isAuthenticated) {
            return <Redirect to='/login' />

        } else {
            return <Component {...props} />;
        }
        
    }}
    />
);

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute);