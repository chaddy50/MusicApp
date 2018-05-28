//#region Imports
import React, { Component } from 'react';
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
		const { albumList, artist } = this.props;

		this.props.rootNavigation.navigate(
			'AlbumList', 
			{ 
				title: artist.name, 
				albumList 
			}
		);
	}
}
//#endregion

export default Artist;
