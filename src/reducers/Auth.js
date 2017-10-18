import immutable from 'seamless-immutable';

import {
    AUTH_LOADING_SET_VERIFYING,
    AUTH_LOADING_SET_LOGGINGIN,

    AUTH_CLEAR,
    AUTH_VERIFIED,
    AUTH_LOGIN,
    AUTH_LOGOUT
} from 'actions/const';

const LS_JWT = 'token';
const intitialState = immutable({
    loggedIn: false,
    token: localStorage.getItem(LS_JWT),
    loading: {
        verifying: false,
        loggingIn: false
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
            console.log(action);
            return state.merge({
                loggedIn: true,
                token: action.token
            })
        default:
            return state;
    }
}
