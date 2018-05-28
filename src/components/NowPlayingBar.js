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
import { playPauseAction } from '../actions/NowPlayingActions';
import defaultAlbumCover from '../images/defaultAlbum.png';
import playIcon from '../images/play.png';
import pauseIcon from '../images/pause.png';
import { skipTrack } from '../actions';

class NowPlayingBar extends Component {
	render() {
		const { coverPath, playPauseIcon, isPlaying, isPaused, song } = this.props;

		if (isPlaying || isPaused) {
			return (
				<GestureRecognizer onSwipeLeft={this.props.skipTrack}>
					<View style={styles.barContainerStyle}>
						<View>
							<Image 
								source={coverPath} 
								style={styles.albumCoverStyle} 
							/>
						</View>
						<View style={styles.nowPlayingInfoStyle}>
							<Text numberOfLines={1} style={styles.trackTitleStyle}>{song.title}</Text>
							<Text numberOfLines={1} style={styles.trackArtistStyle}>{song.artist}</Text>
							<Text numberOfLines={1} style={styles.trackAlbumStyle}>{song.album}</Text>
						</View>
						<View style={styles.playPauseContainerStyle}>
							<TouchableWithoutFeedback onPress={() => this.props.playPauseAction(song)}>
								<Image
									source={playPauseIcon}
									style={styles.playPauseIconStyle}
								/>
							</TouchableWithoutFeedback>
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

const styles = {
	barContainerStyle: {
		width: '100%', 
		backgroundColor: '#404040', 
		height: 75, 
		position: 'absolute', 
		bottom: 0,
		borderColor: '#333333',
		borderTopWidth: 2,
		flex: 1,
		flexDirection: 'row'
	},
	albumCoverStyle: {
		width: 75,
		height: 75
	},
	nowPlayingInfoStyle: {
		flex: 1, 
		alignItems: 'center', 
		justifyContent: 'center', 
		padding: 10
	},
	trackTitleStyle: {
		color: 'white'
	},
	trackArtistStyle: {
		color: 'white'
	},
	trackAlbumStyle: {
		color: 'white'
	},
	playPauseContainerStyle: {
		alignItems: 'center', 
		justifyContent: 'center', 
		width: 75, 
		height: 75, 
		backgroundColor: '#404040'
	},
	playPauseIconStyle: {
		width: 50,
		height: 50
	}
};

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

export default connect(mapStateToProps, { playPauseAction, skipTrack })(NowPlayingBar);
