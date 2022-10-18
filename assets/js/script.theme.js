(() => {

    const callbacks = [];

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

    //setup theme functions 
    Object.defineProperties(window.globalThis, {
        THEME_KEY: {
            value: 'theme',
            writable: false
        },
        THEME_LIGHT: {
            value: 'theme-light',
            writable: false
        },
        THEME_DARK: {
            value: 'theme-dark',
            writable: false
        },
        isThemeLight: {
            value: () => getTheme() == THEME_LIGHT,
            writable: false,
        },
        isThemeDark: {
            value: () => getTheme() == THEME_DARK,
            writable: false,
        },
        getTheme: {
            value: () => {
                let theme = localStorage.getItem(THEME_KEY);
                return theme || (prefersDarkTheme ? THEME_DARK : THEME_LIGHT);
            },
            writable: false,
        },
        setTheme: {
            value: (theme) => {
                theme = theme === THEME_DARK ? THEME_DARK : THEME_LIGHT;
                localStorage.setItem(
                    THEME_KEY,
                    theme,
                );
                dispatchEvent(theme);
            },
            writable: false,
        },
        toggleTheme: {
            value: () => {
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
            },
            writable: false,
        },
        prefersDarkTheme: {
            value: window.matchMedia('(prefers-color-scheme: dark)').matches,
            writable: false,
        },
        addThemeChangedListener: {
            value: (callback) => typeof callback === 'function' && (callbacks.includes(callback) || callbacks.push(callback)),
            writable: false
        },
        removeThemeChangedListener: {
            value: (callback) => {
                let i;
                return (i = callbacks.indexOf(callback)) && callbacks.splice(i, 1).length;
            },
            writable: false
        }
    });

    //setup theme
    let currentTheme = getTheme();
    if (currentTheme == THEME_DARK && !prefersDarkTheme) {
        document.body.classList.toggle(THEME_DARK);
    } else if (currentTheme == THEME_LIGHT && prefersDarkTheme) {
        document.body.classList.toggle(THEME_LIGHT);
    }
})();