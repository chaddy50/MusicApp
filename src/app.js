import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import TrackPlayer from 'react-native-track-player';
import reducers from './reducers';
import Root from './routers/Root';

export const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

class App extends Component {
	componentWillMount() {
		const config = {
			apiKey: 'AIzaSyDy3kyoFdw9iDqMGhcXPQN-Q6vHz1VeQ0Q',
			authDomain: 'music-app-c9e07.firebaseapp.com',
			databaseURL: 'https://music-app-c9e07.firebaseio.com',
			projectId: 'music-app-c9e07',
			storageBucket: '',
			messagingSenderId: '96471317149'
		};

		firebase.initializeApp(config);

		TrackPlayer.setupPlayer();
	}

	componentWillUnmount() {
		TrackPlayer.reset();
	}
	
	render() {
		return (
			<Provider store={store}>
				<View style={{ flex: 1 }}>
					<Root />
				</View>
			</Provider>
		);
	}
}

export default App;
