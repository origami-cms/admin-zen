import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import actions from 'actions';
import {PageContent, Main} from 'components/structure';
const {Users: UserActions, App: AppActions} = actions;

import EditForm from './EditForm';


class EditUser extends React.Component {
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
            `${this.user.fname} ${this.user.lname}`
        );

        this.setState({loading: false});
    }

    get id() {
        return this.props.match.params.userId;
    }


    get user() {
        if (!this.props.users.users.length) return {};

        return this.props.users.users.find(p => p.id == this.id).asMutable({deep: true});
    }


    error(e) {
        return this.setState({error: e.code || e, loading: false});
    }


    render() {
        return <PageContent
            error={this.state.error}
            loading={this.state.loading}
            resource='user'
        >
            <Main title={`Edit ${this.user.fname} ${this.user.lname}`}>
                <EditForm user={this.user} />
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

export default connect(matchStateToProps, matchDispatchToProps)(EditUser);
