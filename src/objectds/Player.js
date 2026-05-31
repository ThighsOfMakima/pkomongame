export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, charOBJ) {
        super(scene, x, y, charOBJ.charSprite);
        scene.add.existing(this);
        this.scene = scene;
        this.tileSize = scene.editabletilemap.tileWidth;
        this.charObj = charOBJ;
        this.tileX = Math.floor(x / this.tileSize);
        this.tileY = Math.floor(y / this.tileSize);

        this.x = (this.tileX * this.tileSize) + (this.tileSize / 2);
        this.y = (this.tileY * this.tileSize) + (this.tileSize / 2);

        this.moving = false;
        this.nextMove = null;
        this.moveTween = null;
        this.bufferedMove = null;
        this.moveDuration = 180;
        this.state = 'idle';
        this.portalExposure = 0;

        this.moveProgress = 0;

        this.targetX = this.x;
        this.targetY = this.y;
        console.log(this.targetX, this.targetY)
        this.moveStartX = this.x;
        this.moveStartY = this.y;
        this.ability = charOBJ.activeSkillFunc;

    }

    move(dx, dy) {
        if (this.state === 'stunned') {
            return;
        }
        if (this.moving) {
            this.bufferedMove = { dx, dy };
            return;
        }
        const nextTileX = this.tileX + dx;
        const nextTileY = this.tileY + dy;

        if (this.isBlocked(nextTileX, nextTileY)) {
            this.setFacing(dx, dy);
            return;
        }

        this.tileX = nextTileX;
        this.tileY = nextTileY;

        this.startMove(
            this.tileX * this.tileSize + this.tileSize / 2,
            this.tileY * this.tileSize + this.tileSize / 2,
            dx, dy
        );

        this.walkAnimation(dx, dy);

    }

    setAbility(ability) {

        this.ability = ability;
        if (!!ability.isPassive) {
            this.ability.passive();
        }

    }

    forceMoveTo(tileX, tileY) {

        this.bufferedMove = null;
        this.moving = false;

        this.tileX = tileX;
        this.tileY = tileY;

        this.startMove(
            tileX * this.tileSize + this.tileSize / 2,
            tileY * this.tileSize + this.tileSize / 2,
            0, 0
        );

    }

    stun(ms) {

        this.state = 'stunned';

        this.moving = false;
        this.bufferedMove = null;

        this.moveProgress = 1;

        this.scene.time.delayedCall(ms, () => {
            this.state = 'idle';
        })

        this.stunEffect()
    }
    stunEffect() {

        const stunTween = this.scene.tweens.add({
            targets: this,
            duration: 3000,
            scaleY: 0.7,
            yoyo: true,
            repeat: -1,
            ease: 'Linear',
        });

        setTimeout(() => {
            stunTween.stop();
        }, 3000)
    }
    snapToTile(tileX, tileY, moveProgress) {
        this.moving = false;
        this.bufferedMove = null;
        this.moveProgress = moveProgress;
        this.startX = null;
        this.startY = null;
        this.targetX = null;
        this.targetY = null;
        this.scene.tweens.killTweensOf(this);
        this.tileX = tileX;
        this.tileY = tileY;

        this.setPosition(

            tileX * this.tileSize
            + this.tileSize / 2,

            tileY * this.tileSize
            + this.tileSize / 2

        );

    }
    updatePortalEffect() {
        const progress =
            Math.min(
                this.portalExposure / 10,
                1
            );
        this.scene.tweens.add({

            targets:
                this,

            alpha:
                1 - progress * 0.7,

            duration:
                500

        });
        const darkness =
            Math.floor(
                255 * (1 - progress)
            );

        const tint =
            Phaser.Display.Color.GetColor(
                darkness,
                darkness,
                darkness
            );

        this.setTint(tint);

    }
    isBlocked(tileX, tileY) {
        const tile = this.scene.walls.getTileAt(tileX, tileY);
        const isBorder = this.scene.unbreakable.getTileAt(tileX, tileY);
        return tile !== null || isBorder !== null;
    }

    startMove(targetX, targetY, dx, dy) {

        this.moving = true;

        this.moveStartX =
            this.x;

        this.moveStartY =
            this.y;

        this.targetX =
            targetX;

        this.targetY =
            targetY;

        this.moveProgress =
            0;

        this.setFacing(
            dx,
            dy
        );

        this.walkAnimation(
            dx,
            dy
        );

    }

    dashHitWall() {

        this.scene.cameras.main.shake(
            120,
            0.015
        );
        this.setScale(0.7, 1.3);
        this.scene.tweens.add({
            targets: this,
            scaleX: 1,
            scaleY: 1,
            duration: 180,
            ease: "Bounce.easeOut"
        });

    }
    setFacing(dx, dy) {

        this.facing = { x: dx, y: dy };

        if (dx !== 0) {
            this.flipX = dx < 0;
        }
    }

    walkAnimation(dx, dy) {

        this.scaleX = 1.02;
        this.scaleY = 0.98;

        this.scene.time.delayedCall(60, () => {
            this.scaleX = 1;
            this.scaleY = 1;
        });

    }
    update(delta) {

        if (
            !this.moving
        )
            return;



        this.moveProgress +=
            delta /
            this.moveDuration;



        if (
            this.moveProgress >= 1
        ) {

            this.moveProgress =
                1;

            this.x =
                this.targetX;

            this.y =
                this.targetY;

        }



        this.x =
            Phaser.Math.Linear(

                this.moveStartX,

                this.targetX,

                this.moveProgress

            );



        this.y =
            Phaser.Math.Linear(

                this.moveStartY,

                this.targetY,

                this.moveProgress

            );



        if (
            this.moveProgress === 1
        ) {

            this.moving =
                false;



            if (
                this.bufferedMove
            ) {

                const move =
                    this.bufferedMove;

                this.bufferedMove =
                    null;

                this.move(
                    move.dx,
                    move.dy
                );

            }

        }

    }
    takeDamage(score) {
        if (this.invulnerable || this.isShielded) {
            return;
        }
        this.scene.LevelMgr.score -= score;
        this.scene.LevelMgr.showFloatingText(this.x, this.y, -200, 'lose');
        this.invulnerability();

    }
    invulnerability() {
        this.invulnerable = true;

        this.moveDuration *= 2;

        this.scene.tweens.add({
            targets: this,
            alpha: 0.3,
            duration: 300,
            yoyo: true,
            onComplete: () => {
                this.alpha = 1;
                this.invulnerable = false;
                this.moveDuration /= 2;
            }
        })
    }

}