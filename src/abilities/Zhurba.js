import Ability from './Ability.js';

export default class Zhurba extends Ability {

    constructor(scene, player) {
        super(scene, player);

        this.cooldown = 5000;
        this.duration = 3000;
        this.radius = 500;
        this.abilityTint = 0x638b91;
    }

    use(time) {
        if (!super.use(time)) {
            return false;
        }
        this.activateSlowZone();
    }
    activateSlowZone() {
        this.active = true;
        this.endTime = this.scene.time.now + this.duration;
        this.showAbilityRadius(this.radius);
        this.player.setTint(0x638b91);
        this.player.stun(3000);
        this.scene.time.addEvent({
            delay: 50,
            loop: true,
            callback: () => {
                if (!this.active) {
                    return;
                }
                if (this.scene.time.now > this.endTime) {
                    this.active = false;
                    this.hideAbilityRadius();
                    return;
                }
                this.slowEnemies();
            }
        })
    }
    slowEnemies() {
        const enemies = [...this.scene.LevelMgr.enemiesX.getChildren(), ...this.scene.LevelMgr.enemiesY.getChildren()];
        enemies.forEach(enemy => {
            if (enemy.active && enemy.beingSlowed) {
                return;
            }
            const dist = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, enemy.x, enemy.y);
            if (dist > this.radius) {
                return;
            }
            enemy.speed *= 8;
            enemy.beingSlowed = true;
            enemy.setTint(0xffd700)
            this.scene.time.delayedCall(3000, () => {
                enemy.speed /= 8;
                enemy.clearTint();
                enemy.beingSlowed = false;
            });
        })
    }
}