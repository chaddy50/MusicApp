import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setupTheme } from '../actions';
import Drawer from './Drawer';

class Root extends Component {
	componentWillMount() {
		this.props.setupTheme('MATERIAL_DARK', 'DEEP_PURPLE', 'LIGHT_BLUE');
	}

	render() {
		return <Drawer />;
	}
}

export default connect(null, { setupTheme })(Root);
