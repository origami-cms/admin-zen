import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import Form from 'react-jsonschema-form';


import actions from 'actions';

export class EditForm extends Component {
    constructor(props) {
        super(props);

        this.formSchema = {
            type: 'object',
            required: ['title', 'url'],
            properties: {
                title: {
                    type: 'string',
                    title: 'Title'
                },
                url: {
                    type: 'string',
                    title: 'Url'
                }
            }
        };
    }

    render() {
        return (
            <div>
                <Form
                    schema={this.formSchema}
                    formData={this.props.page}
                    noHtml5Validate={true}
                    showErrorList={false}
                    onSubmit={this.save.bind(this)}
                />
            </div>
        );
    }

    save({formData}) {
        this.props.actions.pagesUpdate(formData.id, formData);
    }
}

const mapStateToProps = state => ({

});

const matchDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        ...actions.Pages
    }, dispatch)
});

export default connect(mapStateToProps, matchDispatchToProps)(EditForm);
