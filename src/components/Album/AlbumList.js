//#region Imports
import React, { Component } from 'react';
import { ScrollView, ListView, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import _ from 'lodash';
import AlbumCard from './AlbumCard';
import defaultAlbumCover from '../../images/defaultAlbum.png';
//#endregion

//#region AlbumList
class AlbumList extends Component {
	render() {
		const { BACKGROUND } = this.props.theme;
		return (
			<ScrollView style={[{ backgroundColor: BACKGROUND }, styles.containerStyle]}>
				<ListView
					enableEmptySections
					dataSource={this.dataSource}
					renderRow={this.renderRow.bind(this)}
				/>
			</ScrollView>
		);
	}

	renderRow(album) {
		const { songList, year, name, coverPath } = this.getAlbumInfo(album);
		const { theme } = this.props;

		return (
			<TouchableHighlight 
				style={styles.touchableStyle}
				underlayColor={theme.SECONDARY}
				onPress={() => 
					this.props.navigation.navigate(
						'Album', 
						{ 
							songList, 
							name, 
							year,
							coverPath,
							theme 
						}
					)
				}
			>
				<AlbumCard 
					album={album} 
					songList={songList}
					name={name}
					year={year}
					coverPath={coverPath}
				/>	
			</TouchableHighlight>
		);
	}

	getAlbumInfo(album) {
		const songList = _.map(album.value, (value, name) => { return { value, name }; });
		const year = songList[0].value.year;
		const name = songList[0].value.album;
		const artist = songList[0].value.albumArtist;

		let coverPath = songList[0].value.cover;

		if (coverPath === '') {
			coverPath = defaultAlbumCover;
		} else {
			coverPath = { uri: coverPath };
		}

		return { songList, artist, year, name, coverPath };
	}

	componentWillMount() {
		this.createDataSource(this.props);
		
		const { theme } = this.props;
		this.props.navigation.setParams({ theme });
	}

	componentWillReceiveProps(nextProps) {
		this.createDataSource(nextProps);
	}

	// Create data source to use for ListView
	createDataSource({ albumList }) {
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});

		this.dataSource = ds.cloneWithRows(albumList);
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

//#region MapStateToProps
const mapStateToProps = (state, props) => {
	const { theme } = state.themeState;
	if (typeof (props.navigation) !== 'undefined') {
		// Sort album list by year
		const albumList = props.navigation.state.params.albumList.sort((a, b) => { 
			return a.value[Object.keys(a.value)[0]].year - b.value[Object.keys(b.value)[0]].year; 
		});

		// Make sure we've got our navigation parameters on this.props
		return { ...props, albumList, ...props.navigation.state.params, theme };
	}
	return { ...props, theme };
};
//#endregion

export default connect(mapStateToProps)(withNavigation(AlbumList));
