import { combineReducers } from 'redux';
// import authReducer from './Auth/reducer';
import userReducer from './Users/reducer';
import recordsReducer from './Records/reducer';
import tableReducer from './Table/reducer';
import { createForms, combineForms } from 'react-redux-form';

const
  reducers = {
    // auth: authReducer,
    records: recordsReducer,
    table: tableReducer,
    users: userReducer,

    ...createForms({
        record: {email: '', date: '', distance: '', time: ''}
    }),
  };

export default combineReducers(reducers);
