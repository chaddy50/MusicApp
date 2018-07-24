import React, { Component } from 'react';
import { View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';

class ThemeSettings extends Component {
    render() {
        return (
            <View>
                <CheckBox 
                    title='Dark'
                    checked={false}
                />
                <CheckBox 
                    title='Light'
                    checked
                    checkedColor='red'
                />
            </View>
        );
    }
}

export default connect(null)(ThemeSettings);
