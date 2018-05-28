import React from 'react';
import { TouchableHighlight, Text } from 'react-native';

const TouchableCard = ({ onPress, label }) => {
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

const styles = {
	cardStyle: {
		alignItems: 'center',
		padding: 15,
		borderBottomWidth: 1,
		borderColor: '#333333'
	},
	labelStyle: {
		color: 'white'
	}
};

export { TouchableCard };
