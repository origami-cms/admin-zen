import immutable from 'seamless-immutable';

import {
    AUTH_LOADING_SET_VERIFYING,
    AUTH_LOADING_SET_LOGGINGIN,

    AUTH_CLEAR,
    AUTH_VERIFIED,
    AUTH_LOGIN,
    AUTH_LOGIN_FAILED,
    AUTH_LOGOUT
} from 'actions/const';

import {
    LS_JWT,
    LS_EMAIL
} from 'const';


const intitialState = immutable({
    loggedIn: false,
    token: localStorage.getItem(LS_JWT),
    loading: {
        verifying: false,
        loggingIn: false
    },
    errors: {
        loggingIn: null
    }
});

export default (state = intitialState, action) => {
    switch (action.type) {
        case AUTH_LOADING_SET_VERIFYING:
            return state.setIn(['loading', 'verifying'], action.loading);
        case AUTH_LOADING_SET_LOGGINGIN:
            return state.setIn(['loading', 'loggingIn'], action.loading);

        case AUTH_LOGOUT:
        case AUTH_CLEAR:
            localStorage.removeItem(LS_JWT);

            return state.merge({
                loggedIn: false,
                token: null
            });

        case AUTH_VERIFIED:
        case AUTH_LOGIN:
            const merging = {
                loggedIn: true
            };

            if (action.token) {
                localStorage.setItem(LS_JWT, action.token);
                localStorage.setItem(LS_EMAIL, action.email);
                merging.token = action.token;
            }

            return state.merge(merging);

        case AUTH_LOGIN_FAILED:
            return state.setIn(['errors', 'loggingIn'], action.message);
        default:
            return state;
    }
}
