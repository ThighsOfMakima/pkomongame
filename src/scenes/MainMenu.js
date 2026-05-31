
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class MainMenu extends Phaser.Scene {

	constructor() {
		super("MainMenu");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// bg
		const bg = this.add.image(660, 369, "Знімок екрана 2026-05-11 о 15.12.35");
		bg.scaleX = 2.4963618814518553;
		bg.scaleY = 2.4963618814518553;

		// logo
		const logo = this.add.image(450, 150, "logo");
		logo.scaleX = 0.4990913477279374;
		logo.scaleY = 0.4990913477279374;

		// playButtonCtr
		const playButtonCtr = this.add.container(7, 321);
		playButtonCtr.scaleX = 0.9412810211823127;
		playButtonCtr.scaleY = 0.9412810211823127;

		// buttonbg1
		const buttonbg1 = this.add.image(-282, 76, "buttonbg1");
		buttonbg1.scaleX = 1.5259378093025389;
		buttonbg1.scaleY = 1.5259378093025389;
		playButtonCtr.add(buttonbg1);

		// playButton
		const playButton = this.add.text(-385, 43, "", {});
		playButton.text = "ГРАТИ";
		playButton.setStyle({ "color": "#000000ff", "fontFamily": "uvKits", "fontSize": "70px" });
		playButtonCtr.add(playButton);

		// ratingBtnCnt
		const ratingBtnCnt = this.add.container(9, 454);
		ratingBtnCnt.scaleX = 0.9412810211823127;
		ratingBtnCnt.scaleY = 0.9412810211823127;

		// buttonbg
		const buttonbg = this.add.image(-282, 76, "buttonbg1");
		buttonbg.scaleX = 1.5259378093025389;
		buttonbg.scaleY = 1.5259378093025389;
		ratingBtnCnt.add(buttonbg);

		// playButton_1
		const playButton_1 = this.add.text(-426, 43, "", {});
		playButton_1.text = "РЕЙТИНГ\n";
		playButton_1.setStyle({ "color": "#000000ff", "fontFamily": "uvKits", "fontSize": "70px" });
		ratingBtnCnt.add(playButton_1);

		// text_1
		const text_1 = this.add.text(166.9606148756215, 740.748972165174, "", {});
		text_1.scaleX = 0.9057260323980112;
		text_1.scaleY = 0.9057260323980112;
		text_1.text = "©26'ЛяжкиМакіми inc.\n";
		text_1.setStyle({ "fontFamily": "uvKits", "fontSize": "50px" });

		// container_1
		const container_1 = this.add.container(0, 0);

		// menu_screamer
		const menu_screamer = this.add.image(396, 403, "menu screamer");
		menu_screamer.alpha = 0;
		menu_screamer.alphaTopLeft = 0;
		menu_screamer.alphaTopRight = 0;
		menu_screamer.alphaBottomLeft = 0;
		menu_screamer.alphaBottomRight = 0;
		container_1.add(menu_screamer);

		this.bg = bg;
		this.logo = logo;
		this.buttonbg1 = buttonbg1;
		this.playButton = playButton;
		this.playButtonCtr = playButtonCtr;
		this.buttonbg = buttonbg;
		this.playButton_1 = playButton_1;
		this.ratingBtnCnt = ratingBtnCnt;
		this.menu_screamer = menu_screamer;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	bg;
	/** @type {Phaser.GameObjects.Image} */
	logo;
	/** @type {Phaser.GameObjects.Image} */
	buttonbg1;
	/** @type {Phaser.GameObjects.Text} */
	playButton;
	/** @type {Phaser.GameObjects.Container} */
	playButtonCtr;
	/** @type {Phaser.GameObjects.Image} */
	buttonbg;
	/** @type {Phaser.GameObjects.Text} */
	playButton_1;
	/** @type {Phaser.GameObjects.Container} */
	ratingBtnCnt;
	/** @type {Phaser.GameObjects.Image} */
	menu_screamer;

	/* START-USER-CODE */

	// Write your code here

	create(data) {

		this.editorCreate();
		this.playBtn = function playBtn() {

			if (data.fromScreamer) {
				this.bg.setAlpha(0);
				this.time.delayedCall(300, () => {
					this.menu_screamer.setAlpha(1);
				})
				this.time.delayedCall(400, () => {
					this.menu_screamer.setAlpha(0);
					this.bg.setAlpha(1);
				})
			}

			this.tweens.add({
				targets: this.logo,
				y: -200,
				duration: 800,
				ease: 'Cubic.easeInOut',
			})

			this.tweens.add({
				targets: this.playButtonCtr,
				x: 1800,
				duration: 300,
				ease: 'Cubic.easeInOut'
			})
			setTimeout(() => {
				this.tweens.add({
					targets: this.ratingBtnCnt,
					x: 1800,
					duration: 300,
					ease: 'Cubic.easeInOut',
					onComplete: () => {
						this.scene.start('CharMenu')
					}
				})
			}, 100)
		}
		this.updateMenuSelection = function updateMenuSelection() {

			this.menuButtons.forEach((button, index) => {

				// stop previous tween
				if (button.blinkTween) {
					button.blinkTween.stop();
				}

				// inactive state
				button.alpha = 0.4;

				// active state
				if (index === this.selectedIndex) {

					button.alpha = 1;

					button.blinkTween = this.tweens.add({

						targets: button,

						alpha: 0.8,

						duration: 300,

						yoyo: true,

						repeat: -1,

						ease: 'Sine.inOut'

					});
				}
			});
		}
		this.menuButtons = [
			this.playButtonCtr,
			this.ratingBtnCnt
		]

		this.selectedIndex = 0;

		this.updateMenuSelection();
		this.input.keyboard.on("keydown-UP", () => {

			this.selectedIndex--;

			if (this.selectedIndex < 0) {
				this.selectedIndex = this.menuButtons.length - 1;
			}

			this.updateMenuSelection();
		});

		this.input.keyboard.on("keydown-DOWN", () => {

			this.selectedIndex++;

			if (this.selectedIndex >= this.menuButtons.length) {
				this.selectedIndex = 0;
			}

			this.updateMenuSelection();
		});

		this.input.keyboard.on("keydown-SPACE", () => {
			switch (this.selectedIndex) {
				case 0:
					this.playBtn();
				case 1:
					break;

			}
		})
		this.animsFromTitle = function animsFromTitle() {
			this.tweens.add({
				targets: this.playButtonCtr,
				x: 708.5,
				duration: 300,
				ease: 'Cubic.easeInOut'
			});
			setTimeout(() => {
				this.tweens.add({
					targets: this.ratingBtnCnt,
					x: 708.5,
					duration: 300,
					ease: 'Cubic.easeInOut'
				})
			}, 100)
		};

		//FINISH THIS SHIT!!!!!
		this.animsFromOther = function animsFromOther() {
			this.tweens.add({
				targets: this.logo,
				y: -150,
				duration: 0
			})
		};

		this.animsFromTitle();

		/* END-USER-CODE */
	}
}

/* END OF COMPILED CODE */

// You can write more code here
