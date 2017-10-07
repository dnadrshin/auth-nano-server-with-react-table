import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducer';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Users from './Users'

const logger = createLogger({});

const
    store = createStore(reducer, applyMiddleware(thunk, logger));

const
    App = () => <div><Users /></div>;

ReactDOM.render(<Provider store={store}><App /></Provider>, document.querySelector('#root'));
