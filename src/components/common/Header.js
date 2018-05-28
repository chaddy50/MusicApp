// Import libraries for making a component
import React from 'react';
import { Text, View } from 'react-native';

// Make a component
const Header = (props) => {
	const { textStyle, viewStyle } = styles;

	return (
		<View style={viewStyle}>
			<Text style={textStyle}>{props.headerText}</Text>
		</View>
	);
};

// Define styles
const styles = {
	viewStyle: {
		backgroundColor: '#404040',
		justifyContent: 'center',
		alignItems: 'center',
		height: 50,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 1,
		elevation: 10,
		position: 'relative'
	},
	textStyle: {
		fontSize: 20,
		color: 'white'
	}
};

// Make component available to other parts of the app
export { Header };
