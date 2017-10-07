import { combineReducers } from 'redux';
// import authReducer from './Auth/reducer';
import userReducer from './Users/reducer';

const
  reducers = {
    // auth: authReducer,
    users: userReducer,
  };

export default combineReducers(reducers);
