import { ValidatorFactory } from "./validator.factory.js";

const _setup = (input) => {
    ValidatorFactory.for(input).watch();
};

const _setupAll = () => {
    Array.from(document.querySelectorAll("input:required")).forEach(_setup);
};

const _validate = (input) => {
    return ValidatorFactory.for(input).validate();
};

export default {
    setupAll: _setupAll,
    setup: _setup,
    validate: _validate
};