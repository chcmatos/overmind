function PhoneHandler(_maxNumberLen, _onHandleCallback) {
    return class {
        constructor() {
            this.maxNumberLen = _maxNumberLen;
            this.onHandle = _onHandleCallback;
        }

        isValid(args) {
            return args.length <= this.maxNumberLen || !!!this.nextHandler;
        }

        handle(event, cached) {
            const args = cached || {};
            args.digits = args.digits || event.target.value.replace(/\D/g, '');
            args.length = args.length || args.digits.length;
            args.maxLength = this.maxNumberLen;

            if (this.isValid(args)) {
                event.target.value = this.onHandle(args);
            } else if (!!this.nextHandler) {
                this.nextHandler.handle(event, args);
            }
        }

        next(handler) {
            this.nextHandler = handler;
            return handler;
        }
    };
}

//#region Local Phone
export class LocalPhoneHandler extends PhoneHandler(8,
    (args) => {
        if (args.length < 4) {
            return args.digits;
        } else if (args.length < args.maxLength) {
            return `${args.digits.substring(0, 3)}-${args.digits.substring(3)}`;
        } else {
            return `${args.digits.substring(0, 4)}-${args.digits.substring(4)}`;
        }
    }) { }

export class LocalPhoneWithAreaCodeHandler extends PhoneHandler(10,
    (args) => `${args.digits.substring(0, 2)} ${args.digits.substring(2, 6)}-${args.digits.substring(6)}`) { }

export class LocalPhoneWithCountryCodeHandler extends PhoneHandler(12,
    (args) => `+${args.digits.substring(0, 2)} ${args.digits.substring(2, 4)} ${args.digits.substring(4, 8)}-${args.digits.substring(8)}`) { }
//#endregion

//#region Mobile Phone
export class MobilePhoneHandler extends PhoneHandler(9,
    (args) => `${args.digits.substring(0, 1)} ${args.digits.substring(1, 5)}-${args.digits.substring(5)}`) { }

export class MobilePhoneWithAreaCodeHandler extends PhoneHandler(11,
    (args) => `${args.digits.substring(0, 2)} ${args.digits.substring(2, 3)} ${args.digits.substring(3, 7)}-${args.digits.substring(7)}`) { }

export class MobilePhoneWithCountryCodeHandler extends PhoneHandler(13,
    (args) => `+${args.digits.substring(0, 2)} ${args.digits.substring(2, 4)} ${args.digits.substring(4, 5)} ${args.digits.substring(5, 9)}-${args.digits.substring(9, 13)}`) { }
//#endregion