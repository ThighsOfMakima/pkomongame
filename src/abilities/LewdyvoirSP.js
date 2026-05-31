import Ability from "./Ability.js";

export default class LewdyvoirSP extends Ability {
    constructor(scene, player) {
        super(scene, player)
        this.cooldown = 5000;
        this.range = 3;
    };
    use() {
        this.player.moveDuration = 90;
        const enemies = [...this.scene.LevelMgr.enemiesX.getChildren(), ...this.scene.LevelMgr.enemiesY.getChildren()];
        enemies.forEach(enemy => {
            enemy.destroyEnemy();
        })
    };
}