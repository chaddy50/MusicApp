import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { TabNavigator } from 'react-navigation';
import _ from 'lodash';
import ArtistList from '../components/ArtistList';
import { buildLibrary } from '../actions';

class Tabs extends Component {
	componentWillMount() {
		this.props.buildLibrary(this.props.navigation);
	}

	buildTabs() {
		const tabConfig = {
			tabBarOptions: {
				pressColor: '#9900CC',
				style: {
					backgroundColor: '#404040'
				},
				indicatorStyle: {
					backgroundColor: '#9900CC'
				},
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
