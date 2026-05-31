export const GameInput = {
    left: false,
    right: false,
    up: false,
    down: false,
    A: false,
    B: false
}
const controls = document.getElementById('controls-mobile');

const isMobile =
    ('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0);

if (!isMobile) {
    controls.style.display = 'none'
}

function bindButton(id, key) {
    const btn = document.getElementById(id);
    const press = (e) => {
        e.preventDefault();
        GameInput[key] = true;
    }
    const release = (e) => {
        e.preventDefault();
        GameInput[key] = false;
    }
    btn.addEventListener('touchstart', press);
    btn.addEventListener('touchend', release);

}

bindButton('left', 'left');
bindButton('right', 'right');
bindButton('up', 'up');
bindButton('down', 'down');

bindButton('A', 'A');
bindButton('A', 'B');

// window.addEventListener('contextmenu', e => {
//     e.preventDefault();
// });