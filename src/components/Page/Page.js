import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import actions from 'actions';

class Page extends React.Component {
    componentWillMount() {
        if (this.props.auth.token) this.props.actions.verify();
    }
    render() {
        return <div className="page">
            {this.props.children}
        </div>
    }
}

const matchStateToProps = state => ({
    auth: state.Auth
});

const matchDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        verify: actions.Auth.verify
    }, dispatch)
});

export default connect(matchStateToProps, matchDispatchToProps)(Page);
