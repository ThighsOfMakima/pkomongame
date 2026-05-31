import Ability from "./Ability.js";

export default class BreakWall extends Ability {

    constructor(scene, player) {
        super(scene, player);

        this.cooldown = 7000;
        this.range = 1;
        this.needsDirection = true;
    }

    use(time) {

        if (!super.use(time)) return false;

        const dir = this.player.facing;


        const tx =
            this.player.tileX + dir.x;

        const ty =
            this.player.tileY + dir.y;

        const enemy = this.scene.LevelMgr.getEnemyAt(tx, ty);
        if (enemy) {
            enemy.destroyEnemy();
        }
        const tile =
            this.scene.walls.getTileAt(tx, ty);

        if (!tile)
            return false;


        this.scene.walls.removeTileAt(tx, ty);

        this.scene.cameras.main.shake(160, 0.01);


        return true;

    }

}