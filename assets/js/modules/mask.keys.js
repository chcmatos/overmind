const NUMBER_LINE_FIRST_KEY = 48;
const NUMBER_LINE_LAST_KEY = 57;

const NUMBER_PAD_FIRST_KEY = 96;
const NUMBER_PAD_LAST_KEY = 105;

const DELETE_KEY = 8;

const between = (target, from, until) => {
    return target >= from && target <= until;
};

export const isNumericInput = (event) => {
    return between(event.keyCode, NUMBER_LINE_FIRST_KEY, NUMBER_LINE_LAST_KEY) ||
        between(event.keyCode, NUMBER_PAD_FIRST_KEY, NUMBER_PAD_LAST_KEY);
};

export const isDeleteKey = (event) => {
    return event.keyCode == DELETE_KEY;
};

export const isModifierKey = (event) => {
    const key = event.keyCode;

    return (event.shiftKey === true || key === 35 || key === 36) || // Allow Shift, Home, End
        (key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
        (key > 36 && key < 41) || // Allow left, up, right, down
        (
            // Allow Ctrl/Command + A,C,V,X,Z
            (event.ctrlKey === true || event.metaKey === true) &&
            (key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
        );
};

