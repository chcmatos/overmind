import { isEnterKey, isTabKey } from "./mask.keys.js";
import validators from "./validators.js";
import mail from "./form.mail.js";
import steps from "./form.steps.circle.js";

export default {
    setup: () => {
        let currFieldSetIndex = 0;
        const form = document.getElementById("signup-form");
        const fieldsetArr = Array.from(form.getElementsByTagName("fieldset"));

        const forward = (index) => {
            currFieldSetIndex = (index || currFieldSetIndex) + 1;
            navigate(currFieldSetIndex);
            steps.check(currFieldSetIndex);
        };

        const backward = (index) => {
            steps.uncheck(currFieldSetIndex);
            currFieldSetIndex = (index || currFieldSetIndex) - 1;
            navigate(currFieldSetIndex);
        };

        const navigate = (index) => {
            form.style.marginLeft = (index * -100) + '%';
        }

        const setupBtn = (fieldset, query, callback) => {
            let btn = fieldset.querySelector(query);
            if (!!btn) {
                btn.onclick = callback;
            }
        };

        const setupNextBtn = (fieldset, index) => {
            setupBtn(fieldset, "input.btn-next", (e) => {
                e.preventDefault();
                if (isAllRequiredInputFieldFilled(index)) {
                    forward(index);
                    selectFirstInputField(index + 1);
                } else {
                    selectNonValidFieldRequired(index);
                }
            });
        };

        const setupPrevBtn = (fieldset, index) => {
            setupBtn(fieldset, "input.btn-prev", (e) => {
                e.preventDefault();
                backward(index);
                selectFirstInputField(index - 1);
            });
        };

        const setupSubmit = (form) => {
            form.onsubmit = (e) => {
                e.preventDefault();
                if (isAllRequiredInputFieldsValid()) {
                    forward();
                    mail.send(form)
                        .then(_ => sentFormFeedback('success'))
                        .catch(_ => sentFormFeedback('error'));
                }
                return false;
            };
        };

        const setupReset = (form) => {
            form.onreset = () => {
                let section = document.querySelector('section');
                section.classList.remove('error');
                section.classList.remove('success');
                steps.uncheckReduce(currFieldSetIndex);
                navigate(currFieldSetIndex = 0);
                selectFirstField(form);
            }
        };

        const sentFormFeedback = (type, timeout) => {
            let section = document.querySelector('section');
            return (section.classList.contains(type) || section.classList.add(type)) &
                setTimeout(() => form.reset(), timeout || 2000);
        };

        const selectInputField = (input, timeout) => {
            if (!!input) {
                setTimeout(() => {
                    input.focus();
                    input.select();
                }, timeout || 20);
            }
        };

        const selectFirstInputField = (index) => {
            let input = fieldsetArr[index].querySelector("input:required");
            selectInputField(input, 400);
        };

        const invokeClick = (index, query) => {
            let fieldset = fieldsetArr[index];
            let target = fieldset.querySelector(query);
            if (!!target) {
                target.click();
                return true;
            }
            return false;
        };

        const isValidInputField = (input) => {
            return validators.validate(input);
        };

        const isAllRequiredInputFieldFilled = (index) => {
            const fieldset = fieldsetArr[index];
            const fields = fieldset.querySelectorAll("input:required");
            for (let field of fields) {
                if (!isValidInputField(field)) {
                    return false;
                }
            }
            return true;
        };

        const isAllRequiredInputFieldsValid = () => {
            for (let i in fieldsetArr) {
                if (!isAllRequiredInputFieldFilled(i)) {
                    selectNonValidFieldRequired(i);
                    return false;
                }
            }
            return true;
        };

        const selectNonValidFieldRequired = (index) => {
            const fieldset = fieldsetArr[index];
            const fields = fieldset.querySelectorAll("input:required");
            for (let field of fields) {
                if (!isValidInputField(field)) {
                    selectInputField(field);
                    break;
                }
            }
        };

        const selectFirstField = (form) => {
            const field = form.querySelector("input:required");
            selectInputField(field);
        };

        const isLastInputSetFieldSelected = (index, currentField) => {
            const fieldset = fieldsetArr[index];
            const fields = Array.from(fieldset.querySelectorAll("input:required"));
            return fields && fields.pop() === currentField;
        };

        const requestNextBtnOrSubmit = (index) => {
            return invokeClick(index, "input.btn-next") ||
                invokeClick(index, "input[type='submit']");
        };

        window.addEventListener('keydown', function (e) {
            if (isEnterKey(e) || isTabKey(e)) {
                if (e.target.nodeName == 'INPUT') {
                    e.preventDefault();
                    if (isTabKey(e) && isLastInputSetFieldSelected(currFieldSetIndex, e.target)) {
                        return false;
                    } else if (isAllRequiredInputFieldFilled(currFieldSetIndex)) {
                        requestNextBtnOrSubmit(currFieldSetIndex);
                    } else {
                        selectNonValidFieldRequired(currFieldSetIndex);
                    }
                    return false;
                }
            }
        }, true);

        for (let i in fieldsetArr) {
            const index = parseInt(i);
            const fieldset = fieldsetArr[index];
            setupNextBtn(fieldset, index);
            setupPrevBtn(fieldset, index);
        }
        setupSubmit(form);
        setupReset(form);
    }
};