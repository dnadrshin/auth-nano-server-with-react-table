import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Header from './Header';

const
    App = props => <x-section>
        123
    </x-section>;

export default props => <Router history={props.history}>
        <Route path="/" component="App">
            <IndexRoute path="/" />
            <Route path="/records" component="Records" />
            <Route path="/records/edit" />
            <Route path="/users" component="Users" />
        </Route>
    </Router>;
