//#region Imports
import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { ProgressComponent } from 'react-native-track-player';
//#endregion

//#region ProgressBar
class ProgressBar extends ProgressComponent {
    render() {
        const { SECONDARY } = this.props.theme;

        const progress = this.getProgress() * 100;
        let buffered = this.getBufferedProgress() * 100;
        buffered -= progress;
        if (buffered < 0) buffered = 0;

        return (
            <View style={ styles.view }>
                <TouchableWithoutFeedback>
                    <View style={[{ backgroundColor: '#414141' }, styles.bar]}>
                        <View style={[{ width: `${progress}%`, backgroundColor: SECONDARY }, styles.played]} />
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
        height: 5,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    played: {
        height: 5
    }
});
//#endregion

const mapStateToProps = (state) => {
    const { theme } = state.themeState;

    return { theme };
};

export default connect(mapStateToProps)(ProgressBar);
