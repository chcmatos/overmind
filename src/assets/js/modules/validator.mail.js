import Validator from "./validator.base.js";

export default class EmailValidator extends Validator {
    onValidateRule(input) {
        return super.onValidateRule(input) && this.onEmailValidateRule(input);
    }

    onEmailValidateRule(input) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input.value);
    }
}