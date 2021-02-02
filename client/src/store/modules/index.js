import { combineReducers } from 'redux';
import user from './user';
import gnbmenu from './gnbmenu';

const rootReducer = combineReducers({
  user,
  gnbmenu,
});

export default rootReducer;
