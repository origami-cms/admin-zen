import API from 'lib/API/API';


import {
    AUTH_LOADING_SET_VERIFYING,
    AUTH_LOADING_SET_LOGGINGIN,
    AUTH_CLEAR,
    AUTH_VERIFIED,
    AUTH_VERIFIED_FAILED,
    AUTH_LOGIN,
    AUTH_LOGIN_FAILED
} from 'actions/const';


export const login = (email, password) =>
    async dispatch => {
        dispatch({type: AUTH_LOADING_SET_LOGGINGIN, loading: true});
        const {status, message, data} = await API.post('/auth/login', {
            email, password
        });

        if (status != 200) dispatch({type: AUTH_LOGIN_FAILED, message});
        else dispatch({type: AUTH_LOGIN, ...data});

        dispatch({type: AUTH_LOADING_SET_LOGGINGIN, loading: false});
        return res;
    };

export const verify = () =>
    async dispatch => {
        const {status, data} = await API.post('/auth/verify');

        if (status != 200) {
            dispatch({type: AUTH_CLEAR});

            return false;
        } else {
            dispatch({type: AUTH_VERIFIED});

            return data.token;
        }
    };
