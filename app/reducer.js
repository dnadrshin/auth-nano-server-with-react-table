import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import {createForms} from 'react-redux-form';
import {initForm as recordInitForm} from './Records/Edit';
import {initForm as userInitForm} from './Users/Edit';
import {initForm as registrationInitForm} from './Registration';
import {initForm as loginInitForm} from './Login';
import tableReducer from './generic/Table/reducer';
import recordsRest from './Records/rest';
import reportsRest from './Reports/rest';
import usersRest from './Users/rest';

const
    reducers = {
        table: tableReducer,

        rest: combineReducers({
            ...recordsRest.reducers,
            ...usersRest.reducers,
            ...reportsRest.reducers,
        }),

        routing: routerReducer,

        ...createForms({
            record      : recordInitForm,
            user        : userInitForm,
            registration: registrationInitForm,
            login       : loginInitForm,
        }),
    };

export default combineReducers(reducers);
