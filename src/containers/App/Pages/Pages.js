import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router';


import ListPages from './List';
import EditPage from './Edit';
import CreatePage from './Create';


class Pages extends React.Component {
    render() {
        return <Switch>
            <Route path='/pages/create' render={props => <CreatePage {...props} />} />
            <Route path='/pages/:pageId' render={props => <EditPage {...props} />} />
            <Route path='/pages/' render={props => <ListPages {...props} />} />
        </Switch>;
    }
}

const matchStateToProps = state => ({
    pages: state.Pages
});

const matchDispatchToProps = dispatch => ({
    actions: bindActionCreators({
    }, dispatch)
});

export default connect(matchStateToProps, matchDispatchToProps)(Pages);
