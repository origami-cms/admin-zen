import API from 'lib/API/API';
import CODES from 'http-status-codes';


import {
    AUTH_LOADING_SET_VERIFYING,
    AUTH_LOADING_SET_LOGGINGIN,
    AUTH_CLEAR,
    AUTH_VERIFIED,
    AUTH_VERIFIED_FAILED,
    AUTH_LOGIN,
    AUTH_LOGIN_FAILED,
    AUTH_LOGOUT,

    ME_EMAIL_SET
} from 'actions/const';


export const login = (email, password) =>
    async dispatch => {
        dispatch({type: ME_EMAIL_SET, email});
        dispatch({type: AUTH_LOADING_SET_LOGGINGIN, loading: true});
        const {statusCode, message, data} = await API.post('/auth/login', {
            email, password
        });

        if (statusCode != CODES.OK) dispatch({type: AUTH_LOGIN_FAILED, message});
        else dispatch({type: AUTH_LOGIN, ...data});

        dispatch({type: AUTH_LOADING_SET_LOGGINGIN, loading: false});

        return data;
    };

export const verify = () =>
    async dispatch => {
        try {
            const {statusCode, data} = await API.get('/auth/verify');
            dispatch({type: AUTH_VERIFIED});

            return data.token;

        } catch (e) {
            if (e.code === CODES.UNAUTHORIZED) dispatch({type: AUTH_CLEAR});

            return false;
        }
    };

export const logout = () =>
    dispatch => dispatch({type: AUTH_LOGOUT});
