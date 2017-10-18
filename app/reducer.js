import { combineReducers } from 'redux';
// import authReducer from './Auth/reducer';
import userReducer from './Users/reducer';
import recordsReducer from './Records/reducer';
import {initForm as recordInitForm} from './Records/Edit';
import {initForm as userInitForm} from './Users/Edit';
import {initForm as registrationInitForm} from './Registration';
import {initForm as loginInitForm} from './Login';
import tableReducer from './Table/reducer';
import {createForms, combineForms} from 'react-redux-form';
import recordsRest from './Records/rest';
import usersRest from './Users/rest';
import {routerReducer} from 'react-router-redux';

const
    reducers = {
        // auth: authReducer,
        table: tableReducer,

        rest: combineReducers({
            ...recordsRest.reducers,
            ...usersRest.reducers,
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
