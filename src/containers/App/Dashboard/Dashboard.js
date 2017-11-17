import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import actions from 'actions';
const {App: AppActions} = actions;
import {Main} from 'components/structure';
import {TabLink} from 'components/ui';

export class Dashboard extends React.Component {

    render() {
        return <Main>
            {this.props.app.tabs.length}
            <TabLink to="/pages/0">Open page</TabLink>
        </Main>;
    }
}

const matchStateToProps = state => ({
    app: state.App
});

const matchDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        ...AppActions
    }, dispatch)
});

export default connect(matchStateToProps, matchDispatchToProps)(Dashboard);

