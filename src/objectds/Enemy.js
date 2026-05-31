export default class Enemy extends Phaser.GameObjects.Sprite {

    constructor(
        scene,
        x,
        y,
        texture,
        config
    ) {

        super(
            scene,
            x,
            y,
            texture
        );

        scene.add.existing(this);
        this.setDepth(99);
        this.speed = 200;
        this.scene = scene;

        this.tileSize =
            scene.editabletilemap.tileWidth;

        this.tileX =
            Math.round(
                (x - this.tileSize / 2)
                /
                this.tileSize
            );

        this.tileY =
            Math.round(
                (y - this.tileSize / 2)
                /
                this.tileSize
            );

        this.x =
            this.tileX *
            this.tileSize +
            this.tileSize / 2;

        this.y =
            this.tileY *
            this.tileSize +
            this.tileSize / 2;

        this.dir =
            config === "vertical"

                ?

                {
                    x: 0,
                    y: 1
                }

                :

                {
                    x: 1,
                    y: 0
                };

        this.moving =
            false;

        this.move();

    }
    move() {

        if (
            this.moving
        )
            return;

        this.moving =
            true;


        const nx =
            this.tileX +
            this.dir.x;

        const ny =
            this.tileY +
            this.dir.y;
        if (!this.scene) {
            return;
        }
        if (

            this.scene.LevelMgr.isWall(
                nx,
                ny
            )

        ) {
            this.dir.x *= -1;

            this.dir.y *= -1;

            this.moving =
                false;


            this.scene.time.delayedCall(
                50,
                () => {

                    this.move();

                }
            );

            return;

        }
        this.tileX =
            nx;

        this.tileY =
            ny;


        this.scene.tweens.add({

            targets: this,

            x:
                this.tileX *
                this.tileSize +
                this.tileSize / 2,

            y:
                this.tileY *
                this.tileSize +
                this.tileSize / 2,

            duration:
                this.speed,

            ease:
                "Linear",

            onComplete: () => {

                this.moving =
                    false;

                this.move();

            }

        });

    }
    destroyEnemy() {
        if (!this.active) {
            return;
        }
        this.scene.cameras.main.shake(240, 0.01);
        this.scene.tweens.add({
            targets: this,
            scale: 1.5,
            alpha: 0,
            angle: 180,
            duration: 180,
            onComplete: () => {
                this.destroy();
            }
        })
    }
}