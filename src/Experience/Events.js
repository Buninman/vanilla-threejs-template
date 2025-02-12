import * as THREE from "three";
import Experience from "./Experience.js";

export default class Events {
	constructor(_options) {
		this.app = new Experience();
		this.resources = this.app.resources;
		this.config = this.app.config;

		this.setMusicButton();
	}

	setMusicButton() {
		this.app.htmlQS.musicKey.onclick = () => {
			if (this.resources.music.paused) {
				this.app.htmlQS.musicSvg.setAttribute(
					"href",
					"./social/icoMusicOn.svg#idIco"
				);
				this.app.htmlQS.musicKey.classList.add("active");
				this.resources.music.play();
				HTMLfooterText.innerHTML = "kazakov mikhail - sleeping guard's";
			} else {
				this.app.htmlQS.musicSvg.setAttribute(
					"href",
					"./social/icoMusicOff.svg#idIco"
				);
				this.app.htmlQS.musicKey.classList.remove("active");
				this.resources.music.pause();
				HTMLfooterText.innerHTML = "";
			}
		};
	}

	update() {}
}
