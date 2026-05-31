import Ability from './Ability.js';

export default class SlowZone extends Ability {

    constructor(scene, player) {
        super(scene, player);
        this.cooldown = 6000;
        this.duration = 2000;
        this.isPassive = true;
        this.active = false;
        this.correctDirections = [{ x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }];
    }

    passive(time) {
        this.scene.LevelMgr.scoreMultiplier = 1.5;
        this.stoned();
    }
    use(time) {
        if (!super.use(time)) {
            return false;
        }
        this.scene.cameras.main.shake(200);
        this.active = true;
        this.endTime = this.scene.time.now + this.duration;
        this.player.setTint(0xffffff);
        this.scene.time.addEvent({
            delay: 50,
            loop: true,
            callback: () => {
                if (!this.active) {
                    return;
                }
                if (this.scene.time.now > this.endTime) {
                    this.active = false;
                    this.player.clearTint();
                    return;
                }
            }
        });
    }

    stoned() {
        this.scene.time.addEvent({
            delay: 6000,
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
            console.log(this.scene.player.ability.active);
            if (this.scene.cursors.left.isDown)
                return this.scene.player.ability.active ? this.correctDirections[0] : directions[0];

            if (this.scene.cursors.right.isDown)
                return this.scene.player.ability.active ? this.correctDirections[1] : directions[1];

            if (this.scene.cursors.up.isDown)
                return this.scene.player.ability.active ? this.correctDirections[2] : directions[2];

            if (this.scene.cursors.down.isDown)
                return this.scene.player.ability.active ? this.correctDirections[3] : directions[3];

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