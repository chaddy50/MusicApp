import { PLAY, PAUSE, STOP, RESET } from '../actions/types';

const INITIAL_STATE = {
	isPlaying: false,
	isPaused: false,
	curSong: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case PLAY:
			return { ...state, isPlaying: true, curSong: action.payload };
		case PAUSE:
			return { ...state, isPlaying: false, isPaused: true };
		case STOP:
			return { ...state, isPlaying: false };
		case RESET:
			return { ...state, isPlaying: false };
		default:
			return state;
	}
};
