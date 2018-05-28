import _ from 'lodash';
import { RETRIEVE_LIBRARY, SET_CURRENT_LIST } from '../actions/types';

const INITIAL_STATE = {
	shouldBuildLibrary: true,
	library: {},
	currentList: []
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case RETRIEVE_LIBRARY:
			return { 
				...state,
				shouldBuildLibrary: false,
				library: _.map(action.payload.library, (value, name) => { return { value, name }; }) 
			};
		case SET_CURRENT_LIST:
			return {
				...state,
				currentList: action.payload
			};
		default:
			return state;
	}
};
