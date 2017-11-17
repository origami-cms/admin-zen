import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Form from 'react-jsonschema-form';


import actions from 'actions';

export class EditPropertiesForm extends Component {
    render() {
        if (!this.props.schema.schema.required.length) return null;
        else return <div>
            <Form
                schema={this.props.schema.schema}
                uiSchema={this.props.schema.ui}
                formData={this.props.data}
                noHtml5Validate={true}
                showErrorList={false}
                onSubmit={this.save.bind(this)}
            />
        </div>;
    }

    save({formData}) {
        this.props.actions.pagesDataUpdate(this.props.id, formData);
    }
}

const mapStateToProps = state => ({});

const matchDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        ...actions.Pages
    }, dispatch)
});

export default connect(mapStateToProps, matchDispatchToProps)(EditPropertiesForm);
