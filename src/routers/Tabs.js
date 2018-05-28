import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { TabNavigator } from 'react-navigation';
import _ from 'lodash';
import ArtistList from '../components/Artist/ArtistList';
import { buildLibrary } from '../actions';
import { PRIMARY, PRIMARY_DARK, SECONDARY, ON_PRIMARY, ON_PRIMARY_NO_FOCUS } from '../themes/PurpleTeal/PurpleTeal';

class Tabs extends Component {
	componentWillMount() {
		this.props.buildLibrary(this.props.navigation);
	}

	buildTabs() {
		const tabConfig = {
			tabBarOptions: {
				pressColor: SECONDARY,
				style: {
					backgroundColor: PRIMARY
				},
				indicatorStyle: {
					backgroundColor: SECONDARY
				},
				activeTintColor: ON_PRIMARY,
				inactiveTintColor: ON_PRIMARY_NO_FOCUS,
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
		return (
			<View style={{ flex: 1 }}>
				<StatusBar backgroundColor={PRIMARY_DARK} />
				{this.buildTabs()}
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	const { library } = state.libraryState;

	return { library };
};

export default connect(mapStateToProps, { buildLibrary })(Tabs);
