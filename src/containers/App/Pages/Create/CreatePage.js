import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Form from 'react-jsonschema-form';
import {upperFirst} from 'lodash';


import actions from 'actions';
import {PageContent, Main} from 'components/structure';
import {Loader, Button} from 'components/ui';


import {toForm} from './propertiesFormConverter';


class CreatePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formData: {}
        };
    }


    async componentWillMount() {
        await this.props.actions.templatesGet();
    }

    get template() {
        if (!this.state.formData.template) return undefined;

        return this.props.templates.templates
            .find(t => t.name == this.state.formData.template.toLowerCase())
            .asMutable({deep: true});
    }

    get formSchemaTemplate() {
        const templates = this.props.templates.templates.map(t => t.name);
        const {template = {}} = this;
        let data = {};

        if (template.config) {
            data = {
                type: 'object',
                title: 'Template details',
                properties: toForm(template.config.properties).schema.properties
            };
        }

        return {
            type: 'object',
            required: ['title', 'url', 'template'],
            properties: {
                title: {
                    type: 'string',
                    title: 'Title'
                },
                url: {
                    type: 'string',
                    title: 'Url'
                },
                template: {
                    title: 'Template',
                    type: 'string',
                    enum: templates.map(t => upperFirst(t.replace(/-/g, ' ')))
                },
                data
            }
        };
    }

    render() {
        const {loading} = this.props.templates;

        return <PageContent resource="page">
            <Main title="Create a page">
                <Form
                    className="full-field-width"
                    schema={this.formSchemaTemplate}
                    noHtml5Validate={true}
                    showErrorList={false}
                    formData={this.state.formData}
                    onChange={this.updateTemplate.bind(this)}
                    onSubmit={this.submit.bind(this)}
                    ref={f => this.formTemplate = f}
                >
                    {this.template && <Button icon="add">Create page </Button>}
                    <span />
                </Form>
                {loading.single && <Loader />}
            </Main>
        </PageContent>;
    }

    updateTemplate({formData}) {
        if (formData.template) this.props.actions.templatesGet(formData.template);
        this.setState({formData});
    }

    async submit({formData}) {
        const data = {...formData};
        data.type = data.template.toLowerCase();
        delete data.template;
        const {id} = await this.props.actions.pagesCreate(data);

        this.props.history.push(`/pages/${id}`);
    }
}

const matchStateToProps = state => ({
    templates: state.Templates
});

const matchDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        ...actions.Templates, ...actions.Pages
    }, dispatch)
});

export default connect(matchStateToProps, matchDispatchToProps)(CreatePage);
