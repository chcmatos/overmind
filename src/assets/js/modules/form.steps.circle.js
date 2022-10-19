const _state = (index, state) => {
    let circle = document.querySelector(`.step:nth-child(${index}) .circle`);
    return !!circle && (state ? 
        (circle.classList.contains('active') || circle.classList.add('active')) :
        (!circle.classList.contains('active') || circle.classList.remove('active')));
}

const _check = (index) => _state(index, true);
const _uncheck = (index) => _state(index, false);

export default {
    check: _check,
    uncheck: _uncheck
}