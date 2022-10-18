export default class Validator {

    constructor(input, listenerType) {
        this.input = input;
        this.listenerType = listenerType || 'change';
    }

    validate() {
        const isValid = this.onValidateRule(this.input);
        this.onValidate(this.input, isValid);
        return isValid;
    }

    watch() {
        Validator.attach(this.input, this);
        this.input.addEventListener(this.listenerType, Validator._onWatch);
    }

    onValidate(input, isValid) {
        Validator._toggleError(input, isValid);
        Validator._toggleError(document.querySelector(`.form-message.${input.id}`), isValid);
    }

    onValidateRule(input) {
        return !!input.value && !!input.value.length &&
            (input.minLength <= 0 || input.minLength <= input.value.length) &&
            (input.maxLength <= 0 || input.maxLength >= input.value.length);
    }

    static _toggleError(target, isValid) {
        if (!!target) {
            if (isValid) {
                if (target.classList.contains('error')) {
                    target.classList.remove('error');
                }
            } else if (!target.classList.contains('error')) {
                target.classList.add('error');
            }
        }
    }

    static _onWatch(e) {
        if (Validator.isAttached(e.target)) {
            Validator.attached(e.target).validate();
        }
    }

    static attach(input, validator) {
        return input['validator'] = validator;
    }

    static isAttached(input) {
        return 'validator' in input && input['validator'] instanceof Validator
    }

    static attached(input) {
        return input['validator'];
    }
}
