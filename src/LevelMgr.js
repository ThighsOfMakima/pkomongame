import Enemy from "./objectds/Enemy.js";
import Player from "./objectds/Player.js";
import { GameInput } from "./GameInput.js";

export default class LevelMgr {
    constructor(scene, requiredToCollect = 3, lvlIndex = 1, data) {
        this.scene = scene;
        this.requiredTotal = requiredToCollect;
        this.requiredCollected = 0;
        this.correctDirections = [{ x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }]
        this.requiredItems = null;
        this.scoreMultiplier = 1;
        this.optionalItems = null;
        this.score = data.score || 0;

        this.level = {
            requiredCollected: 0,
            requiredTarget: 3,
            timeLeft: 90
        }
        this.lvlIndex = lvlIndex;
        this.scene.exitOpened = false;


    }
    createUI() {
        this.scoreUI = this.scene.score;
        this.timerUI = this.scene.timer;
        this.profileName = this.scene.profileName.setScrollFactor(0).setDepth(10000);
        this.skillStatus = this.scene.skillStatus.setScrollFactor(0).setDepth(10000);
        this.scene.skillName = this.scene.skillName.setScrollFactor(0).setDepth(10000);
        this.charName = this.scene.charName.setScrollFactor(0).setDepth(10000).setText(this.scene.player.charObj.name.toUpperCase()).setColor(this.scene.player.charObj.skillColor || '#ffffff');
        this.requiredItemsUI = this.scene.requiredItems;
        this.scene.bottomUI.setScrollFactor(0).setDepth(10000);
        this.scene.topUIHD.setScrollFactor(0).setDepth(10000);
        this.scene.skillBar.setScrollFactor(0).setDepth(10000);
        this.scoreUI.setScrollFactor(0).setDepth(10000);
        this.timerUI.setScrollFactor(0).setDepth(10000);
        this.scene.bottomUI.setDepth(10000);
        this.scene.topUIHD.setDepth(10000);
        this.requiredItemsUI.setScrollFactor(0).setDepth(10000);
        this.scene.skillName.setText(this.scene.player.charObj.activeSkillName);
        this.scene.skillName.setColor(this.scene.player.charObj.skillColor || '#ffffff');
        this.refreshUI()
    }
    refreshUI() {
        this.scoreUI.setText(this.score);
        this.timerUI.setText(this.level.timeLeft);
        this.requiredItemsUI.setText(`${this.level.requiredCollected} / ${this.requiredTotal}`);
    }
    startLevel() {
        this.score += 9000;
        this.level.requiredCollected = 0;
        this.level.timeLeft = 90;

        this.startLevelTimer();
        this.prepareItems();
        this.createEnemies();
        this.createUI();
        this.refreshUI();
    }
    startLevelTimer() {
        if (this.levelTimer) {
            this.levelTimer.remove();
        }
        this.levelTimer = this.scene.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () => {
                this.level.timeLeft--;
                this.score -= 100;
                if (this.score < 0) {
                    this.score = 0;
                }
                this.refreshUI();
                if (this.level.timeLeft <= 0) {
                    this.failLevel();
                }
            }
        })
    }
    failLevel() {
        this.scene.scene.start('MainMenu');
    }
    prepareItems() {
        this.reqItems = this.scene.add.group();
        this.optItems = this.scene.add.group();

        this.scene.objects_required.forEachTile(obj => {
            if (obj.index === -1) {
                return;
            }
            this.scene.add.sprite()
            const sprite =
                this.scene.add.sprite(
                    obj.pixelX + 64,
                    obj.pixelY + 64,
                    "patchgoldentupozavr"
                );
            sprite.setScale(0.75);
            sprite.setDepth(100)
            sprite.itemType = 'required';
            this.reqItems.add(sprite);
        })
        this.scene.objects_optional.forEachTile(obj => {
            if (obj.index === -1) {
                return;
            }
            const sprite =
                this.scene.add.sprite(
                    obj.pixelX + 64,
                    obj.pixelY + 64,
                    "coin"
                );
            sprite.setScale(0.15);
            this.scene.tweens.add({
                targets: sprite,
                y: sprite.y - 5,
                duration: 400,
                yoyo: true,
                repeat: -1,
                ease: "Sine.easeInOut"
            })
            sprite.setDepth(100);
            sprite.itemType = 'optional';
            this.optItems.add(sprite);
        })
    }
    checkItems() {
        [
            ...this.reqItems.getChildren(),
            ...this.optItems.getChildren()
        ]
            .forEach(item => {
                if (
                    !item.active
                )
                    return;
                const dist =
                    Phaser.Math.Distance.Between(
                        this.scene.player.x,
                        this.scene.player.y,
                        item.x,
                        item.y

                    );


                if (
                    dist < 18
                ) {
                    this.collectItem(
                        item
                    );
                }
            });

    }
    collectItem(item) {

        item.active =
            false;
        item.isBeingPulled = false;
        this.scene.LevelMgr.showFloatingText(item.x, item.y, item.itemType == 'required' ? 1000 : 500, 'gain');
        this.scene.tweens.add({

            targets: item,

            scale: 0.3,

            alpha: 0,

            duration: 150,

            onComplete: () => {

                item.destroy();

            }

        });
        if (
            item.itemType ===
            "required"
        ) {

            this.score += 1000 * this.scoreMultiplier;
            this.level.requiredCollected = this.level.requiredCollected == this.requiredTotal ? this.level.requiredCollected : this.level.requiredCollected + 1;

            if (

                this.level.requiredCollected
                >=
                this.requiredTotal

            ) {

                this.unlockExit();

            }

        }

        else {

            this.score += 500 * this.scoreMultiplier;

        }


        this.refreshUI();

    }
    createEnemies() {
        this.enemiesX = this.scene.add.group();
        this.enemiesY = this.scene.add.group();
        this.scene.enemiesX.forEachTile(obj => {
            if (obj.index === -1) {
                return;
            }
            const enemy = new Enemy(
                this.scene,
                obj.pixelX + 64,
                obj.pixelY + 64,
                "pkoball",
                "horizontal"
            );
            enemy.setDepth(100);
            this.enemiesX.add(enemy);
        }
        );
        this.scene.enemiesY.forEachTile(obj => {
            if (obj.index === -1) {
                return;
            }
            const enemy = new Enemy(
                this.scene,
                obj.pixelX + 64,
                obj.pixelY + 64,
                "pkoball",
                "vertical"
            );
            enemy.setDepth(100);
            this.enemiesY.add(enemy);
        });
        this.scene.bottomUIcont.setDepth(1000);
        this.scene.topUIcont.setDepth(1001);
        this.scene.uicontainer.setDepth(1001);
    }
    checkEnemyHit() {
        [...this.enemiesX.getChildren(), ...this.enemiesY.getChildren()].forEach(enemy => {
            if (this.scene.player.invulnerable) {
                return;
            }
            const dist = Phaser.Math.Distance.Between(
                this.scene.player.x,
                this.scene.player.y,
                enemy.x,
                enemy.y
            );
            if (dist < 64) {
                this.scene.player.takeDamage(200);
            };
        });
    }
    createPlayer(charObj) {
        this.scene.player = new Player(this.scene, this.scene.player_spawn.x, this.scene.player_spawn.y, charObj);
        this.scene.player.setAbility(new charObj.activeSkillFunc(this.scene, this.scene.player));
        this.scene.player.width = 128;
        this.scene.player.height = 128;
    }
    getHeldDirection() {
        if (this.scene.cursors.left.isDown || GameInput.left)
            return { x: -1, y: 0 };

        if (this.scene.cursors.right.isDown || GameInput.right)
            return { x: 1, y: 0 };

        if (this.scene.cursors.up.isDown || GameInput.up)
            return { x: 0, y: -1 };

        if (this.scene.cursors.down.isDown || GameInput.down)
            return { x: 0, y: 1 };

        return null;

    }
    setupCamera() {
        this.scene.cameras.main.startFollow(
            this.scene.player,
            true,
            0.08,
            0.08
        );

        this.scene.cameras.main.setZoom(0.75);

        this.scene.cameras.main.setDeadzone(0, 0);
    }
    isWall(x, y) {
        const tile = this.scene.walls.getTileAt(x, y);
        return tile !== null;
    }
    teleportKeepCamera(player, tileX, tileY) {

        const cam = this.scene.cameras.main;
        const offsetX =
            player.x - cam.midPoint.x;

        const offsetY =
            player.y - cam.midPoint.y;
        player.moving = false;
        player.bufferedMove = null;

        const newX =
            tileX * player.tileSize
            + player.tileSize / 2;

        const newY =
            tileY * player.tileSize
            + player.tileSize / 2;

        player.snapToTile(
            tileX,
            tileY,
            player.moveProgress
        );
        player.tileX =
            tileX;

        player.tileY =
            tileY;
        cam.scrollX =
            newX
            - cam.width / 2
            - offsetX;

        cam.scrollY =
            newY
            - cam.height / 2
            - offsetY;
        cam.preRender();
    }
    updateWorldDarkness() {

        const progress =
            Math.min(
                this.scene.player.portalExposure / 10,
                1
            );
        this.scene.tweens.add({

            targets:
                this.scene.darkness,

            alpha:
                progress * 0.85,

            duration:
                500
        });
        this.scene.player.setAlpha(
            1 - progress * 0.7
        );

    }
    handleReturner() {
        this.scene.player.portalExposure++;
        setTimeout(() => {
            this.scene.player.updatePortalEffect.bind(this.player);
            this.updateWorldDarkness();;
        });
        this.scene.player.updatePortalEffect();
        if (
            this.scene.player.portalExposure > 6
        ) {

            this.scene.player.scaleY =
                0.98;
        }
        if (
            this.scene.player.portalExposure >= 10
        ) {
            this.triggerScreamer();
        }
        this.teleportKeepCamera(
            this.scene.player,
            this.scene.player.tileX,
            this.scene.player.tileY - 6
        );
    }
    triggerScreamer() {
        if (this.screamerStarted) {
            return;
        }
        this.screamerStarted = true;
        this.scene.tweens.killAll();
        this.scene.darkness.setAlpha(1);
        this.scene.darkness.setScale(50);
        this.scene.darkness.setDepth(999998);
        this.scene.topUIcont.setAlpha(0);
        this.scene.bottomUI.setAlpha(0);
        const img = this.scene.screamer;

        this.scene.time.delayedCall(1000, () => {
            img.setOrigin(0.5);
            img.setScrollFactor(0);
            img.setDepth(999999);
            img.setScale(1);
            img.setAlpha(1);
        });
        this.scene.time.delayedCall(1300, () => {

            this.scene.scene.start("MainMenu", {
                fromScreamer: true
            });

        });

    }
    createAimIndicator() {
        if (!this.scene.player.ability.needsDirection) {
            return;
        }
        this.aim = this.scene.add.sprite(
            0,
            0,
            'tileFrame'
        )
        this.aim.setDepth(100).setAlpha(0.8).setScale(0.25);
    }
    prepareLevelData(data) {
        this.createPlayer(data.char)
        this.scene.char = data.char;
        this.startLevel()
        if (this.scene.darkness && this.scene.screamer) {
            this.scene.darkness.setOrigin(0, 0);
            this.scene.darkness.setScrollFactor(0);
            this.scene.darkness.setDepth(9998);
            this.scene.darkness.setAlpha(0)
            this.scene.screamer.setOrigin(0, 0);
            this.scene.screamer.setScrollFactor(0);
            this.scene.screamer.setDepth(999999);
            this.scene.screamer.setAlpha(0)
        }
        this.scene.walls.setCollisionByExclusion([-1]);
        this.scene.unbreakable.setCollisionByExclusion([-1]);
        this.setupCamera();
        this.createAimIndicator();
        this.scene.moveDelay = 0;
        this.scene.heldDir = null;
        this.scene.inputDir = null;
        this.scene.exitUnlocked = false;
        this.scene.input.keyboard.on('keydown', (event) => {
            if (event.code === 'ArrowLeft') this.scene.inputDir = { x: -1, y: 0 };
            if (event.code === 'ArrowRight') this.scene.inputDir = { x: 1, y: 0 };
            if (event.code === 'ArrowUp') this.scene.inputDir = { x: 0, y: -1 };
            if (event.code === 'ArrowDown') this.scene.inputDir = { x: 0, y: 1 };
        });
        if (this.scene.inputDir && !this.scene.player.moving) {
            this.scene.player.move(this.scene.inputDir.x, this.scene.inputDir.y);
        }
        this.scene.cursors = this.scene.input.keyboard.createCursorKeys()
        this.scene.tweens.add({
            targets: this.scene.player,
            duration: 300,
            scaleY: 1.02,
            scaleX: 0.98,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.inOut'
        })

        this.scene.spaceKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }
    updateLevelData(time, delta) {
        this.scene.player
            .update(
                delta
            );



        const dir = this.scene.LevelMgr.getHeldDirection();
        this.scene.LevelMgr.updateAimIndicator();

        if (this.scene.player.ability.abilityRadius) {
            this.scene.player.ability.updateAbilityRadius();
        }




        if (dir && !this.scene.player.moving) {
            this.scene.player.move(dir.x, dir.y);
        }
        this.scene.LevelMgr.checkEnemyHit();
        if (Phaser.Input.Keyboard.JustDown(this.scene.spaceKey) || GameInput.A) {
            this.scene.player.ability.use(this.scene.time.now);
            this.scene.LevelMgr.refreshUI();
        }
        this.scene.LevelMgr.checkItems()
        if (this.scene.returner) {
            const overlap = Phaser.Geom.Intersects.RectangleToRectangle(
                this.scene.player.getBounds(),
                this.scene.returner.getBounds()
            );
            if (overlap) {
                this.scene.LevelMgr.handleReturner();
            }
        }

        if (this.scene.exitOpened) {
            const overlap = Phaser.Geom.Intersects.RectangleToRectangle(
                this.scene.player.getBounds(),
                this.scene.exit.getBounds()
            );
            if (overlap) {
                this.lvlIndex++;
                if (this.lvlIndex >= 4) {
                    this.scene.scene.start('Finish', {
                        score: this.score,
                        char: this.scene.char
                    }
                    );
                }
                this.scene.scene.start("Game" + this.lvlIndex, {
                    lvl: this.lvlIndex,
                    score: this.score,
                    char: this.scene.char
                });
            }
        }
    }
    updateAimIndicator() {
        if (!this.aim) {
            return;
        }
        const dir = this.scene.player.facing || { x: 1, y: 1 };
        const x = this.scene.player.tileX + dir.x;
        const y = this.scene.player.tileY + dir.y;
        this.aim.setPosition(x * this.scene.player.tileSize + this.scene.player.tileSize / 2,
            y * this.scene.player.tileSize + this.scene.player.tileSize / 2
        )
    }
    showFloatingText(x, y, value, type = 'gain') {
        const color = type == "gain" ? "#ffd700" : "#ff4d4d";
        const text = this.scene.add.text(x, y - 64, (value > 0 ? "+" : "") + value, {
            fontSize: '40px',
            color: color,
            font: 'uvKits'
        })
        text.setScale(4);
        text.setDepth(9999);
        this.scene.tweens.add({
            targets: text,
            y: y - 30,
            alpha: 1,
            scale: 1,
            duration: 1000,
            ease: 'Power1',
            onComplete: () => {
                text.destroy();
            }
        })
    }
    getEnemyAt(tileX, tileY) {
        return [...this.enemiesX.getChildren(), ...this.enemiesY.getChildren()].find(enemy => {
            return (
                enemy.tileX === tileX && enemy.tileY === enemy.tileY && enemy.active
            )
        })
    }
    unlockExit() {
        if (this.scene.exitOpened) {
            return;
        }
        const text = this.scene.add.text(this.scene.player.tileX + 128, 257, '[ВИХІД ВІДКРИТО]', {
            color: '#00f715ff',
            fontFamily: 'uvKits',
            fontSize: '66px',
        })
        this.levelTimer = this.scene.time.addEvent({
            delay: 500,
            loop: true,
            callback: () => {
                text.visible = !text.visible;
            }
        })
        text.setScrollFactor(0);
        this.scene.bars.destroy();
        this.scene.exitOpened = true;
    }
}
