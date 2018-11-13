import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import store from  './store/index';
import { HashRouter } from 'react-router-dom'
import AppOne from './components/AppOne';
//window.store = store;

render(    
        <Provider store={store}>
            <HashRouter>
                <AppOne />
            </HashRouter>
        </Provider>,
    document.getElementById('app')
);
