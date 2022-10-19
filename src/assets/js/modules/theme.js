const callbacks = [];
const THEME_KEY = 'theme';

export const THEME_DARK = 'theme-dark';
export const THEME_LIGHT = 'theme-light';

const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

const addThemeChangedListener = (callback) => typeof callback === 'function' && (callbacks.includes(callback) || callbacks.push(callback));

const removeThemeChangedListener = (callback) => {
    let i;
    return (i = callbacks.indexOf(callback)) &&
        callbacks.splice(i, 1).length;
};

const dispatchEvent = (theme) => {
    const customEvent = new CustomEvent("themeChanged", {
        bubbles: true,
        detail: {
            theme: theme,
            isLight: theme === THEME_LIGHT,
            isDark: theme === THEME_DARK
        }
    });

    for (let c of callbacks) {
        c.call(window.globalThis, customEvent);
    }
};

const isThemeLight = () => getTheme() == THEME_LIGHT;

const isThemeDark = () => getTheme() == THEME_DARK;

const getTheme = () => {
    let theme = localStorage.getItem(THEME_KEY);
    return theme || (prefersDarkTheme ? THEME_DARK : THEME_LIGHT);
};

const setTheme = (theme) => {
    theme = theme === THEME_DARK ? THEME_DARK : THEME_LIGHT;
    localStorage.setItem(THEME_KEY, theme);
    dispatchEvent(theme);
};

const toggleTheme = () => {
    let res;
    const theme = getTheme();
    if (
        theme == THEME_DARK ||
        (theme != THEME_LIGHT && prefersDarkTheme)
    ) {
        document.body.classList.remove(THEME_DARK);
        document.body.classList.add(THEME_LIGHT);
        res = THEME_LIGHT;
    } else {
        document.body.classList.remove(THEME_LIGHT);
        document.body.classList.add(THEME_DARK);
        res = THEME_DARK;
    }
    setTheme(res);
    return res;
};

const setup = () => {
    //setup theme functions as globalThis context.
    let properties = [
        addThemeChangedListener,
        removeThemeChangedListener,
        dispatchEvent,
        isThemeDark,
        isThemeLight,
        getTheme,
        setTheme,
        toggleTheme].reduce((prev, curr) => {
            prev[curr.name] = {
                value: curr,
                writable: false
            };
            return prev;
        }, {});

    properties.THEME_DARK = { value: THEME_DARK, writable: false };
    properties.THEME_LIGHT = { value: THEME_LIGHT, writable: false };

    Object.defineProperties(window.globalThis, properties);

    //setup theme
    let currentTheme = getTheme();
    if (currentTheme == THEME_DARK && !prefersDarkTheme) {
        document.body.classList.toggle(THEME_DARK);
    } else if (currentTheme == THEME_LIGHT && prefersDarkTheme) {
        document.body.classList.toggle(THEME_LIGHT);
    }
};

export default {
    addThemeChangedListener,
    removeThemeChangedListener,
    dispatchEvent,
    isThemeDark,
    isThemeLight,
    getTheme,
    setTheme,
    toggleTheme,
    setup
};