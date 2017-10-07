import { combineReducers } from 'redux';
// import authReducer from './Auth/reducer';
import userReducer from './Users/reducer';
import recordsReducer from './Records/reducer';

const
  reducers = {
    // auth: authReducer,
    records: recordsReducer,
    users: userReducer,
  };

export default combineReducers(reducers);
