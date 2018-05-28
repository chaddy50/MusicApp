import React, { Component } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { songAction } from '../actions';

class Song extends Component {
	render() {
		const { song, songList, songIndex } = this.props;
		const { touchableStyle, containerStyle, trackNumStyle, titleStyle } = styles;

		return (
			<TouchableHighlight
				style={touchableStyle}
				underlayColor="#9900CC"
				onPress={() => this.props.songAction(songList, songIndex)}
			>
				<View style={containerStyle}>
					<Text style={trackNumStyle}>{`${song.trackNum}.`}</Text>
					<Text numberOfLines={1} style={titleStyle}>{song.title}</Text>
				</View>
			</TouchableHighlight>
		);
	}
}

const mapStateToProps = (state, props) => {
	if (typeof (props.navigation) !== 'undefined') {
		// Make sure we've got our navigation parameters on this.props
		return { ...props.navigation.state.params };
	}
	return {};
};

const styles = {
	touchableStyle: {
		borderBottomWidth: 1,
		borderColor: '#333333',
		height: 40
	},
	containerStyle: {
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center',
		padding: 10
	},
	trackNumStyle: {
		color: '#FFF',
		textAlign: 'right',
		paddingRight: 10,
		width: 30
	},
	titleStyle: {
		color: '#FFF',
		paddingRight: 10,
		flex: 1
	}
};

export default connect(mapStateToProps, { songAction })(withNavigation(Song));
