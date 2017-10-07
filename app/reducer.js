import { combineReducers } from 'redux';
// import authReducer from './Auth/reducer';
import userReducer from './Users/reducer';
import recordsReducer from './Records/reducer';
import tableReducer from './Table/reducer';

const
  reducers = {
    // auth: authReducer,
    records: recordsReducer,
    table: tableReducer,
    users: userReducer,
  };

export default combineReducers(reducers);
