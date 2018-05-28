//#region Imports
import React from 'react';
import { TouchableHighlight, Text } from 'react-native';
import { DIVIDER } from '../themes/PurpleTeal/PurpleTeal';
//#endregion

//#region ArtistCard
const ArtistCard = ({ onPress, label }) => {
	return (
		<TouchableHighlight 
			style={styles.cardStyle}
			underlayColor="rgba(153,0,204,0.5)"
			onPress={onPress}
		>
			<Text style={styles.labelStyle}>{label}</Text>
		</TouchableHighlight>
	);
};
//#endregion

//#region Styles
const styles = {
	cardStyle: {
		alignItems: 'center',
		padding: 15,
        borderBottomWidth: 1,
		borderColor: DIVIDER
	},
	labelStyle: {
		color: 'black'
	}
};
//#endregion

export default ArtistCard;
