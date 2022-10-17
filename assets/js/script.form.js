import masks from "./modules/masks.js";
import validators from "./modules/validators.js";

(() => {
    masks.setupAll();

    const forward = (index) => {
        currFieldSetIndex = index + 1;
        form.style.marginLeft = (currFieldSetIndex * -100) + '%';
        if (!steps[index].classList.contains('active')) {
            steps[index].classList.add('active');
        }
    };

    const backward = (index) => {
        currFieldSetIndex = --index;
        form.style.marginLeft = (currFieldSetIndex * -100) + '%';
        if (steps[index].classList.contains('active')) {
            steps[index].classList.remove('active');
        }
    };

    const setupBtn = (fieldset, query, callback) => {
        let btn = fieldset.querySelector(query);
        if (!!btn) {
            btn.onclick = callback;
        }
    };

    const setupNextBtn = (fieldset, index) => {
        setupBtn(fieldset, "input.btn-next", () => {
            if (isAllRequiredInputFieldFilled(index)) {
                forward(index);
                selectFirstInputField(index + 1);
            } else {
                selectNonValidFieldRequired(index);
            }
        });
    };

    const setupPrevBtn = (fieldset, index) => {
        setupBtn(fieldset, "input.btn-prev", () => {
            backward(index);
            selectFirstInputField(index - 1);
        });
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

    const requestNextBtnOrSubmit = (index) => {
        return invokeClick(index, "input.btn-next") ||
            invokeClick(index, "input[type='submit']");
    };

    window.addEventListener('keydown', function (e) {
        if (e.keyIdentifier == 'U+000A' || e.keyIdentifier == 'Enter' || e.keyCode == 13) {
            if (e.target.nodeName == 'INPUT') {
                e.preventDefault();
                if (isAllRequiredInputFieldFilled(currFieldSetIndex)) {
                    requestNextBtnOrSubmit(currFieldSetIndex);
                } else {
                    selectNonValidFieldRequired(currFieldSetIndex);
                }
                return false;
            }
        }
    }, true);

    let currFieldSetIndex = 0;
    const steps = Array.from(document.querySelectorAll(".step .circle"));
    const form = document.getElementById("signup-form");
    const fieldsetArr = Array.from(form.getElementsByTagName("fieldset"));

    for (let i in fieldsetArr) {
        const index = parseInt(i);
        const fieldset = fieldsetArr[index];
        setupNextBtn(fieldset, index);
        setupPrevBtn(fieldset, index);
    }
})();