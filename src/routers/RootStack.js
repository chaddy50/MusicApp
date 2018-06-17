import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator, withNavigation } from 'react-navigation';
import AlbumList from '../components/Album/AlbumList';
import Album from '../components/Album/Album';
import GenreTabs from './GenreTabs';
import NowPlayingBar from '../components/NowPlaying/NowPlayingBar';

class Stack extends Component {
	componentWillMount() {
		// Load the theme into this.props.navigation for use in navigationOptions
		const { theme } = this.props;
		this.props.navigation.setParams({ theme });
	}

	render() {
		const marginBottom = this.props.marginBottom;
		const { BACKGROUND } = this.props.theme;
		
		return (
			<View style={{ flex: 1, backgroundColor: BACKGROUND }}>
				<View style={{ flex: 1, marginBottom }}>
					<RootStackNav />
				</View>
				<NowPlayingBar />
			</View>
		);
	}
}

export const RootStackNav = StackNavigator(
{
	Home: {
		screen: GenreTabs,
		navigationOptions: (props) => {
			const { theme } = props.navigation.state.params;

			if (theme) {
				return {
					headerStyle: {
						backgroundColor: 'black'
					}	
				};
			}
			return {};
		}
	},
	AlbumList: {
		screen: (props) =>
			<AlbumList
				{...props}
				rootNavigation={props.navigation}
			/>,
		navigationOptions: (props) => {
			const { theme, title } = props.navigation.state.params;

			if (theme) {
				return {
					headerStyle: {
						backgroundColor: theme.PRIMARY,
					},
					headerTintColor: theme.ON_PRIMARY,
					title	
				};
			}
			return {};
		}
	},
	Album: {
		screen: Album,
		navigationOptions: (props) => {
			const { theme, name } = props.navigation.state.params;

			if (theme) {
				return {
					headerStyle: {
						backgroundColor: theme.PRIMARY
					},
					headerTintColor: theme.ON_PRIMARY,
					title: name
				};
			}
			return {};
		}
	}
},	
	{
		initialRouteName: 'Home'
	}
);

const mapStateToProps = (state, props) => {
	const { isPlaying, isPaused } = state.nowPlayingState;
	const { theme } = state.themeState;

	let marginBottom = null;
	if (isPlaying || isPaused) {
		marginBottom = 75;
	}

	return { ...props, marginBottom, theme };
};

export default connect(mapStateToProps)(withNavigation(Stack));
