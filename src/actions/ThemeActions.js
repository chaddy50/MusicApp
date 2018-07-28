import { MATERIAL_LIGHT, MATERIAL_DARK, DEEP_PURPLE, LIGHT_BLUE } from './types';

export const setupTheme = (theme, primaryColor, secondaryColor) => {
    return (dispatch) => {
        const themeObject = getThemeObject(theme, primaryColor, secondaryColor);
        
        dispatch({
            type: 'set_theme',
            payload: themeObject
        });
    };
};

export const getThemeObject = (theme = MATERIAL_DARK, primaryColor = DEEP_PURPLE, secondaryColor = LIGHT_BLUE) => {
    const primaryPalette = getColorPalette(primaryColor);
    const secondaryPalette = getColorPalette(secondaryColor);
    const themePalette = getMaterialTheme(theme);

    return ({
            themeName: theme,
            primaryColorName: primaryColor,
            secondaryColorName: secondaryColor,
            
            PRIMARY: primaryPalette.COLOR,
            PRIMARY_DARK: primaryPalette.DARK,
            PRIMARY_LIGHT: primaryPalette.LIGHT,
            ON_PRIMARY: primaryPalette.ON_COLOR,
            ON_PRIMARY_NOFOCUS: primaryPalette.ON_COLOR_NOFOCUS,

            SECONDARY: secondaryPalette.COLOR,
            ON_SECONDARY: secondaryPalette.ON_COLOR,
            ON_SECONDARY_NOFOCUS: secondaryPalette.ON_COLOR_NOFOCUS,
            ON_SECONDARY_DARK: secondaryPalette.ON_DARK,
            ON_SECONDARY_LIGHT: secondaryPalette.ON_LIGHT,

            BACKGROUND: themePalette.BACKGROUND,
            BACKGROUND_LIGHT: themePalette.BACKGROUND_LIGHT,
            ON_BACKGROUND: themePalette.ON_BACKGROUND,
            ON_BACKGROUND_NOFOCUS: themePalette.ON_BACKGROUND_NOFOCUS,
            SEPARATOR: themePalette.SEPARATOR
    });
};

const getMaterialTheme = (theme) => {
    if (theme === MATERIAL_LIGHT) {
        return {
            BACKGROUND: '#f5f5f5',
            BACKGROUND_LIGHT: '#616161',
            ON_BACKGROUND: '#000',
            ON_BACKGROUND_NOFOCUS: '#616161',
            SEPARATOR: '#e0e0e0'
        };
    }
    return {
        BACKGROUND: '#212121',
        BACKGROUND_LIGHT: '#414141',
        ON_BACKGROUND: '#fff',
        ON_BACKGROUND_NOFOCUS: '#c6c6c6',
        SEPARATOR: '#1c1c1c'
    };
};

const getColorPalette = (color) => {
    if (color === DEEP_PURPLE) {
        return {
            COLOR: '#673AB7',
            LIGHT: '#D1C4E9',
            DARK: '#512DA8',
            ON_COLOR: '#fff',
            ON_COLOR_NOFOCUS: '#c6c6c6',
            ON_LIGHT: '#fff',
            ON_DARK: '#fff'
        };
    } else if (color === LIGHT_BLUE) {
        return {
            COLOR: '#03A9F4',
            LIGHT: '#B3E5FC',
            DARK: '#0288D1',
            ON_COLOR: '#fff',
            ON_COLOR_NOFOCUS: '#c6c6c6',
            ON_LIGHT: '#000',
            ON_DARK: '#fff'
        };
    }
};
