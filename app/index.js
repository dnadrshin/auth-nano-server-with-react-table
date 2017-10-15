import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducer';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Users from './Users';
import UsersEdit from './Users/Edit';
import Records from './Records';
import RecordsEdit from './Records/Edit';
import Login from './Login';
import Header from './Header';
import Registration from './Registration';
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux';

const logger = createLogger({});

const
    store = createStore(reducer, applyMiddleware(thunk, logger, routerMiddleware(browserHistory))),
    history = syncHistoryWithStore(browserHistory, store);

    console.log(store.getState())

ReactDOM.render(
    <Provider store={store}>
        <Router history={syncHistoryWithStore(browserHistory, store)}>
            <Route path="/" component={Header}>
                <Route path="/records" component={Records} />
                <Route path="/records/edit/:id" component={RecordsEdit} />
                <Route path="/users" component={Users} />
                <Route path="/users/edit/:id" component={UsersEdit} />
                <Route path="/registration" component={Registration} />
            </Route>
        </Router>
    </Provider>,

    document.querySelector('#root'));
