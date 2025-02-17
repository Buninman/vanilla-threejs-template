import * as THREE from "three";
import App from "./App.js";

export default class World {
	constructor(_options) {
		this.app = new App();
		this.resources = this.app.resources;

		this.resources.on("groupEnd", (_group) => {
			if (_group.name === "asset") {
				// this.addStar();
				// this.addEgg()
				this.addLogo()
				this.addLight();
			}
		});
	}
	addStar() {
		this.ico = new THREE.Mesh(
			new THREE.IcosahedronGeometry(),
			new THREE.MeshStandardMaterial({ color: "#4e62f9" })
		);
		this.app.scene.add(this.ico);
	}

	addEgg() {
		this.model = {};

		// Geometry
		this.model = this.resources.items.world.scene.children.find( (child) => child.name === "stable" );

		this.model.texture = this.resources.items.worldTexture;
		this.model.texture.flipY = false;
		this.model.material = new THREE.MeshBasicMaterial({
			map: this.model.texture,
		});
		this.app.scene.add(this.model);
	}

	addLogo() {
		this.model = {};

		this.model.in = this.resources.items.logo.scene.children.find( (child) => child.name === "in" );
		this.model.in.material = new THREE.MeshStandardMaterial({ color: "#fff" })

		this.model.out = this.resources.items.logo.scene.children.find( (child) => child.name === "out" );
		this.model.out.material = new THREE.MeshStandardMaterial({ color: "#fff" })

		this.app.scene.add(this.model.in, this.model.out);
	}

	addLight() {
		this.directLight = new THREE.DirectionalLight("#ffffff", 1.8);
		this.ambientLight = new THREE.AmbientLight("#ffffff", 0.8);
		this.app.scene.add(this.directLight, this.ambientLight);
	}

	update() {
		if (this.ico) {
			this.ico.rotation.x += 0.02;
			this.ico.rotation.y += 0.02;
		}
		if (this.model) {
			this.model.in.rotation.x += 0.01;
			this.model.in.rotation.y += 0.01;
			this.model.out.rotation.x -= 0.01;
			this.model.out.rotation.y -= 0.01;
		}
	}

	resize() {

	}
	
	destroy() {

	}
}
