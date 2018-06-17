const INITIAL_STATE = {
	theme: {}
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'set_theme':
            return { ...state, theme: action.payload };
		default:
			return state;
	}
};
