
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import { GameInput } from "../GameInput.js";
/* END-USER-IMPORTS */

export default class Title extends Phaser.Scene {

	constructor() {
		super("Title");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// ______________2026_05_11___15_12_35
		const ______________2026_05_11___15_12_35 = this.add.image(660, 369, "Знімок екрана 2026-05-11 о 15.12.35");
		______________2026_05_11___15_12_35.scaleX = 2.4963618814518553;
		______________2026_05_11___15_12_35.scaleY = 2.4963618814518553;

		// text_1
		const text_1 = this.add.text(166.9606148756215, 740.748972165174, "", {});
		text_1.scaleX = 0.9057260323980112;
		text_1.scaleY = 0.9057260323980112;
		text_1.text = "©26'ЛяжкиМакіми inc.\n";
		text_1.setStyle({ "fontFamily": "uvKits", "fontSize": "50px" });

		// pressStart
		const pressStart = this.add.text(450, 510.75238519907, "", {});
		pressStart.scaleX = 1.4515376548888677;
		pressStart.scaleY = 1.4515376548888677;
		pressStart.setOrigin(0.5, 0.5);
		pressStart.text = "НАТИСНІТЬ ПРОБІЛ";
		pressStart.setStyle({ "fontFamily": "uvKits", "fontSize": "50px" });

		// logo
		const logo = this.add.image(450, 200, "logo");
		logo.scaleX = 0.62;
		logo.scaleY = 0.62;

		this.______________2026_05_11___15_12_35 = ______________2026_05_11___15_12_35;
		this.pressStart = pressStart;
		this.logo = logo;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	______________2026_05_11___15_12_35;
	/** @type {Phaser.GameObjects.Text} */
	pressStart;
	/** @type {Phaser.GameObjects.Image} */
	logo;

	/* START-USER-CODE */

	transition() {
		this.floatTween.stop();
		this.tweens.add({
			targets: this.startText,
			alpha: 0,
			duration: 300
		});

		this.tweens.add({
			targets: this.logo,
			y: 150,
			scaleX: 0.5,
			scaleY: 0.5,
			duration: 1200,
			ease: 'Cubic.easeInOut',
			onComplete: () => {
				this.scene.start('MainMenu', {
					from: 'Title'
				});
			}
		})
	}
	create() {
		this.editorCreate();
		const logo = this.logo;
		const startText = this.pressStart;
		const startY = logo.y;

		this.floatTween = this.tweens.add({
			targets: logo,
			y: startY + 10,
			duration: 6000,
			yoyo: true,
			repeat: -1,
			ease: 'Sine.inOut'
		});

		this.time.addEvent({
			delay: 600,
			loop: true,
			callback: () => {
				startText.visible = !startText.visible;
			}
		})
		this.scene.spaceKey = this.scene.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
	}

	update() {
		if (Phaser.Input.Keyboard.JustDown(this.scene.spaceKey) || GameInput.A) {
			this.transition();
		}
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
