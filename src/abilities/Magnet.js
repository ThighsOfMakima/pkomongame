import Ability from './Ability.js';

export default class MagnetAbility extends Ability {
    constructor(scene, player) {
        super(scene, player);
        this.cooldown = 7000;
        this.duration = 2000;
        this.radius = 500;
        this.abilityTint = 0xffd700;
    };
    use(time) {
        if (!super.use(time)) {
            return;
        }
        this.startMagnet();
    }
    startMagnet() {
        this.active = true;
        this.endTime = this.scene.time.now + this.duration;
        this.player.setTint(0xffd700);
        this.showAbilityRadius(this.radius);
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
                    this.hideAbilityRadius();
                    return;
                }
                this.pullItems();
            }
        })
    }
    pullItems() {
        const items = this.scene.LevelMgr.optItems.getChildren();

        items.forEach(item => {
            if (!item.active && item.isBeingPulled) {
                return;
            }
            item.isBeingPulled = true;

            const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, item.x, item.y)
            if (dist > this.radius) {
                return;
            }
            this.scene.tweens.add({
                targets: item,
                x: this.player.x,
                y: this.player.y,
                duration: 300,
                ease: 'Power2',
            })
        })
    }
}