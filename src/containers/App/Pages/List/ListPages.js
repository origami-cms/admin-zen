import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {ResourceTable, Column} from 'components/ui';
import {ListHeader} from 'components/structure';

import actions from 'actions';
const {Pages: PageActions, App: AppActions} = actions;

class ListPages extends React.Component {
    async componentWillMount() {
        await this.getList();
    }

    get pages() {
        // console.log(this.props.pages);
        if (!this.props.pages.pages.length) return [];

        return this.props.pages.pages.asMutable({deep: true});
    }


    render() {
        return <div>
            <ListHeader resource="pages" length={this.pages.length} />
            <ResourceTable
                data={this.pages}
                onRowClick={r => this.open(r)}
            >
                <Column dataKey="url" />
                <Column dataKey="title" />
            </ResourceTable>
        </div>;
    }

    async getList() {
        await this.props.actions.pagesGet();
    }

    open(row) {
        this.props.actions.tabsNew(`/pages/${row.id}`);
        this.props.history.push(`/pages/${row.id}`);
    }
}

const matchStateToProps = state => ({
    pages: state.Pages
});

const matchDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        ...PageActions, ...AppActions
    }, dispatch)
});

export default connect(matchStateToProps, matchDispatchToProps)(ListPages);
