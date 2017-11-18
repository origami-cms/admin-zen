import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import actions from 'actions';
import {PageContent, Main} from 'components/structure';
const {Users: UserActions, App: AppActions} = actions;

import CreateForm from './CreateForm';


class CreateUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            loading: true
        };
    }


    async componentWillMount() {
        try {
            const res = await this.props.actions.usersGet(this.id);
            if (!res) return this.error(404);
        } catch (e) {
            return this.error(e);
        }

        this.props.actions.tabsName(
            this.props.location.pathname,
            'Create user'
        );

        this.setState({loading: false});
    }

    get id() {
        return this.props.match.params.userId;
    }

    error(e) {
        return this.setState({error: e.code || e, loading: false});
    }


    render() {
        return <PageContent>
            <Main title='Create user'>
                <CreateForm />
            </Main>
        </PageContent>;
    }
}

const matchStateToProps = state => ({
    users: state.Users
});

const matchDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        ...UserActions, ...AppActions
    }, dispatch)
});

export default connect(matchStateToProps, matchDispatchToProps)(CreateUser);
