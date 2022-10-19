import {
    BRAZIL_PHONE_COUNTRY_CODE,
    LOCAL_PHONE_LENGTH,
    LOCAL_PHONE_WITH_AREA_CODE_LENGTH,
    LOCAL_PHONE_WITH_COUNTRY_CODE_LENGTH,
    MOBILE_PHONE_LENGTH,
    MOBILE_PHONE_NINE_DIGIT_INDEX,
    MOBILE_PHONE_WITH_AREA_CODE_LENGTH,
    MOBILE_PHONE_WITH_AREA_CODE_NINE_DIGIT_INDEX,
    MOBILE_PHONE_WITH_AREA_CODE_AREA_START_INDEX,
    MOBILE_PHONE_WITH_AREA_CODE_AREA_END_INDEX,
    MOBILE_PHONE_WITH_COUNTRY_CODE_LENGTH,
    MOBILE_PHONE_WITH_COUNTRY_CODE_NINE_DIGIT_INDEX,
    MOBILE_PHONE_WITH_COUNTRY_CODE_COUNTRY_START_INDEX,
    MOBILE_PHONE_WITH_COUNTRY_CODE_COUNTRY_END_INDEX,
    MOBILE_PHONE_WITH_COUNTRY_CODE_AREA_START_INDEX,
    MOBILE_PHONE_WITH_COUNTRY_CODE_AREA_END_INDEX,
    BRAZIL_PHONE_AREA_MIN_CODE,
    BRAZIL_PHONE_AREA_MAX_CODE,
    LOCAL_PHONE_WITH_AREA_CODE_AREA_START_INDEX,
    LOCAL_PHONE_WITH_AREA_CODE_AREA_END_INDEX,
    LOCAL_PHONE_WITH_COUNTRY_CODE_COUNTRY_START_INDEX,
    LOCAL_PHONE_WITH_COUNTRY_CODE_COUNTRY_END_INDEX,
    LOCAL_PHONE_WITH_COUNTRY_CODE_AREA_START_INDEX,
    LOCAL_PHONE_WITH_COUNTRY_CODE_AREA_END_INDEX
} from "./mask.phone.constants.js";

import Validator from "./validator.base.js";


export default class BrazilPhoneNumberValidator extends Validator {
    onValidateRule(input) {
        return super.onValidateRule(input) && this.onPhoneNumberValidateRule(input);
    }

    onPhoneNumberValidateRule(input) {
        let value = input.value.replace(/\D/g, '');
        let len = value.length;
        let areaCode;
        switch (len) {
            case MOBILE_PHONE_LENGTH:
                return this.substringToInt(value, MOBILE_PHONE_NINE_DIGIT_INDEX) == 9;
            case MOBILE_PHONE_WITH_AREA_CODE_LENGTH:                
                return this.substringToInt(value, MOBILE_PHONE_WITH_AREA_CODE_NINE_DIGIT_INDEX) == 9 &&
                    (areaCode = this.substringToInt(value,
                        MOBILE_PHONE_WITH_AREA_CODE_AREA_START_INDEX,
                        MOBILE_PHONE_WITH_AREA_CODE_AREA_END_INDEX)) >= BRAZIL_PHONE_AREA_MIN_CODE &&
                    areaCode <= BRAZIL_PHONE_AREA_MAX_CODE;
            case MOBILE_PHONE_WITH_COUNTRY_CODE_LENGTH:
                return this.substringToInt(value, MOBILE_PHONE_WITH_COUNTRY_CODE_NINE_DIGIT_INDEX) == 9 &&
                    this.substringToInt(value,
                        MOBILE_PHONE_WITH_COUNTRY_CODE_COUNTRY_START_INDEX,
                        MOBILE_PHONE_WITH_COUNTRY_CODE_COUNTRY_END_INDEX) == BRAZIL_PHONE_COUNTRY_CODE &&
                    (areaCode = this.substringToInt(value,
                        MOBILE_PHONE_WITH_COUNTRY_CODE_AREA_START_INDEX,
                        MOBILE_PHONE_WITH_COUNTRY_CODE_AREA_END_INDEX)) >= BRAZIL_PHONE_AREA_MIN_CODE &&
                    areaCode <= BRAZIL_PHONE_AREA_MAX_CODE;
            case LOCAL_PHONE_LENGTH:
                return this.substringToInt(value, 0) > 0;
            case LOCAL_PHONE_WITH_AREA_CODE_LENGTH:
                return this.substringToInt(value, LOCAL_PHONE_WITH_AREA_CODE_AREA_END_INDEX) > 0 &&
                    (areaCode = this.substringToInt(value,
                        LOCAL_PHONE_WITH_AREA_CODE_AREA_START_INDEX,
                        LOCAL_PHONE_WITH_AREA_CODE_AREA_END_INDEX)) >= BRAZIL_PHONE_AREA_MIN_CODE &&
                    areaCode <= BRAZIL_PHONE_AREA_MAX_CODE;
            case LOCAL_PHONE_WITH_COUNTRY_CODE_LENGTH:
                return this.substringToInt(value, LOCAL_PHONE_WITH_COUNTRY_CODE_AREA_END_INDEX) > 0 &&
                    this.substringToInt(value,
                        LOCAL_PHONE_WITH_COUNTRY_CODE_COUNTRY_START_INDEX,
                        LOCAL_PHONE_WITH_COUNTRY_CODE_COUNTRY_END_INDEX) == BRAZIL_PHONE_COUNTRY_CODE &&
                    (areaCode = this.substringToInt(value,
                        LOCAL_PHONE_WITH_COUNTRY_CODE_AREA_START_INDEX,
                        LOCAL_PHONE_WITH_COUNTRY_CODE_AREA_END_INDEX)) >= BRAZIL_PHONE_AREA_MIN_CODE &&
                    areaCode <= BRAZIL_PHONE_AREA_MAX_CODE;
            default:
                return false;

        }
    }

    substringToInt(value, start, end) {
        return parseInt(value.substring(start, end || (start + 1)));
    }

}