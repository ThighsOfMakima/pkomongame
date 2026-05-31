export default class Collectibles extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, type) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.type = type;

        this.sprite =
            scene.add.sprite(
                x,
                y,
                texture
            );

        this.collected = false;
    }


    collect() {
        if (this.collected)
            return;
        this.collected = true;
        this.sprite.destroy();

    }
}