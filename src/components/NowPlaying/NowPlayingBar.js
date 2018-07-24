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
import { Icon } from 'react-native-elements';
import { playPauseAction } from '../../actions/NowPlayingActions';
import defaultAlbumCover from '../../images/defaultAlbum.png';
import { skipTrack } from '../../actions';
import ProgressBar from './ProgressBar';
//#endregion

//#region NowPlayingBar
class NowPlayingBar extends Component {
	render() {
		const { coverPath, playPauseIcon, isPlaying, isPaused, song } = this.props;
		const { PRIMARY, ON_PRIMARY, ON_PRIMARY_NOFOCUS } = this.props.theme;

		if (isPlaying || isPaused) {
			return (
				<View style={[{ backgroundColor: PRIMARY }, styles.barContainerStyle]}>
					<View style={styles.progressBarContainerStyle}>
						<ProgressBar />
					</View>
					<GestureRecognizer onSwipeLeft={this.props.skipTrack}>
						<View style={{ flexDirection: 'row', borderTopWidth: 1, borderColor: '#1c1c1c' }}>
							<View>
								<Image source={coverPath} style={styles.albumCoverStyle} />
							</View>
							<View style={styles.nowPlayingInfoStyle}>
								<Text numberOfLines={1} style={{ color: ON_PRIMARY }}>{song.title}</Text>
								<Text numberOfLines={1} style={{ color: ON_PRIMARY_NOFOCUS }}>{song.artist}</Text>
								<Text numberOfLines={1} style={{ color: ON_PRIMARY_NOFOCUS }}>{song.album}</Text>
							</View>
							<View style={styles.playPauseContainerStyle}>
								<TouchableWithoutFeedback onPress={this.props.playPauseAction}>
									<Icon 
										name={playPauseIcon} 
										size={50} 
										color={ON_PRIMARY}
									/> 
								</TouchableWithoutFeedback>
							</View>
						</View>
					</GestureRecognizer>
				</View>
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
	progressBarContainerStyle: {
		flex: 1,
		height: 5,
		marginBottom: 5
	},
	barContainerStyle: {
		width: '100%', 
		height: 80, 
		position: 'absolute', 
		bottom: 0,
		flex: 1
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
	const { theme } = state.themeState;

	// Determine which icon to use for Play/Pause
	let playPauseIcon = '';
	if (isPlaying) {
		playPauseIcon = 'pause';
	} else {
		playPauseIcon = 'play-arrow';
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

	return { ...props, isPlaying, isPaused, playPauseIcon, coverPath, song: curSong, theme };
};
//#endregion

export default connect(mapStateToProps, { playPauseAction, skipTrack })(NowPlayingBar);
