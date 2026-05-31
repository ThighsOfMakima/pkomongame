import Ability from './Ability.js';

export default class SlowZone extends Ability {

    constructor(scene, player) {
        super(scene, player);
        this.cooldown = 5000;
        this.isPassive = true;
        this.activeUsed = false;
        this.correctDirections = [{ x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }];
    }

    passive(time) {
        this.stoned();
    }
    use(time) {
        this.activeUsed = true;
        this.scene.cameras.main.shake(200);
        this.scene.time.delayedCall(3000, () => {
            this.activeUsed = false;
        })
    }
    stoned() {
        this.scene.time.addEvent({
            delay: 8000,
            loop: true,
            callback: () => {
                if (!this.activeUsed) {
                    this.scene.cameras.main.shake(200);
                    this.controlsTwirl();
                }
            }
        })
    }
    controlsTwirl() {
        let directions = [{ x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }]
        shuffle(directions);
        this.scene.LevelMgr.getHeldDirection = function () {
            if (this.scene.cursors.left.isDown)
                return directions[0];

            if (this.scene.cursors.right.isDown)
                return directions[1];

            if (this.scene.cursors.up.isDown)
                return directions[2];

            if (this.scene.cursors.down.isDown)
                return directions[3];

            return null;

        }
    }
}

function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}