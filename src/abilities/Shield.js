import Ability from './Ability.js';

export default class Shield extends Ability {
    constructor(scene, player) {
        super(scene, player);
        this.cooldown = 10000;
        this.duration = 4000;
    }

    use(time) {
        if (!super.use(time)) {
            return false;
        }
        this.activateShield();
    }

    activateShield() {
        this.player.isShielded = true;
        this.player.setTint(0x66ccff);
        this.startTime = this.scene.time.now;

        this.scene.time.addEvent({
            delay: 50,
            loop: true,
            callback: () => {
                if (this.scene.time.now - this.startTime >= this.duration) {
                    this.deactivateShield()
                }
            }
        });
    };
    deactivateShield() {
        this.player.isShielded = false;
        this.player.clearTint();
    }
}


