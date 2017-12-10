import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import actions from 'actions';
import {PageContent, Main} from 'components/structure';
const {Pages: PageActions, App: AppActions} = actions;


import EditForm from './EditForm';


class EditPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            loading: true
        };
    }

    async componentWillMount() {
        // Get the page
        try {
            const res = await this.props.actions.pagesGet(this.id);
            if (!res) return this.error(404);
        } catch (e) {
            return this.error(e);
        }

        // Get the pages properties
        try {
            await this.props.actions.pagesPropertiesGet(this.id);
        } catch (e) {
            return this.error(e);
        }

        // Update the tab name
        this.props.actions.tabsName(this.props.location.pathname, this.page.title);
        this.setState({loading: false});
    }

    get id() {
        return this.props.match.params.pageId;
    }


    get page() {
        if (!this.props.pages.pages.length) return {};

        const page = this.props.pages.pages.find(p => p.id == this.id);

        return page ? page.asMutable({deep: true}) : null;
    }


    error(e) {
        return this.setState({error: e.code || e, loading: false});
    }


    render() {
        return <PageContent
            error={this.state.error}
            loading={this.state.loading}
            resource='page'
        >
            {/* <Sidebar>
                <Tab icon='page'>
                    <p> Test </p>
                </Tab>
                <Tab icon='settings'>
                    <p> Test 2</p>
                </Tab>
            </Sidebar> */}

            <Main title={`Edit ${this.page.title}`}>
                <a className="button" href={this.page.url} target="_blank"> Open page </a>
                <EditForm page={this.page} />
            </Main>
        </PageContent>;
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

export default connect(matchStateToProps, matchDispatchToProps)(EditPage);
