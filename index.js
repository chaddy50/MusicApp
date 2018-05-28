import { AppRegistry } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import App from './src/app';

AppRegistry.registerComponent('MusicApp', () => App);
TrackPlayer.registerEventHandler(require('./player-handler'));
