import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Form from 'react-jsonschema-form';

import {Button} from 'components/ui';
import actions from 'actions';

export class EditForm extends React.Component {
    constructor(props) {
        super(props);

        this.formSchema = {
            type: 'object',
            required: ['email', 'fname', 'lname'],
            properties: {
                email: {
                    type: 'string',
                    title: 'Email',
                    format: 'email'
                },
                fname: {
                    type: 'string',
                    title: 'First name'
                },
                lname: {
                    type: 'string',
                    title: 'Last name'
                }
            }
        };
    }

    render() {
        return (
            <div>
                <Form
                    schema={this.formSchema}
                    formData={this.props.user}
                    noHtml5Validate={true}
                    showErrorList={false}
                    onSubmit={this.save.bind(this)}
                    className="full-field-width"
                >
                    <Button color="success">Save</Button>
                </Form>
            </div>
        );
    }

    save({formData}) {
        this.props.actions.usersUpdate(formData.id, formData);
    }
}

const mapStateToProps = () => ({

});

const matchDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        ...actions.Users
    }, dispatch)
});

export default connect(mapStateToProps, matchDispatchToProps)(EditForm);
