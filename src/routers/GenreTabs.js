import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { TabNavigator } from 'react-navigation';
import _ from 'lodash';
import ArtistList from '../components/Artist/ArtistList';

class GenreTabs extends Component {
	buildTabs() {
		const { theme } = this.props;
		const tabConfig = {
			tabBarOptions: {
				pressColor: theme.SECONDARY,
				style: {
					backgroundColor: theme.PRIMARY
				},
				indicatorStyle: {
					backgroundColor: theme.SECONDARY
				},
				activeTintColor: theme.ON_PRIMARY,
				inactiveTintColor: theme.ON_PRIMARY_NOFOCUS,
				scrollEnabled: true,
				tabStyle: {
					width: 115
				}
			},
			lazy: false
		};

		if (this.props.library && this.props.library.length > 0) {
			const routeConfigs = {};
			for (let i = 0; i < this.props.library.length; i++) {
				routeConfigs[i] = { 
					screen: () => 
						<ArtistList
							artistList={_.map(this.props.library[i].value, (value, name) => { return { value, name }; })}
							rootNavigation={this.props.navigation}  
						/>,
					navigationOptions: { 
						title: this.props.library[i].name
					}
				};
			}

			const TabList = TabNavigator(routeConfigs, tabConfig);
			return <TabList screenProps={{ list: this.props.library }} />;
		}
		return <View />;
	}

	render() {
		const { theme } = this.props;
		return (
			<View style={{ flex: 1 }}>
				<StatusBar backgroundColor={theme.PRIMARY_DARK} />
				{this.buildTabs()}
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	const { library } = state.libraryState;
	const { theme } = state.themeState;

	return { library, theme };
};

export default connect(mapStateToProps)(GenreTabs);
