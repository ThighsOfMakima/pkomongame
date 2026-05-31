export default class Ability {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;
        this.cooldown = 7000;
        this.lastUsed = 0;
        this.howMuchUsed = 0;
        this.needsDirection = false;
        this.abilityTint = 0xffffff;
    }

    canUse(time) {

        return !this.howMuchUsed || time > this.lastUsed + this.cooldown;
    }

    use(time) {
        if (!this.canUse(time)) {
            return false;
        }
        this.howMuchUsed++;
        this.lastUsed = time;
        this.cd = (this.lastUsed + this.cooldown - time);
        this.levelTimer = this.scene.time.addEvent({
            delay: 300,
            loop: true,
            callback: () => {
                this.cd -= 300;
                if (this.cd <= 0) {
                    this.scene.skillStatus.setText('[ГОТОВО]').setColor('limegreen');
                    this.levelTimer.remove();
                } else {
                    this.scene.skillStatus.setText((this.cd / 1000).toFixed(1) + 'с').setColor('red');
                }
            }
        });
        return true;
    }
    setCooldownLeft(time, statusBar) {
        let cd = (this.lastUsed + this.cooldown - time) / 1000
        let text = ''
        if (cd <= 0) {
            text = '[ГОТОВО]';
            statusBar.setColor('limegreen');
        } else {
            text = cd.toFixed(1) + 'с';
            statusBar.setColor('red');
        }
        return text;
    }
    showAbilityRadius(radius) {
        if (this.abilityRadius) {
            this.abilityRadius.destroy();
        }
        this.abilityRadius = this.scene.add.graphics();
        this.abilityRadius.setDepth(100);
        this.abilityRadius.fillStyle(
            this.abilityTint,
            0.2
        );

        this.abilityRadius.lineStyle(
            2,
            this.abilityTint,
            0.8
        );

        this.abilityRadius.fillCircle(
            0,
            0,
            radius
        );

        this.abilityRadius.strokeCircle(
            0,
            0,
            radius
        );
        this.abilityRadius.setPosition(this.scene.player.x, this.scene.player.y);
    }

    updateAbilityRadius() {
        if (this.abilityRadius) {
            this.abilityRadius.setPosition(this.scene.player.x, this.scene.player.y);
        }
    }
    hideAbilityRadius() {
        if (!this.abilityRadius) {
            return;
        }
        this.abilityRadius.destroy();
        this.abilityRadius = null;
    }
}