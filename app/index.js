import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducer';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { combineForms } from 'react-redux-form';
import Users from './Users';
import Records from './Records';
import RecordsForm from './Records/Edit';

const logger = createLogger({});

const
    store = createStore(reducer, applyMiddleware(thunk, logger)),
    App = () => <RecordsForm />;

    console.log(store.getState())

ReactDOM.render(<Provider store={store}><App /></Provider>, document.querySelector('#root'));
