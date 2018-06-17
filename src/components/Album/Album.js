//#region Imports
import React, { Component } from 'react';
import { ScrollView, View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import Song from '../Song/Song';
//#endregion

//#region Album
class Album extends Component {
	state = {
		selectedAlbum: ''
	}

	render() {
		const { coverPath, name, year } = this.props;
		const { albumInfoContainerStyle, albumCoverStyle, albumTitleStyle, albumYearStyle } = styles;
		const { BACKGROUND, SEPARATOR, ON_BACKGROUND, ON_BACKGROUND_NOFOCUS } = this.props.theme;

		return (
			<ScrollView style={{ backgroundColor: BACKGROUND }}>
				<View style={[{ backgroundColor: BACKGROUND, borderColor: SEPARATOR }, albumInfoContainerStyle]}>
					<Image 
						source={coverPath}
						style={albumCoverStyle}
					/>
					<Text style={[{ color: ON_BACKGROUND }, albumTitleStyle]}>{name}</Text>
					<Text style={[{ color: ON_BACKGROUND_NOFOCUS }, albumYearStyle]}>{year}</Text>
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
		borderBottomWidth: 1,
		padding: 10
	},
	albumCoverStyle: {
		width: 150,
		height: 150,
		borderRadius: 15
	},
	albumTitleStyle: {
		fontSize: 18
	},
	albumYearStyle: {
		fontSize: 14
	}
};
//#endregion

//#region MapStateToProps
const mapStateToProps = (state, props) => {
	const { theme } = state.themeState;

	if (typeof (props.navigation) !== 'undefined') {
		return { ...props.navigation.state.params, theme };
	}
	return { theme };
};
//#endregion

export default connect(mapStateToProps)(withNavigation(Album));
