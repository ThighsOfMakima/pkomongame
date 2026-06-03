export const GameInput = {
    left: false,
    right: false,
    up: false,
    down: false,
    A: false,
    B: false,
    isClicked(button) {
        if (this[button]) {
            this[button] = false;
            return true;
        }
    },
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

const dpad = document.querySelector(".dpadPic");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const up = document.querySelector(".up");
const down = document.querySelector(".down");
const A = document.getElementById("A");
const B = document.getElementById("B");

A.addEventListener('pointerdown', () => {
    A.style.opacity = 0.8;
})

A.addEventListener('pointerup', () => {
    A.style.opacity = 1;
})

B.addEventListener('pointerdown', () => {
    B.style.opacity = 0.8;
})

B.addEventListener('pointerup', () => {
    B.style.opacity = 1;
})

left.addEventListener("pointerdown", () => {
    dpad.classList.add("dpad-left");
});

left.addEventListener("pointerup", () => {
    dpad.classList.remove("dpad-left");
});

right.addEventListener("pointerdown", () => {
    dpad.classList.add("dpad-right");
});

right.addEventListener("pointerup", () => {
    dpad.classList.remove("dpad-right");
});

up.addEventListener("pointerdown", () => {
    dpad.classList.add("dpad-up");
});

up.addEventListener("pointerup", () => {
    dpad.classList.remove("dpad-up");
});
down.addEventListener("pointerdown", () => {
    dpad.classList.add("dpad-down");
});

down.addEventListener("pointerup", () => {
    dpad.classList.remove("dpad-down");
});

