import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {ResourceTable, Column} from 'components/ui';
import {ListHeader, PageContent} from 'components/structure';

import actions from 'actions';
const {Users: UserActions, App: AppActions} = actions;

class ListUsers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: []
        };
    }

    async componentWillMount() {
        await this.getList();
    }

    get users() {
        return this.props.users.users.asMutable({deep: true});
    }


    render() {
        const error = this.users.length ? null : 'no-data';

        return <PageContent resource="user" error={error} loading={!this.props.users.loadedInitial}>
            <div className="wrapper">
                <ListHeader resource="users" data={this.users} selected={this.state.selected} />
                <ResourceTable
                    data={this.users}
                    onRowClick={r => this.open(r)}
                    onChange={this.updateButtons.bind(this)}
                >
                    <Column dataKey="fname" heading="First name"/>
                    <Column dataKey="lname" heading="Last name"/>
                    <Column dataKey="email" />
                </ResourceTable>
            </div>
        </PageContent>;
    }

    async getList() {
        await this.props.actions.usersGet();
    }

    open(row) {
        this.props.actions.tabsNew(`/users/${row.id}`);
        this.props.history.push(`/users/${row.id}`);
    }

    updateButtons(selected) {
        this.setState({selected});
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

export default connect(matchStateToProps, matchDispatchToProps)(ListUsers);
