import firebase from 'firebase';
import RNMusicMetadata from 'react-native-music-metadata';
import RNFS from 'react-native-fs';
import { RETRIEVE_LIBRARY } from './types';

export const buildLibrary = () => {
	return (dispatch) => {
		RNFS.readDir('/sdcard/Music') 
			.then((dir) => {
				dir.forEach((entry) => {
					searchMusicDirectory(entry);
				});
			})
			.then(() => {
				firebase.database().ref('/MusicLibrary').once('value')
					.then((snapshot) => {
						dispatch({ 
							type: RETRIEVE_LIBRARY, 
							payload: { library: snapshot.val() } 
						});
					});
			})
			.catch(() => { console.log('Something went wrong building the library'); });
	};
};

const searchMusicDirectory = (dirResult) => {
	if (dirResult.isFile() && isAudioFile(dirResult)) {
		// BASE CASE: Once we have a file, add it to the database
		RNMusicMetadata.getMetadata([dirResult.path])
			.then((tracks) => {
				tracks.forEach((track) => {
					addSong(track, dirResult);
				});
			});
	} else if (dirResult.isDirectory()) {
		// Search through directory recursively until we find a file
		RNFS.readDir(dirResult.path)
			.then((dir) => {
				dir.forEach((entry) => {
					searchMusicDirectory(entry);
				});
			});
	}
};

const addSong = (song, dir) => {
	// Get rid of illegal characters in paths
	const uri = stripIllegalCharacters(song.uri);
	const genre = stripIllegalCharacters(song.genre);
	const album = stripIllegalCharacters(song.album);

	let artist = '';
	if (genre === 'Classical') {
		// Use Composer instead of Artist for Classical music
		artist = stripIllegalCharacters(song.composer);
	} else {
		artist = stripIllegalCharacters(song.artist);
	}

	const artistPath = `/MusicLibrary/${genre}/${artist}/${album}/${uri}`;
	const coverPath = `${dir.path.substring(0, dir.path.lastIndexOf('/') + 1)}cover.jpg`;
	let newCoverPath = '';
	RNFS.exists(coverPath)
		.then((result) => {
			if (result) {
				newCoverPath = `file://${coverPath}`;
			}
			firebase.database().ref(artistPath)
				.set({ ...song, cover: newCoverPath });
		});
};

const stripIllegalCharacters = (string) => {
	let newString = string.split(/\//g).join('');
	newString = newString.split('.').join('');
	newString = newString.split('#').join('');
	newString = newString.split('$').join('');
	newString = newString.split('[').join('');
	newString = newString.split(']').join('');

	return newString;
};

const isAudioFile = (file) => {
	if (file.path.includes('.flac')) {
		return true;
	}
	return false;
};
