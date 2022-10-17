import { isDeleteKey, isModifierKey, isNumericInput } from "./mask.keys.js";
import {
    LocalPhoneHandler,
    LocalPhoneWithAreaCodeHandler,
    LocalPhoneWithCountryCodeHandler,
    MobilePhoneHandler,
    MobilePhoneWithAreaCodeHandler,
    MobilePhoneWithCountryCodeHandler
} from "./mask.phone.handler.js";

const enforceFormat = (event) => {
    // Input must be of a valid number format or a modifier key, and not longer than ten digits
    if (!isNumericInput(event) && !isModifierKey(event)) {
        event.preventDefault();
    }
};

const formatToPhone = (event) => {
    if (isModifierKey(event) && !isDeleteKey(event)) {
        return;
    }

    let node = new LocalPhoneHandler();
    node
        .next(new MobilePhoneHandler())
        .next(new LocalPhoneWithAreaCodeHandler())
        .next(new MobilePhoneWithAreaCodeHandler())
        .next(new LocalPhoneWithCountryCodeHandler())
        .next(new MobilePhoneWithCountryCodeHandler());
    node.handle(event);
};

const setup = (input) => {
    if (input && input.tagName.toLowerCase() === 'input') {
        input.removeEventListener('keydown', enforceFormat, false);
        input.removeEventListener('keyup', formatToPhone, false);
        input.addEventListener('keydown', enforceFormat);
        input.addEventListener('keyup', formatToPhone);
    }
};

export default {
    setupById: (id) => {
        setup(document.getElementById(id));
    },
    setupAllInputTypeTel: () => {
        const inputs = document.querySelectorAll("input[type='tel']");
        inputs.forEach(setup);
    }
};