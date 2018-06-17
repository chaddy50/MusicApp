import { combineReducers } from 'redux';
import NowPlayingReducer from './NowPlayingReducer';
import LibraryReducer from './LibraryReducer';
import ThemeReducer from './ThemeReducer';

export default combineReducers({
	nowPlayingState: NowPlayingReducer,
	libraryState: LibraryReducer,
	themeState: ThemeReducer
});
