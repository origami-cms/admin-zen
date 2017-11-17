import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {Jewel, Icon} from 'components/ui';

import HeaderTabs from './HeaderTabs';
import HeaderMe from './HeaderMe';

class Header extends React.Component {
    render() {
        return <header className="top">
            <HeaderTabs />
            <Jewel />
            <HeaderMe />
        </header>;
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
    connect(matchStateToProps, matchDispatchToProps)(Header)
);
