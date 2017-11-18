import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';


class HeaderMe extends React.Component {
    render() {
        return <div className="user float-right">
            <span>{this.props.me.fname}</span>
        </div>;
    }
}

const matchStateToProps = state => ({
    me: state.Me
});

const matchDispatchToProps = dispatch => ({
    actions: bindActionCreators({
    }, dispatch)
});

export default withRouter(
    connect(matchStateToProps, matchDispatchToProps)(HeaderMe)
);
