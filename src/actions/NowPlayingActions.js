	import TrackPlayer from 'react-native-track-player';
import { PLAY, PAUSE, STOP, RESET } from './types';

export const songAction = (songList, songIndex) => {
	return (dispatch) => {
		const song = songList[songIndex].value;

		TrackPlayer.getState()
			.then((state) => {
				TrackPlayer.getCurrentTrack()
					.then((curTrack) => {
						if (state === TrackPlayer.STATE_PLAYING) {
							// A song is current playing
							
							if (curTrack === song.uri) {
								// Current song is the chosen song, pause
								pause(dispatch);
							} else {
								// Current song is not the chosen song, reset queue, add chosen song, and play
								reset();
								addTrackToList(songList, songIndex);
								play(dispatch);
							}
						} else {
							// A song is not currently playing

							if (curTrack === song.uri) {
								// Current song is the chosen song, play
								play(dispatch);
							} else {
								// Current song is not the chosen song, reset queue, add chosen song, and play
								reset(dispatch);
								addTrackToList(songList, songIndex);
								play(dispatch);
							}
						}
					})
				.catch(() => {
					// There is no current track, add chosen song and play
					addTrackToList(songList, songIndex);
					play(dispatch);
				});
			});
	};
};

const buildTrack = (song) => {
	const track = {
		id: song.uri,
		url: song.uri,
		title: song.title,
		artist: song.artist,
		album: song.album,
		genre: song.genre,
		cover: song.cover,
		year: song.year
	};

	return track;
};

export const playPauseAction = (song) => {
	return (dispatch) => {
		TrackPlayer.getState()
			.then((state) => {
				if (state === TrackPlayer.STATE_PLAYING) {
					pause(dispatch);
				} else {
					play(dispatch, song);
				}
			});
	};
};

const play = (dispatch) => {
	TrackPlayer.play();

	TrackPlayer.getCurrentTrack()
		.then((trackID) => {
			TrackPlayer.getTrack(trackID)
				.then((track) => {
					dispatch({
						type: PLAY,
						payload: track
					});
				});
		});
};

const pause = (dispatch) => {
	TrackPlayer.pause();

	dispatch({
		type: PAUSE,
		payload: null
	});
};

const reset = (dispatch) => {
	TrackPlayer.reset();

	dispatch({
		type: RESET,
		payload: null
	});
};

export const skipTrack = () => {
	return (dispatch) => {
		TrackPlayer.skipToNext()
			.catch(() => {}); // Catch case where there is no track to skip to

		TrackPlayer.getCurrentTrack()
			.then((trackID) => {
				TrackPlayer.getTrack(trackID)
					.then((track) => {
						dispatch({
							type: PLAY,
							payload: track
						});
					});
			});
	};
};

const addTrackToList = (songList, songIndex) => {
	for (let i = songIndex; i < songList.length; i++) {
		const track = buildTrack(songList[i].value);
		TrackPlayer.add(track);
	}
};
