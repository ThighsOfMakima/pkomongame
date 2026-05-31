import Ability from "./Ability.js";

export default class DashAbility extends Ability {
    constructor(scene, player) {
        super(scene, player)
        this.cooldown = 5000;
        this.range = 3;
    };

    use(time) {

        if (!super.use(time)) return;

        const dir = this.player.facing;

        let finalX = this.player.tileX;
        let finalY = this.player.tileY;

        for (let i = 1; i <= this.range; i++) {

            const nx = this.player.tileX + dir.x * i;
            const ny = this.player.tileY + dir.y * i;
            if (this.scene.LevelMgr.isWall(nx, ny)) {

                this.player.dashHitWall();

                this.player.stun(3000);

                break;

            }

            finalX = nx;
            finalY = ny;


        }

        this.player.forceMoveTo(finalX, finalY);

    }
}