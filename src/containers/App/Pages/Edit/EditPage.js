import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import actions from 'actions';
import {PageContent, Main} from 'components/structure';
import {Sidebar, Tab} from 'components/ui';
const {Pages: PageActions, App: AppActions} = actions;

import EditForm from './EditForm';
import EditPropertiesForm from './EditPropertiesForm';
import {toForm} from './propertiesFormConverter';


class EditPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            loading: true
        };
    }

    async componentWillMount() {
        try {
            const res = await this.props.actions.pagesGet(this.id);
            if (!res) return this.error(404);
        } catch (e) {
            return this.error(e);
        }

        try {
            await this.props.actions.pagesPropertiesGet(this.id);
        } catch (e) {
            return this.error(e);
        }

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
            <Sidebar>
                <Tab icon='page'>
                    <p> Test </p>
                </Tab>
                <Tab icon='settings'>
                    <p> Test 2</p>
                </Tab>
            </Sidebar>

            <Main sidebar={true} title={`Edit ${this.page.title}`}>
                <EditForm page={this.page} />
                <EditPropertiesForm
                    schema={toForm(this.page.properties)}
                    data={this.page.data}
                    id={this.id}
                />
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
