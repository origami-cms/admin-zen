import 'styles/app.scss';

import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';


import Router from 'router';
import store from 'stores';

const node = document.getElementById('app');
ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <Router/>
        </Provider>
    </AppContainer>,
    node
);

if (module.hot) {
    module.hot.accept('./router', () => {
        const NextRouter = require('./router').default; // eslint-disable-line global-require

        ReactDOM.render(
            <AppContainer>
                <Provider store={store}>
                    <NextRouter/>
                </Provider>
            </AppContainer>,
            node
        );
    });
}
