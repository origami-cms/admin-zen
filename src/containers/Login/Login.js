import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import actions from 'actions';
// import {Page} from 'components';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
        console.log('here');
    }

    render() {
        return <form onSubmit={this.submit.bind(this)}>
            <input
                ref={i => this.inpEmail = i}
                name="email"
                placeholder="Email"
            />
            <input
                ref={i => this.inpPassword = i}
                name="password"
                type="password"
                placeholder="Password"
            />
            <input
                type="submit"
                value="Login"
            />
        </form>
    }

    submit(e) {
        e.preventDefault();
        this.props.actions.login(this.inpEmail.value, this.inpPassword.value);
        return false;
    }
}

const matchStateToProps = state => ({
});

const matchDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        login: actions.Login.login
    }, dispatch)
});

export default connect(matchStateToProps, matchDispatchToProps)(Login);
