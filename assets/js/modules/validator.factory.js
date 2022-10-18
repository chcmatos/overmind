
import Validator from "./validator.base.js";
import SimpleTextValidator from "./validator.text.js";
import BrazilPhoneNumberValidator from "./validator.phone.js";
import EmailValidator from "./validator.mail.js";
import PasswordValidator from "./validator.password.js";
import ConfirmPasswordValidator from "./validator.password.confirm.js";

export class ValidatorFactory {

    static for(input) {
        if (Validator.isAttached(input)) {
            return Validator.attached(input);
        } else {
            switch (input.type) {
                case 'text':
                    return new SimpleTextValidator(input);
                case 'tel':
                    return new BrazilPhoneNumberValidator(input);
                case 'email':
                    return new EmailValidator(input);
                case 'password':
                    return ValidatorFactory.forPasswd(input);
                default:
                    throw new Error(`Validator not implemented for input:[type=${input.type}]`);
            }
        }
    }

    static forPasswd(input) {
        switch (input.name) {
            case 'confirm-password':
                return new ConfirmPasswordValidator(input);
            default:
                return new PasswordValidator(input);
        }
    }
}