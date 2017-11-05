import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {Router, Route, browserHistory} from 'react-router';
import reducer from './reducer';
import Users from './Users';
import UsersEdit from './Users/Edit';
import Records from './Records';
import Reports from './Reports';
import RecordsEdit from './Records/Edit';
import App from './App';
import Registration from './Registration';

const
    logger = createLogger({}),
    store = createStore(reducer, applyMiddleware(thunk, logger, routerMiddleware(browserHistory)));

ReactDOM.render(
    <Provider store={store}>
        <Router history={syncHistoryWithStore(browserHistory, store)}>
            <Route path="/" component={App}>
                <Route path="/records" component={Records} />
                <Route path="/records/edit/:id" component={RecordsEdit} />
                <Route path="/reports" component={Reports} />
                <Route path="/users" component={Users} />
                <Route path="/users/edit/:id" component={UsersEdit} />
                <Route path="/registration" component={Registration} />
            </Route>
        </Router>
    </Provider>,

    document.querySelector('#root'));
