import Level from "./scenes/Level.js";
import Preload from "./scenes/Preload.js";
import Title from "./scenes/Title.js";
import MainMenu from "./scenes/MainMenu.js";
import CharMenu from "./scenes/CharMenu.js";
import Game from "./scenes/Game.js";
import Game2 from "./scenes/Game2.js";
import Game3 from "./scenes/Game3.js";

window.addEventListener('load', function () {

	var game = new Phaser.Game({
		width: 900,
		height: 820,
		type: Phaser.AUTO,
		backgroundColor: "#242424",
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH
		}
	});
	game.scene.add('Game3', Game3);
	game.scene.add("Preload", Preload);
	game.scene.add('Title', Title);
	game.scene.add('MainMenu', MainMenu);
	game.scene.add('CharMenu', CharMenu);
	game.scene.add('Game', Game);
	game.scene.add('Game2', Game2);
	game.scene.add("Boot", Boot, true);
});

class Boot extends Phaser.Scene {

	preload() {
		this.load.pack("pack", "assets/preload-asset-pack.json");
	}

	create() {
		this.scene.start("Title");
	}
}