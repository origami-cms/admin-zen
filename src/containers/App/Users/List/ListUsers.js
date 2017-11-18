import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {ResourceTable, Column} from 'components/ui';
import {ListHeader} from 'components/structure';

import actions from 'actions';
const {Users: UserActions, App: AppActions} = actions;

class ListUsers extends React.Component {
    async componentWillMount() {
        await this.getList();
    }

    get users() {
        return this.props.users.users.asMutable({deep: true});
    }


    render() {
        return <div>
            <ListHeader resource="users" length={this.users.length}/>
            <ResourceTable
                data={this.users}
                onRowClick={r => this.open(r)}
            >
                <Column dataKey="fname" heading="First name"/>
                <Column dataKey="lname" heading="Last name"/>
                <Column dataKey="email" />
            </ResourceTable>
        </div>;
    }

    async getList() {
        await this.props.actions.usersGet();
    }

    open(row) {
        this.props.actions.tabsNew(`/users/${row.id}`);
        this.props.history.push(`/users/${row.id}`);
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
