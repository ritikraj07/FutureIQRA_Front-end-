import { combineReducers } from 'redux';
import baseurl from './baseurl';
import UserReducers from './UserReducers';
import CourseReducers from './CourseReducers';
import AdminReducers from './AdminReducers';



const rootReducer = combineReducers({
   BaseURL: baseurl,
   User: UserReducers,
   Course: CourseReducers,
   Admin: AdminReducers

});

export default rootReducer;