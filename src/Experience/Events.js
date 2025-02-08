import * as THREE from "three";
import Experience from "./Experience.js";

export default class Events {
	constructor(_options) {
		this.experience = new Experience();
		this.resources = this.experience.resources;
		this.debug = this.experience.debug;
		this.camera = this.experience.camera;
		this.config = this.experience.config;
		this.world = this.experience.world;
		this.time = this.experience.time;
		this.clock = new THREE.Clock();
		this.sizes = this.experience.sizes;

		this.setMusicButton();
	}

	setMusicButton() {
		this.config.html_musicKey.onclick = () => {
			if (this.resources.music.paused) {
				this.config.html_musicSvg.setAttribute(
					"href",
					"./social/icoMusicOn.svg#idIco"
				);
				this.config.html_musicKey.classList.add("active");
				this.resources.music.play();
				HTMLfooterText.innerHTML = "kazakov mikhail - sleeping guard's";
			} else {
				this.config.html_musicSvg.setAttribute(
					"href",
					"./social/icoMusicOff.svg#idIco"
				);
				this.config.html_musicKey.classList.remove("active");
				this.resources.music.pause();
				HTMLfooterText.innerHTML = "";
			}
		};
	}

	update() {}
}
