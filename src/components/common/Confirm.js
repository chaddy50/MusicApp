import React from 'react';
import { Text, View, Modal } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';

const Confirm = ({ confirmText, visible, onAccept, onDecline }) => {
	return (
		<Modal
			visible={visible}
			transparent
			animationType="slide"
			onRequestClose={() => {}} //need to pass this for Android, even if empty
		>
			<View style={styles.containerStyle}>
				<CardSection style={styles.cardSectionStyle}>
					<Text style={styles.textStyle}>
						{confirmText}
					</Text>
				</CardSection>

				<CardSection style={styles.cardSectionStyle}>
					<Button 
						buttonText="Yes" 
						onPress={onAccept}
					/>
					<Button
						buttonText="No"
						onPress={onDecline}
					/>
				</CardSection>
			</View>
		</Modal>
	);
};

const styles = {
	cardSectionStyle: {
		justifyContent: 'center'
	},
	textStyle: {
		flex: 1,
		fontSize: 18,
		textAlign: 'center',
		lineHeight: 40
	},
	containerStyle: {
		backgroundColor: 'rgba(0, 0, 0, 0.75)',
		position: 'relative',
		flex: 1,
		justifyContent: 'center'
	}
};

export { Confirm };
