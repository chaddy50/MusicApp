import React, { Component } from 'react';
import { ListView, View } from 'react-native';
import _ from 'lodash';
import Artist from './Artist';
import { BACKGROUND } from '../themes/PurpleTeal/PurpleTeal';

class ArtistList extends Component {
	render() {
		return (
			<View style={styles.containerStyle}>
				<ListView
					enableEmptySections
					dataSource={this.dataSource}
					renderRow={this.renderRow.bind(this)}
				/>
			</View>
		);
	}
	
	// Render each individual row of the ListView
	renderRow(artist, secID, rowID) {
		const { rootNavigation, artistList } = this.props;

		return ( 
			<Artist 
				artist={artist}
				rowID={rowID} 
				albumList={_.map(artistList[rowID].value, (value, name) => { return { value, name }; })}
				rootNavigation={rootNavigation} 
			/>
		);
	}

	componentWillMount() {
		// Create data source to use for ListView
		this.createDataSource(this.props);
	}
	
	componentWillReceiveProps(nextProps) {
		// Re-create data source for ListView when props change
		this.createDataSource(nextProps);
	}

	// Create data source to use for ListView
	createDataSource({ artistList }) {
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});

		this.dataSource = ds.cloneWithRows(artistList);
	}
}

const styles = {
	containerStyle: {
		backgroundColor: BACKGROUND,
		flex: 1
	}
};


export default ArtistList;
