import immutable from 'seamless-immutable';

const intitialState = immutable({
    loggedIn: false
});

export default (state = intitialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}
