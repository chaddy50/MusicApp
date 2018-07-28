import React, { Component } from 'react';
import { View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';
import { MATERIAL_DARK } from '../../actions/types';

class ThemeSettings extends Component {
    componentWillMount() {
        const { themeName } = this.props.theme;

        if (themeName === MATERIAL_DARK) {
            this.setState({ darkChecked: true });
        } else {
            this.setState({ lightChecked: true });
        }
    }

    render() {
        const { PRIMARY, BACKGROUND, ON_BACKGROUND, ON_BACKGROUND_NOFOCUS, SEPARATOR } = this.props.theme;
        return (
            <View style={[{ backgroundColor: BACKGROUND }, styles.containerStyle]}>
                <CheckBox 
                    title='Dark'
                    checked={this.state.darkChecked}
                    onPress={this.toggleTheme.bind(this, 'dark')}
                    checkedColor={PRIMARY}
                    containerStyle={[{ backgroundColor: BACKGROUND, borderColor: SEPARATOR }, styles.checkboxStyle]}
                    textStyle={{ color: ON_BACKGROUND }}
                    uncheckedColor={ON_BACKGROUND_NOFOCUS}
                />
                <CheckBox 
                    title='Light'
                    checked={this.state.lightChecked}
                    onPress={this.toggleTheme.bind(this, 'light')}
                    checkedColor={PRIMARY}
                    containerStyle={[{ backgroundColor: BACKGROUND, borderColor: SEPARATOR }, styles.checkboxStyle]}
                    textStyle={{ color: ON_BACKGROUND }}
                    uncheckedColor={ON_BACKGROUND_NOFOCUS}
                />
            </View>
        );
    }

    toggleTheme(selection) {
        if (selection === 'dark') {
            if (this.state.darkChecked) {
                this.setState({ darkChecked: false });
            } else {
                this.setState({ darkChecked: true, lightChecked: false });
            }
        } else {
            if (this.state.lightChecked) {
                this.setState({ lightChecked: false });
            } else {
                this.setState({ lightChecked: true, darkChecked: false });
            }
        }
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    checkboxStyle: {
        alignItems: 'center',
        width: '40%',
        height: 50
    }
};

const mapStateToProps = (state, props) => {
    const { theme } = state.themeState;
    return { ...props, theme };
};

export default connect(mapStateToProps)(ThemeSettings);
