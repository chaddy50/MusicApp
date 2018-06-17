import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { DrawerItems, SafeAreaView } from 'react-navigation';

class DrawerItem extends Component {
    render() {
        const { theme } = this.props;

        return (
            <ScrollView style={{ backgroundColor: theme.BACKGROUND }}>
                <SafeAreaView>
                    <DrawerItems 
                        {...this.props} 
                        activeBackgroundColor={theme.BACKGROUND_LIGHT}
                        activeTintColor={theme.ON_BACKGROUND}
                        inactiveBackgroundColor={theme.BACKGROUND}
                        inactiveTintColor={theme.ON_BACKGROUND_NOFOCUS}
                    />
                </SafeAreaView>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    const { theme } = state.themeState;

    return { theme };
};

export default connect(mapStateToProps)(DrawerItem);
