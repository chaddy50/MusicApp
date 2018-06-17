//#region Imports
import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
//#endregion

//#region ArtistCard
class ArtistCard extends Component {
	render() {
		const { onPress, albumList, label } = this.props;
		const { SECONDARY, SEPARATOR, ON_BACKGROUND, ON_BACKGROUND_NOFOCUS } = this.props.theme;

		const numAlbums = albumList.length;
		const albumLabel = this.getAlbumLabel(numAlbums);

		const numSongs = this.getNumberOfSongs(albumList);
		const songLabel = this.getSongLabel(numSongs);

		return (
			<TouchableOpacity 
				style={[{ borderColor: SEPARATOR }, styles.cardStyle]} 
				onPress={onPress}
			>
				<View style={{ flex: 1 }}>
					<View style={styles.artistNameContainerStyle}>
						<Text style={{ color: ON_BACKGROUND }}>{label}</Text>
					</View>
					<View style={styles.artistInfoContainerStyle}>
						<Text style={{ color: ON_BACKGROUND_NOFOCUS }}>{`${numAlbums} ${albumLabel}`}</Text>
						<Text style={{ color: ON_BACKGROUND_NOFOCUS }}> - </Text>
						<Text style={{ color: ON_BACKGROUND_NOFOCUS }}>{`${numSongs} ${songLabel}`}</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	}

	getNumberOfSongs(albumList) {
		let numSongs = 0;
		for (const album of albumList) {
			const albumArray = _.map(album.value, (value, name) => { return { value, name }; });
			
			numSongs += albumArray.length;
		}

		return numSongs;
	}

	getAlbumLabel(numAlbums) {
		if (numAlbums <= 1) {
			return 'album';
		}
		return 'albums';
	}

	getSongLabel(numSongs) {
		if (numSongs <= 1) {
			return 'song';
		}
		return 'songs';
	}
}
//#endregion

//#region Styles
const styles = {
	cardStyle: {
		padding: 15,
        borderBottomWidth: 1
	},
	artistNameContainerStyle: {
		alignItems: 'center'
	},
	artistInfoContainerStyle: {
		flexDirection: 'row',
		justifyContent: 'center'
	}
};
//#endregion

const mapStateToProps = (state) => {
	const { theme } = state.themeState;

	return { theme };
}
export default connect(mapStateToProps)(ArtistCard);
