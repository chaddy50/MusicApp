//#region Imports
import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { songAction } from '../../actions';
//#endregion

//#region Song
class Song extends Component {
	render() {
		const { song, songList, songIndex } = this.props;
		const { touchableStyle, containerStyle, trackNumStyle, titleStyle } = styles;
		const { BACKGROUND, SEPARATOR, ON_BACKGROUND } = this.props.theme;

		return (
			<TouchableOpacity
				style={[{ backgroundColor: BACKGROUND, borderColor: SEPARATOR }, touchableStyle]}
				onPress={() => this.props.songAction(songList, songIndex)}
			>
				<View style={containerStyle}>
					<Text style={[{ color: ON_BACKGROUND }, trackNumStyle]}>{`${song.trackNum}.`}</Text>
					<Text numberOfLines={1} style={[{ color: ON_BACKGROUND }, titleStyle]}>{song.title}</Text>
				</View>
			</TouchableOpacity>
		);
	}
}
//#endregion

//#region Styles
const styles = {
	touchableStyle: {
		borderBottomWidth: 1,
		height: 40
	},
	containerStyle: {
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center',
		padding: 10
	},
	trackNumStyle: {
		textAlign: 'right',
		paddingRight: 10,
		width: 30
	},
	titleStyle: {
		paddingRight: 10,
		flex: 1
	}
};
//#endregion

//#region MapStateToProps
const mapStateToProps = (state, props) => {
	const { theme } = state.themeState;

	if (typeof (props.navigation) !== 'undefined') {
		// Make sure we've got our navigation parameters on this.props
		return { ...props.navigation.state.params, theme };
	}
	return { theme };
};
//#endregion

export default connect(mapStateToProps, { songAction })(withNavigation(Song));
