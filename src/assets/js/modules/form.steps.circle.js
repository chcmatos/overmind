const _state = (index, state) => {
    let circle = document.querySelector(`.step:nth-child(${index}) .circle`);
    return !!circle && (state ?
        (circle.classList.contains('active') || circle.classList.add('active')) :
        (!circle.classList.contains('active') || circle.classList.remove('active')));
}

const _check = (index) => _state(index, true);
const _uncheck = (index) => _state(index, false);
const _uncheckReduce = (index) => {
    do {
        _uncheck(index);
    } while(--index > 0);
}

export default {
    check: _check,
    uncheck: _uncheck,
    uncheckReduce: _uncheckReduce
}