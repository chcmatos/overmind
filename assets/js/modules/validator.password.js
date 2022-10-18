import Validator from "./validator.base.js";

export default class PasswordValidator extends Validator {     
    constructor(input, listenerType) {
        super(input, listenerType || 'keyup');
    }
    onValidateRule(input) {
        return super.onValidateRule(input) && this.onPasswordValidateRule(input);
    }

    onPasswordValidateRule(input) {
        return /^(?=.*[A-Za-z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,}$/.test(input.value)
    }
}
