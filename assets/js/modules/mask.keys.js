const NUMBER_LINE_FIRST_KEY = 48;
const NUMBER_LINE_LAST_KEY = 57;

const NUMBER_PAD_FIRST_KEY = 96;
const NUMBER_PAD_LAST_KEY = 105;

const BACKSPACE_KEY = 8;
const TAB_KEY = 9;
const ENTER_KEY = 13;
const SHIFT_KEY = 16;
const END_KEY = 35;
const HOME_KEY = 36;
const ARROW_LEFT_KEY = 37;
const ARROW_UP_KEY = 38;
const ARROW_RIGHT_KEY = 39;
const ARROW_DOWN_KEY = 40;
const DELETE_KEY = 46;

const _between = (target, from, until) => {
    return target >= from && target <= until;
};

const _isSomeKey = (event, ...keys) => {
    for (let key of keys) {
        if (event.keyCode === key) {
            return true;
        }
    }
    return false;
}

export const isNumericInput = (event) => {
    return _between(event.keyCode, NUMBER_LINE_FIRST_KEY, NUMBER_LINE_LAST_KEY) ||
        _between(event.keyCode, NUMBER_PAD_FIRST_KEY, NUMBER_PAD_LAST_KEY);
};

export const isDeleteKey = (event) => {
    return event.keyCode === DELETE_KEY;
};

export const isBackspaceKey = (event) => {
    return event.keyCode === BACKSPACE_KEY;
}

export const isEnterKey = (event) => {
    return event.keyIdentifier == 'U+000A' || event.keyIdentifier == 'Enter' || event.keyCode === ENTER_KEY;
};

export const isTabKey = (event) => {
    return event.key === 'Tab' || event.keyCode === TAB_KEY;
};

export const isShortcutCommandKey = (event) => {
    // Allow Ctrl/Command + A,C,V,X,Z
    return (event.ctrlKey === true || event.metaKey === true) &&
        (key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
};

export const isModifierKey = (event) => {
    return !!event.shiftKey || isShortcutCommandKey(event) || _isSomeKey(event,
        SHIFT_KEY,
        END_KEY,
        HOME_KEY,
        BACKSPACE_KEY,
        TAB_KEY,
        ENTER_KEY,
        DELETE_KEY,
        ARROW_LEFT_KEY,
        ARROW_UP_KEY,
        ARROW_RIGHT_KEY,
        ARROW_DOWN_KEY
    );
};

