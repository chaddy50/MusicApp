//#region Imports
import React, { Component } from 'react';
import { TouchableCard } from './common';
//#endregion

//#region Artist
class Artist extends Component {
	render() {
		const { artist } = this.props;

		return (
			<TouchableCard 
				label={artist.name} 
				onPress={this.onPress.bind(this)} 
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
