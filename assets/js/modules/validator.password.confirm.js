import Validator from "./validator.base.js";

export default class ConfirmPasswordValidator extends Validator {

    constructor(input, listenerType) {
        super(input, listenerType || 'keyup');
    }

    onValidateRule(input) {
        return super.onValidateRule(input) && this.onConfirmPasswordValidateRule(input);
    }

    onConfirmPasswordValidateRule(input) {
        if (!!!this.confirmPasswd) {
            let targetId = input.getAttribute("confirm-id");
            this.confirmPasswd = document.getElementById(targetId);
        }
        return !!this.confirmPasswd && this.confirmPasswd.value == input.value;
    }

}