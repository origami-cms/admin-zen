import React from 'react'; // eslint-disable-line
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from 'containers/Login';
import Actions from 'actions';

class Router extends React.Component {

    render() {
        return <BrowserRouter basename="/admin">
            <Switch>
                <Route path="/login" render={props => <Login {...props}/>}></Route>
            </Switch>
        </BrowserRouter>;
    }
}

const mapStateToProps = () => ({});

const matchDispatchToProps = dispatch => ({
    actions: bindActionCreators({}, dispatch)
});

export default connect(mapStateToProps, matchDispatchToProps)(Router);
