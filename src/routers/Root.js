import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setupTheme, buildLibrary } from '../actions';
import Drawer from './Drawer';
import { MATERIAL_DARK, DEEP_PURPLE, LIGHT_BLUE } from '../actions/types';

class Root extends Component {
	componentWillMount() {
		this.props.setupTheme(MATERIAL_DARK, DEEP_PURPLE, LIGHT_BLUE);
		this.props.buildLibrary();
	}

	render() {
		return <Drawer />;
	}
}

export default connect(null, { setupTheme, buildLibrary })(Root);
