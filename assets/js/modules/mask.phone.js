import { isBackspaceKey, isDeleteKey, isModifierKey, isNumericInput } from "./mask.keys.js";
import {
    LocalPhoneHandler,
    LocalPhoneWithAreaCodeHandler,
    LocalPhoneWithCountryCodeHandler,
    MobilePhoneHandler,
    MobilePhoneWithAreaCodeHandler,
    MobilePhoneWithCountryCodeHandler
} from "./mask.phone.handler.js";

const _enforceFormat = (event) => {
    // Input must be of a valid number format or a modifier key, and not longer than ten digits
    if (!isNumericInput(event) && !isModifierKey(event)) {
        event.preventDefault();
    }
};

const _formatToPhone = (event) => {
    if (isModifierKey(event) && !isDeleteKey(event) && !isBackspaceKey(event)) {
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

const _setup = (input) => {
    if (input && input.tagName.toLowerCase() === 'input') {
        input.removeEventListener('keydown', _enforceFormat, false);
        input.removeEventListener('keyup', _formatToPhone, false);
        input.addEventListener('keydown', _enforceFormat);
        input.addEventListener('keyup', _formatToPhone);
    }
};

const _setupById = (id) => _setup(document.getElementById(id));

const _setupAllInputTypeTel = () => {
    const inputs = document.querySelectorAll("input[type='tel']");
    inputs.forEach(_setup);
};

export default {
    setupById: _setupById,
    setupAllInputTypeTel: _setupAllInputTypeTel
};