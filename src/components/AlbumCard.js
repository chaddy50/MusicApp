//#region Imports
import React, { Component } from 'react';
import { View, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation	} from 'react-navigation';
import { BACKGROUND } from '../themes/PurpleTeal/PurpleTeal';
//#endregion

//#region AlbumCard
class AlbumCard extends Component {
	render() {
		const { coverPath } = this.props;
		const { albumCoverStyle, albumContainerStyle } = styles;
		
		return (
			<View style={albumContainerStyle}>
				<Image 
					source={coverPath} 
					style={albumCoverStyle} 
				/>
			</View>
		);
	}
}
//#endregion

//#region Styles
const screenWidth = Dimensions.get('window').width;

const styles = {
	albumContainerStyle: {
		flex: 1,
		backgroundColor: BACKGROUND
	},
	albumCoverStyle: {
		width: screenWidth,
		height: screenWidth
	}
};
//#endregion

export default connect(null)(withNavigation(AlbumCard));
