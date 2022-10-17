(() => {

    let currFieldSetIndex = 0;

    const steps = Array.from(document.querySelectorAll(".step .circle"));
    const form = document.getElementById("signup-form");
    const fieldsetArr = Array.from(form.getElementsByTagName("fieldset"));
    const lastFieldSetIndex = fieldsetArr.length - 1;

    window.addEventListener('keydown', function (e) {
        if (e.keyIdentifier == 'U+000A' || e.keyIdentifier == 'Enter' || e.keyCode == 13) {
            if (e.target.nodeName == 'INPUT') {
                e.preventDefault();
                requestNextBtnOrSubmit(currFieldSetIndex);
                return false;
            }
        }
    }, true);

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

    const selectInputField = (index) => {
        let input = fieldsetArr[index].querySelector("input:required");
        if (!!input) {
            setTimeout(() => {
                input.focus();
            }, 400);
        }
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

    const requestNextBtnOrSubmit = (index) => {
        return invokeClick(index, "input.btn-next") ||
            invokeClick(index, "input[type='submit']");
    };

    for (let i in fieldsetArr) {
        const index = parseInt(i);
        const fieldset = fieldsetArr[index];
        setupBtn(fieldset, "input.btn-next", () => {
            forward(index);
            selectInputField(index + 1);
        });
        setupBtn(fieldset, "input.btn-prev", () => {
            backward(index);
            selectInputField(index - 1);
        });
    }
})();