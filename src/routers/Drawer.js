import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DrawerNavigator, withNavigation } from 'react-navigation';
import RootStack from './RootStack';
import DrawerItem from './DrawerItem';
import ThemeSettings from '../components/Settings/ThemeSettings';

class Drawer extends Component {
	render() {
		return <DrawerNav />;
	}
}

export const DrawerNav = DrawerNavigator(
	{
		Home: {
			screen: RootStack
		},
		ThemeSettings: {
			screen: ThemeSettings,
			navigationOptions: {
				title: 'Theme'
			}
		}
	},
	{
		initialRouteName: 'Home',
		contentComponent: DrawerItem
	}
);

const mapStateToProps = (state, props) => {
	const theme = state.themeState.theme;

	return { ...props, theme };
};

export default connect(mapStateToProps)(withNavigation(Drawer));
