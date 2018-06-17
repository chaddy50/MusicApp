import { createTheme } from 'react-native-theming';

export const themes = [
    createTheme({
        PRIMARY: '#212121',
        PRIMARY_DARK: '#000000',
        PRIMARY_LIGHT: '#303030',
        ON_PRIMARY: '#fff',
        ON_PRIMARY_NOFOCUS: '#eeeeee',

        SECONDARY: '#512da8',
        ON_SECONDARY: '#fff',
        ON_SECONDARY_NOFOCUS: '#eeeeee',
        SECONDARY_DARK: '#140078',
        ON_SECONDARY_DARK: '#fff',
        SECONDARY_LIGHT: '#8559da',
        ON_SECONDARY_LIGHT: '#fff',
        
        BACKGROUND: '#424242',
        ON_BACKGROUND: '#fff',
        ON_BACKGROUND_NOFOCUS: '#eeeeee',
        SEPARATOR: '#303030'
    }, 'Dark-Purple')
];
