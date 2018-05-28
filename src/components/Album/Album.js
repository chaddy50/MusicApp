//#region Imports
import React, { Component } from 'react';
import { ScrollView, View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import Song from '../Song/Song';
import { DIVIDER } from '../../themes/PurpleTeal/PurpleTeal';
//#endregion

//#region Album
class Album extends Component {
	state = {
		selectedAlbum: ''
	}

	render() {
		const { coverPath, name, year } = this.props;
		const { albumInfoContainerStyle, albumCoverStyle, albumTitleStyle, albumYearStyle } = styles;

		return (
			<ScrollView>
				<View style={albumInfoContainerStyle}>
					<Image 
						source={coverPath}
						style={albumCoverStyle}
					/>
					<Text style={albumTitleStyle}>{name}</Text>
					<Text style={albumYearStyle}>{year}</Text>
				</View>
				{this.renderSongList()}
			</ScrollView>
		);
	}

	renderSongList() {
		const { songList } = this.props;

		return songList.map((song, index) => 
			<Song 
				key={song.value.uri}
				song={song.value}
				songList={songList}
				songIndex={index}
			/>
		);
	}
}
//#endregion

//#region Styles
const styles = {
	albumInfoContainerStyle: {
		alignItems: 'center',
		borderColor: DIVIDER,
		borderBottomWidth: 1,
		padding: 10
	},
	albumCoverStyle: {
		width: 150,
		height: 150,
		borderRadius: 15
	},
	albumTitleStyle: {
		color: 'black',
		fontSize: 18
	},
	albumYearStyle: {
		color: 'black',
		fontSize: 14
	}
};
//#endregion

//#region MapStateToProps
const mapStateToProps = (state, props) => {
	if (typeof (props.navigation) !== 'undefined') {
		return { ...props, ...props.navigation.state.params };
	}
	return { ...props };
};
//#endregion

export default connect(mapStateToProps)(withNavigation(Album));
