import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router';


import ListUsers from './List';
import EditUser from './Edit';


class Users extends React.Component {
    render() {
        return <Switch>
            <Route path='/users/:userId' render={props => <EditUser {...props} />} />
            <Route path='/users/' render={props => <ListUsers {...props} />} />
        </Switch>;
    }
}

const matchStateToProps = state => ({
    users: state.Users
});

const matchDispatchToProps = dispatch => ({
    actions: bindActionCreators({
    }, dispatch)
});

export default connect(matchStateToProps, matchDispatchToProps)(Users);
