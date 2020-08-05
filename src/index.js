import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  createStore, combineReducers,
} from 'redux';

import sidebarReducer from '@/services/redux/reducers/sidebar';
import { Routes } from './routes';

import 'normalize.css';
import './assets/styles/index.scss';

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
});

const store = createStore(rootReducer);

const app = (
  <Provider store={store}>
    <Routes />
  </Provider>
);

ReactDOM.render(app, document.getElementById('app'));
