import React, { Component } from 'react';
import { ScrollView, View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import Song from './Song';

class Album extends Component {
	state = {
		selectedAlbum: ''
	}

	render() {
		const { coverPath, name, year } = this.props;
		const { albumInfoContainerStyle, albumCoverStyle, albumTitleStyle, albumYearStyle } = styles;

		return (
			<ScrollView>
				<View style={albumInfoContainerStyle}>
					<Image 
						source={coverPath}
						style={albumCoverStyle}
					/>
					<Text style={albumTitleStyle}>{name}</Text>
					<Text style={albumYearStyle}>{year}</Text>
				</View>
				{this.renderSongList()}
			</ScrollView>
		);
	}

	renderSongList() {
		const { songList } = this.props;

		return songList.map((song, index) => 
			<Song 
				key={song.value.uri}
				song={song.value}
				songList={songList}
				songIndex={index}
			/>
		);
	}
}

const styles = {
	albumInfoContainerStyle: {
		alignItems: 'center',
		borderColor: '#333333',
		borderBottomWidth: 1,
		padding: 10
	},
	albumCoverStyle: {
		width: 150,
		height: 150
	},
	albumTitleStyle: {
		color: 'white',
		fontSize: 18
	},
	albumYearStyle: {
		color: 'white',
		fontSize: 14
	}
};

const mapStateToProps = (state, props) => {
	if (typeof (props.navigation) !== 'undefined') {
		return { ...props, ...props.navigation.state.params };
	}
	return { ...props };
};

export default connect(mapStateToProps)(withNavigation(Album));
