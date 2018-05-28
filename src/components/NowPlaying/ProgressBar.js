//#region Imports
import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { ProgressComponent } from 'react-native-track-player';
import { SECONDARY } from '../../themes/PurpleTeal/PurpleTeal';
//#endregion

//#region ProgressBar
class ProgressBar extends ProgressComponent {
    render() {
        const progress = this.getProgress() * 100;
        let buffered = this.getBufferedProgress() * 100;
        buffered -= progress;
        if (buffered < 0) buffered = 0;

        return (
            <View style={styles.view}>
                <TouchableWithoutFeedback>
                    <View style={styles.bar}>
                        <View style={[{ width: `${progress}%` }, styles.played]} />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}
//#endregion

//#region Styles
const styles = StyleSheet.create({
    view: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        width: '100%'
    },
    bar: {
        backgroundColor: '#575757',
        height: 5,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    played: {
        backgroundColor: SECONDARY,
        height: 5
    }
});
//#endregion

export default ProgressBar;
