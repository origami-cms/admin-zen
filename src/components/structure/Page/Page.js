import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classname from 'classname';
import {Redirect, withRouter} from 'react-router';

import actions from 'actions';

class Page extends React.Component {
    componentWillMount() {
        if (this.props.auth.token) this.props.actions.verify();
        else this.props.actions.logout();
    }
    render() {
        const {loading, token} = this.props.auth;
        const {error} = this.props;

        if (!loading.verifying && !token && this.props.location.pathname != '/login') {
            return <Redirect to='/login' />;
        }
        const classes = {
            page: true,
            cover: true,
        };
        if (this.props.name) classes[this.props.name] = true;

        return <div className={classname(classes, this.props.className)}>
            {error || this.props.children}
        </div>;
    }
}

const matchStateToProps = state => ({
    auth: state.Auth
});

const matchDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        verify: actions.Auth.verify,
        logout: actions.Auth.logout
    }, dispatch)
});

export default withRouter(
    connect(matchStateToProps, matchDispatchToProps)(Page)
);
