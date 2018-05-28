//#region Imports
import React, { Component } from 'react';
import { TouchableHighlight, Text, View } from 'react-native';
import _ from 'lodash';
import { DIVIDER, SECONDARY_DARK, ON_BACKGROUND, ON_BACKGROUND_SECONDARY } from '../../themes/PurpleTeal/PurpleTeal';
//#endregion

//#region ArtistCard
class ArtistCard extends Component {
	render() {
		const { onPress, albumList, label } = this.props;

		const numAlbums = albumList.length;
		const albumLabel = this.getAlbumLabel(numAlbums);

		const numSongs = this.getNumberOfSongs(albumList);
		const songLabel = this.getSongLabel(numSongs);

		return (
			<TouchableHighlight style={styles.cardStyle}underlayColor={SECONDARY_DARK} onPress={onPress}>
				<View style={{ flex: 1 }}>
					<View style={styles.artistNameContainerStyle}>
						<Text style={styles.labelStyle}>{label}</Text>
					</View>
					<View style={styles.artistInfoContainerStyle}>
						<Text style={styles.artistInfoStyle}>{`${numAlbums} ${albumLabel}`}</Text>
						<Text style={styles.artistInfoStyle}> - </Text>
						<Text style={styles.artistInfoStyle}>{`${numSongs} ${songLabel}`}</Text>
					</View>
				</View>
			</TouchableHighlight>
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
        borderBottomWidth: 1,
		borderColor: DIVIDER
	},
	labelStyle: {
		color: ON_BACKGROUND
	},
	artistNameContainerStyle: {
		alignItems: 'center'
	},
	artistInfoContainerStyle: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	artistInfoStyle: {
		color: ON_BACKGROUND_SECONDARY
	}
};
//#endregion

export default ArtistCard;
