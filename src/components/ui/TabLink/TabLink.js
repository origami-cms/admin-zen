import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';

import actions from 'actions';
const {App: AppActions} = actions;


class HeaderTabs extends React.Component {
    render() {
        return <Link to={this.props.to} onClick={this.open.bind(this)}>
            {this.props.children}
        </Link>;
    }

    open() {
        this.props.actions.tabsNew(this.props.to);
    }
}

const mapStateToProps = state => ({
    tabs: state.App.tabs
});

const matchDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        ...AppActions
    }, dispatch)
});

export default withRouter(
    connect(mapStateToProps, matchDispatchToProps)(HeaderTabs)
);
