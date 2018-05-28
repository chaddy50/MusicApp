import { combineReducers } from 'redux';
import NowPlayingReducer from './NowPlayingReducer';
import LibraryReducer from './LibraryReducer';

export default combineReducers({
	nowPlayingState: NowPlayingReducer,
	libraryState: LibraryReducer
});
