import React from 'react';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
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
                },
                password: {
                    type: 'string',
                    title: 'Password',
                    format: 'password'
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
                    onSubmit={this.create.bind(this)}
                    className="full-field-width"
                >
                    <Button color="success">Create</Button>
                </Form>
            </div>
        );
    }

    async create({formData}) {
        const u = await this.props.actions.usersCreate(formData);
        this.props.history.push(`/users/${u.id}`);
    }
}

const mapStateToProps = () => ({

});

const matchDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        ...actions.Users
    }, dispatch)
});

export default withRouter(
    connect(mapStateToProps, matchDispatchToProps)(EditForm)
);
