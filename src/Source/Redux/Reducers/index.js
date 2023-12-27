import { combineReducers } from 'redux';
import baseurl from './baseurl';
import UserReducers from './UserReducers';
import CourseReducers from './CourseReducers';



const rootReducer = combineReducers({
   BaseURL: baseurl,
   User: UserReducers,
   Course: CourseReducers
});

export default rootReducer;