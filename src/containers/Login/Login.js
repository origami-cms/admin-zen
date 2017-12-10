import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

import actions from 'actions';
import {Page} from 'components/structure';
import {Form} from 'components/ui';

import 'styles/login.scss';
import logo from 'images/logo.svg';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    get formSchema() {
        return [
            {
                type: 'email',
                name: 'email',
                placeholder: 'Email',
                icon: 'mail'
            },
            {
                name: 'password',
                type: 'password',
                placeholder: 'Password',
                icon: 'lock'
            },
            {
                type: 'submit',
                value: 'Login'
            }
        ];
    }

    render() {
        const {loggingIn} = this.props.auth.errors;
        if (this.props.auth.loggedIn) return <Redirect to='/' />;

        return <Page name="login">
            <div className="center background-white padding-super rounded">
                <img src={logo} className="margin-v-super"/>
                <Form
                    disabled={this.props.auth.loading.loggingIn}
                    className="full-field-width"
                    fields={this.formSchema}
                    onSubmit={this.submit.bind(this)}
                    error={loggingIn}
                    values={{email: this.props.me.email}}
                />
            </div>
        </Page>;
    }

    submit({email, password}) {
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
