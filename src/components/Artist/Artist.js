//#region Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArtistCard from './ArtistCard';
//#endregion

//#region Artist
class Artist extends Component {
	render() {
		const { artist, albumList } = this.props;

		return (
			<ArtistCard 
				label={artist.name} 
				onPress={this.onPress.bind(this)} 
				albumList={albumList}
			/>
		);
	}
	
	onPress() {
		const { albumList, artist, theme } = this.props;

		this.props.rootNavigation.navigate(
			'AlbumList', 
			{ 
				title: artist.name, 
				albumList,
				theme 
			}
		);
	}
}
//#endregion

const mapStateToProps = (state, props) => {
	const { theme } = state.themeState;

	return { ...props, theme };
};

export default connect(mapStateToProps)(Artist);
