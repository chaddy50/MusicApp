import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import AlbumList from '../components/AlbumList';
import Album from '../components/Album';
import Tabs from './Tabs';
import NowPlayingBar from '../components/NowPlayingBar';
import { ON_PRIMARY, SECONDARY, PRIMARY, BACKGROUND } from '../themes/PurpleTeal/PurpleTeal';

const styles = {
	headerStyle: {
		backgroundColor: PRIMARY
	},
	headerTitleStyle: {
		color: ON_PRIMARY
	}
};

const { headerStyle, headerTitleStyle } = styles;

export const RootStack = StackNavigator(
{
	Home: {
		screen: Tabs,
		navigationOptions: {
			header: null
		}
	},
	AlbumList: {
		screen: (props) =>
			<AlbumList
				{...props}
				rootNavigation={props.navigation}
			/>,
		navigationOptions: (props) => ({
			headerStyle,
			headerTitleStyle,
			title: props.navigation.getParam('title'),
			headerTintColor: ON_PRIMARY,
			headerPressColorAndroid: SECONDARY
		})
	},
	Album: {
		screen: Album,
		navigationOptions: (props) => ({
			headerStyle,
			headerTitleStyle,
			title: props.navigation.getParam('title'),
			headerTintColor: ON_PRIMARY,
			headerPressColorAndroid: SECONDARY
		})
	}
},	
	{
		initialRouteName: 'Home',
		cardStyle: {
			backgroundColor: BACKGROUND
		}
	}
);

class TabStack extends Component {
	render() {
		const marginBottom = this.props.marginBottom;
		
		return (
			<View style={{ flex: 1, backgroundColor: BACKGROUND }}>
				<View style={{ flex: 1, marginBottom }}>
					<RootStack />
				</View>
				<NowPlayingBar />
			</View>
		);
	}
}

const mapStateToProps = (state, props) => {
	const { isPlaying, isPaused } = state.nowPlayingState;

	let marginBottom = null;
	if (isPlaying || isPaused) {
		marginBottom = 75;
	}

	return { ...props, marginBottom };
};

export default connect(mapStateToProps)(TabStack);
