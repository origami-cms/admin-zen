import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import Form from 'react-jsonschema-form';

import actions from 'actions';
import {Page} from 'components/structure';
import {Button} from 'components/ui';

import 'styles/login.scss';
import logo from 'images/logo.svg';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    get formSchema() {
        return {
            type: 'object',
            required: ['email', 'password'],
            properties: {
                email: {
                    type: 'string',
                    format: 'email',
                    title: 'Email',
                    default: this.props.me.email
                },
                password: {
                    type: 'string',
                    format: 'password',
                    title: 'Password'
                }
            }
        };
    }

    render() {
        const {loggingIn} = this.props.auth.errors;
        if (this.props.auth.loggedIn) return <Redirect to='/' />;

        return <Page name="login">
            <div className="center background-white padding-super rounded">
                <img src={logo} className="margin-v-super"/>
                <span className="color-error margin-b-small">{loggingIn}</span>
                <Form
                    className="full-field-width"
                    schema={this.formSchema}
                    noHtml5Validate={true}
                    showErrorList={false}
                    onSubmit={this.submit.bind(this)}
                ><Button>Login</Button></Form>
            </div>
        </Page>;
    }

    submit({formData: {email, password}}) {
        this.props.actions.login(email, password);
    }
}

const matchStateToProps = state => ({
    auth: state.Auth,
    me: state.Me
});

const matchDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        login: actions.Auth.login,
        verify: actions.Auth.verify
    }, dispatch)
});

export default connect(matchStateToProps, matchDispatchToProps)(Login);
