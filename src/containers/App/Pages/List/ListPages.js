import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {ResourceTable, Column, Button} from 'components/ui';
import {ListHeader, PageContent} from 'components/structure';

import actions from 'actions';
import ModalReorganisePage from './ModalReorganisePage';
const {Pages: PageActions, App: AppActions} = actions;

class ListPages extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: [],
            modalReorganise: false
        };
    }

    async componentWillMount() {
        await this.getList();
    }

    get pages() {
        if (!this.props.pages.pages.length) return [];

        return this.props.pages.pages.asMutable({deep: true});
    }


    render() {
        const error = this.pages.length ? null : 'no-data';

        return <PageContent resource="page" error={error} loading={!this.props.pages.loadedInitial}>
            <div className="wrapper">
                <ListHeader resource="pages" data={this.pages} selected={this.state.selected}>
                    {this.state.selected.length > 0 && <Button icon="reorganise" color="accent" onClick={() => this.setState(
                        {modalReorganise: true}
                    )} />}
                </ListHeader>
                <ResourceTable data={this.pages} onRowClick={r => this.open(r)} onChange={this.updateButtons.bind(this)}>
                    <Column dataKey="title" />
                    <Column dataKey="url" />
                </ResourceTable>
            </div>

            {this.state.modalReorganise &&
                <ModalReorganisePage
                    onClose={() => this.setState({modalReorganise: false})}
                    selected={this.state.selected}
                />
            }
        </PageContent>;
    }

    async getList() {
        await this.props.actions.pagesGet();
    }

    open(row) {
        this.props.actions.tabsNew(`/pages/${row.id}`);
        this.props.history.push(`/pages/${row.id}`);
    }

    updateButtons(selected) {
        this.setState({selected});
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
