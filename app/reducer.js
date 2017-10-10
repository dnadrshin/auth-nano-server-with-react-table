import { combineReducers } from 'redux';
// import authReducer from './Auth/reducer';
import userReducer from './Users/reducer';
import recordsReducer from './Records/reducer';
import {initForm as recordInitForm} from './Records/Edit';
import {initForm as registrationInitForm} from './Registration';
import {initForm as loginInitForm} from './Login';
import tableReducer from './Table/reducer';
import { createForms, combineForms } from 'react-redux-form';
import recordsRest from './Records/rest';

const
  reducers = {
    // auth: authReducer,
    records: recordsReducer,
    table: tableReducer,
    users: userReducer,
    rest: combineReducers(recordsRest.reducers),

    ...createForms({
        record: recordInitForm,
        registration: registrationInitForm,
        login : loginInitForm,
    }),
  };

export default combineReducers(reducers);
