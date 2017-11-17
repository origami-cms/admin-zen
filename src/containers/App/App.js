import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router';


import {Page, Header} from 'components/structure';
import actions from 'actions';
const {Me: MeActions} = actions;


import Dashboard from './Dashboard';
import Pages from './Pages';
import Users from './Users';

const routes = [
    {
        url: '/',
        component: Dashboard,
        exact: true
    },
    {
        url: '/pages',
        component: Pages
    },
    {
        url: '/users',
        component: Users
    }
];


class AppPage extends React.Component {
    componentDidMount() {
        this.props.actions.getMe();
    }
    render() {
        return <Page>
            <Header />
            <div className="content cover">
                <Switch>
                    {routes.map(r =>
                        <Route
                            key={r.url}
                            path={r.url}
                            exact={r.exact}
                            render={props =>
                                <r.component {...props} />
                            }
                        />
                    )}
                </Switch>
            </div>
        </Page>;
    }
}

const matchStateToProps = state => ({
});

const matchDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        ...MeActions
    }, dispatch)
});

export default connect(matchStateToProps, matchDispatchToProps)(AppPage);
