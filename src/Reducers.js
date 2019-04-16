import { combineReducers } from 'redux';
import AuthReducer from './reducers/AuthReducer';
import FeedReducer from './reducers/FeedReducer';
import ExploreReducer from './reducers/ExploreReducer';
import PhotoReducer from './reducers/PhotoReducer';
import ProfileReducer from './reducers/ProfileReducer';
import CameraReducer from './reducers/CameraReducer';

const Reducers = combineReducers({
	auth:AuthReducer,
	feed:FeedReducer,
	explore:ExploreReducer,
	photo:PhotoReducer,
	profile:ProfileReducer,
	camera:CameraReducer
});

export default Reducers;