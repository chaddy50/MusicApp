//#region Imports
import React, { Component } from 'react';
import { 
	View, 
	Image, 
	Text, 
	TouchableWithoutFeedback, 
	Platform, 
	UIManager, 
	LayoutAnimation 
} from 'react-native';
import { connect } from 'react-redux';
import GestureRecognizer from 'react-native-swipe-gestures';
import { playPauseAction } from '../../actions/NowPlayingActions';
import defaultAlbumCover from '../../images/defaultAlbum.png';
import playIcon from '../../images/play_white.png';
import pauseIcon from '../../images/pause_white.png';
import { skipTrack } from '../../actions';
import { PRIMARY, ON_PRIMARY } from '../../themes/PurpleTeal/PurpleTeal';
import ProgressBar from './ProgressBar';
//#endregion

//#region NowPlayingBar
class NowPlayingBar extends Component {
	render() {
		const { coverPath, playPauseIcon, isPlaying, isPaused, song } = this.props;

		if (isPlaying || isPaused) {
			return (
				<GestureRecognizer onSwipeLeft={this.props.skipTrack}>
					<View style={styles.barContainerStyle}>
						<View style={{ flex: 1, height: 5, marginBottom: 5 }}>
							<ProgressBar />
						</View>
						<View style={{ flexDirection: 'row' }}>
							<View>
								<Image source={coverPath} style={styles.albumCoverStyle} />
							</View>
							<View style={styles.nowPlayingInfoStyle}>
								<Text numberOfLines={1} style={styles.trackTitleStyle}>{song.title}</Text>
								<Text numberOfLines={1} style={styles.trackArtistStyle}>{song.artist}</Text>
								<Text numberOfLines={1} style={styles.trackAlbumStyle}>{song.album}</Text>
							</View>
							<View style={styles.playPauseContainerStyle}>
								<TouchableWithoutFeedback onPress={this.props.playPauseAction}>
									<Image source={playPauseIcon} style={styles.playPauseIconStyle} />
								</TouchableWithoutFeedback>
							</View>
						</View>
					</View>
				</GestureRecognizer>
			);
		}

		return <View />; // Return empty view when bar should not be shown
	}

	componentWillUpdate() {
		if (Platform.OS === 'android') {
			UIManager.setLayoutAnimationEnabledExperimental(true);
		}
		LayoutAnimation.easeInEaseOut();
	}
}
//#endregion

//#region Styles
const styles = {
	barContainerStyle: {
		width: '100%', 
		backgroundColor: PRIMARY, 
		height: 80, 
		position: 'absolute', 
		bottom: 0,
		flex: 1,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 1,
		elevation: 10
	},
	albumCoverStyle: {
		width: 75,
		height: 75,
	},
	nowPlayingInfoStyle: {
		flex: 1, 
		alignItems: 'center', 
		justifyContent: 'center', 
		padding: 10
	},
	trackTitleStyle: {
		color: ON_PRIMARY
	},
	trackArtistStyle: {
		color: ON_PRIMARY
	},
	trackAlbumStyle: {
		color: ON_PRIMARY
	},
	playPauseContainerStyle: {
		alignItems: 'center', 
		justifyContent: 'center', 
		width: 75, 
		height: 75
	},
	playPauseIconStyle: {
		width: 50,
		height: 50
	}
};
//#endregion

//#region MapStateToProps
const mapStateToProps = (state, props) => {
	const { isPlaying, isPaused, curSong } = state.nowPlayingState;

	// Determine which icon to use for Play/Pause
	let playPauseIcon = '';
	if (isPlaying) {
		playPauseIcon = pauseIcon;
	} else {
		playPauseIcon = playIcon;
	}

	// Find the album cover path to use
	let coverPath = '';
	if (curSong !== null) {
		coverPath = curSong.cover;
		if (coverPath === '') {
			coverPath = defaultAlbumCover;
		} else {
			coverPath = { uri: coverPath };
		}
	}

	return { ...props, isPlaying, isPaused, playPauseIcon, coverPath, song: curSong };
};
//#endregion

export default connect(mapStateToProps, { playPauseAction, skipTrack })(NowPlayingBar);