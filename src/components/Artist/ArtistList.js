//#region Imports
import React, { Component } from 'react';
import { ListView, View } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import Artist from './Artist';
//#endregion

//#region ArtistList
class ArtistList extends Component {
	render() {
		const background = this.props.theme.BACKGROUND;
		return (
			<View style={[{ backgroundColor: background }, styles.containerStyle]}>
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
//#endregion

//#region Styles
const styles = {
	containerStyle: {
		flex: 1
	}
};
//#endregion

const mapStateToProps = (state) => {
	const { theme } = state.themeState;

	return { theme };
}
export default connect(mapStateToProps)(ArtistList);
