import * as THREE from "three";
import Experience from "./Experience.js";

export default class World {
	constructor(_options) {
		this.experience = new Experience();
		this.resources = this.experience.resources;
		this.debug = this.experience.debug;
		this.config = this.experience.config;
		this.scene = this.experience.scene;
		this.time = this.experience.time;
		this.clock = new THREE.Clock();
		this.sizes = this.experience.sizes;

		this.resources.on("groupEnd", (_group) => {
			if (_group.name === "asset") {
				this.addStar();
				this.addLight();
				this.addDebug();
			}
		});
	}
	addStar() {
		this.ico = new THREE.Mesh(
			new THREE.IcosahedronGeometry(),
			new THREE.MeshStandardMaterial({ color: "#4e62f9" })
		);
		this.scene.add(this.ico);
	}

	addLight() {
		this.directLight = new THREE.DirectionalLight("#ffffff", 1);
		this.ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
		this.scene.add(this.directLight, this.ambientLight);
	}

	update() {
		if (this.ico) {
			this.ico.rotation.x += this.config.icoRotationSpeed;
			this.ico.rotation.y += this.config.icoRotationSpeed;
		}
	}
	addDebug() {
		if (this.debug) {
			this.debug.worldFolder = this.debug.addFolder({ title: "World" });
			this.debug.worldFolder
				.addBinding(this.config, "backgroundColor", { label: "BG" })
				.on("change", () => {});
		}
	}
	resize() {}
	destroy() {}
}
