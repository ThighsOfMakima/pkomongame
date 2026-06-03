
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import CHARACTERS from '../data/characters.js';
import { GameInput } from "../GameInput.js";
/* END-USER-IMPORTS */

export default class CharMenu extends Phaser.Scene {

	constructor() {
		super("CharMenu");

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

		// selectionUI
		const selectionUI = this.add.image(450, 1423, "selectionUI");
		selectionUI.scaleX = 0.7272091937393179;
		selectionUI.scaleY = 0.7272091937393179;

		// description
		const description = this.add.container(82, 637);
		description.scaleX = 8.627905108991168;
		description.scaleY = 5.8491578380536975;

		// ui_charselect
		const ui_charselect = this.add.container(0, 1611);

		// skillName
		const skillName = this.add.text(91, 4, "", {});
		skillName.text = "New text";
		skillName.setStyle({ "color": "#000000ff", "fontFamily": "uvKits", "fontSize": "40px", "fontStyle": "bold" });
		ui_charselect.add(skillName);

		// skillDesc
		const skillDesc = this.add.text(91, 47, "", {});
		skillDesc.text = "New text";
		skillDesc.setStyle({ "color": "#000000ff", "fontFamily": "uvKits", "fontSize": "35px", "maxLines": 3 });
		skillDesc.setWordWrapWidth(710);
		ui_charselect.add(skillDesc);

		// charactersSelect
		const charactersSelect = this.add.container(104, -556);
		ui_charselect.add(charactersSelect);

		// pokeball
		const pokeball = this.add.image(842, -531, "pokeball");
		pokeball.scaleX = 2.478619187203443;
		pokeball.scaleY = 2.478619187203443;
		pokeball.alpha = 0.31;
		pokeball.alphaTopLeft = 0.31;
		pokeball.alphaTopRight = 0.31;
		pokeball.alphaBottomLeft = 0.31;
		pokeball.alphaBottomRight = 0.31;
		ui_charselect.add(pokeball);

		// charPreview
		const charPreview = this.add.sprite(644, -330, "_MISSING");
		charPreview.scaleX = 2.0113764390033086;
		charPreview.scaleY = 2.0113764390033086;
		ui_charselect.add(charPreview);

		// text_1
		const text_1 = this.add.text(419, -119, "", {});
		text_1.scaleX = 0.7352569128867561;
		text_1.scaleY = 0.7352569128867561;
		text_1.text = "↑ або ↓ для навігації\n\"Пробіл\" для підтвердження\n\n";
		text_1.setStyle({ "fontFamily": "uvKits", "fontSize": "35px" });
		ui_charselect.add(text_1);

		this.______________2026_05_11___15_12_35 = ______________2026_05_11___15_12_35;
		this.selectionUI = selectionUI;
		this.skillName = skillName;
		this.skillDesc = skillDesc;
		this.charactersSelect = charactersSelect;
		this.charPreview = charPreview;
		this.ui_charselect = ui_charselect;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	______________2026_05_11___15_12_35;
	/** @type {Phaser.GameObjects.Image} */
	selectionUI;
	/** @type {Phaser.GameObjects.Text} */
	skillName;
	/** @type {Phaser.GameObjects.Text} */
	skillDesc;
	/** @type {Phaser.GameObjects.Container} */
	charactersSelect;
	/** @type {Phaser.GameObjects.Sprite} */
	charPreview;
	/** @type {Phaser.GameObjects.Container} */
	ui_charselect;

	/* START-USER-CODE */

	// Write your code here

	create() {
		this.editorCreate();
		const charactersSelect = this.charactersSelect;


		this.tweens.add({
			targets: this.selectionUI,
			y: 423,
			duration: 600,
			ease: 'Sine.inOut'
		});

		this.tweens.add({
			targets: this.ui_charselect,
			y: 611,
			duration: 600,
			ease: 'Sine.inOut'
		});
		this.characters = CHARACTERS;
		this.selectedCharIndex = 0;
		this.characterButtons = [];

		for (let i = 0; i < this.characters.length; i++) {
			const character = this.characters[i];
			console.log(character);
			const text = this.add.text(
				0,
				i * 60,
				character.name,
				{
					fontFamily: 'uvKits',
					fontSize: '32px',
					color: 'black'
				}
			);
			this.charactersSelect.add(text);
			console.log(text);
			this.characterButtons.push(text);
		}

		this.cursor = this.add.text(
			0, 0,
			"►",
			{
				fontFamily: 'uvKits',
				fontSize: '32px',
				color: 'black'
			}
		)

		this.charactersSelect.add(this.cursor);

		this.tweens.add({
			targets: this.cursor,
			alpha: 0.2,
			duration: 600,
			yoyo: true,
			repeat: -1,
			ease: 'Sine.inOut'
		})

		this.updateCharacterSelection = function updateCharacterSelection() {
			const character = this.characters[this.selectedCharIndex];

			const selectedText =
				this.characterButtons[this.selectedCharIndex];

			this.cursor.x = selectedText.x - 25,
				this.cursor.y = selectedText.y;

			this.skillName.setText(character.activeSkillName);
			this.skillDesc.setText(character.activeSkillDesc);
			this.charPreview.setTexture(character.charSprite);
		}
		this.scene.down = this.scene.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
		this.scene.up = this.scene.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
		this.scene.space = this.scene.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

		this.updateCharacterSelection()

		this.tweens.add({
			targets: this.charPreview,
			duration: 500,
			scaleY: 2.02,
			scaleX: 1.98,
			yoyo: true,
			repeat: -1,
			ease: 'Sine.inOut'
		})
	}

	update() {
		if (Phaser.Input.Keyboard.JustDown(this.scene.down) || GameInput.isClicked('down')) {
			this.selectedCharIndex++;
			if (this.selectedCharIndex >= this.characters.length) {
				this.selectedCharIndex = 0;
			}
			this.updateCharacterSelection();
		}
		if (Phaser.Input.Keyboard.JustDown(this.scene.up) || GameInput.isClicked('up')) {
			this.selectedCharIndex--;
			if (this.selectedCharIndex < 0) {
				this.selectedCharIndex = this.characters.length - 1;
			}
			this.updateCharacterSelection();
		}
		if (Phaser.Input.Keyboard.JustDown(this.scene.space) || GameInput.isClicked('A')) {
			this.scene.start('Game', {
				char: this.characters[this.selectedCharIndex]
			});
		}
	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
