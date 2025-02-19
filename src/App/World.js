import * as THREE from "three";
import App from "./App.js";

export default class World {
	constructor() {
		this.app = new App();
		this.resources = this.app.resources;
		this.setConfig()

		this.resources.on("groupEnd", (_group) => {
			if (_group.name === "asset") {
				// this.addStar();
				// this.addEgg()
				this.addLogo()
				this.addLight();
				if (this.app.debug) this.addDebug()
			}
		});
	}

	setConfig() {
		this.app.config.logoSpeed = 0.1
		this.app.config.logoColor = '#00d3ff'
		this.app.config.logoMetalness = 0.05
		this.app.config.logoRoughness = 0.05
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
		this.model.material = new THREE.MeshStandardMaterial({ color: this.app.config.logoColor })
		this.model.material.metalness = this.app.config.logoMetalness
		this.model.material.roughness = this.app.config.logoRoughness

		this.model.in = this.resources.items.logo.scene.children.find( (child) => child.name === "in" );
		this.model.in.material = this.model.material

		this.model.out = this.resources.items.logo.scene.children.find( (child) => child.name === "out" );
		this.model.out.material = this.model.material

		this.app.scene.add(this.model.in, this.model.out);
	}

	addLight() {
		this.directLight = new THREE.DirectionalLight("#ffffff", 1.8);
		this.ambientLight = new THREE.AmbientLight("#ffffff", 1.3);
		this.app.scene.add(this.directLight, this.ambientLight);
	}

	addDebug() {
		if (this.app.debug) {
			this.app.debug.folder1
			.addBinding(this.app.config, 'logoColor', { label: 'Color' })
			.on('change', () => {
				this.model.material.color.set(this.app.config.logoColor)
			})

			this.app.debug.folder1
			.addBinding(this.app.config, 'logoSpeed', { min: 0, max: 1, })

			this.app.debug.folder1
			.addBinding(this.app.config, 'logoMetalness', { min: 0, max: 1, step: 0.01 })
			.on('change', () => {
				this.model.material.metalness = this.app.config.logoMetalness
			})

			this.app.debug.folder1
			.addBinding(this.app.config, 'logoRoughness', { min: 0, max: 1, step: 0.01 })
			.on('change', () => {
				this.model.material.roughness = this.app.config.logoRoughness
			})
		}
	}

	update() {
		if (this.ico) {
			this.ico.rotation.x += 0.02;
			this.ico.rotation.y += 0.02;
		}
		if (this.model) {
			this.model.in.rotation.x += this.app.config.logoSpeed * 0.1;
			this.model.in.rotation.y += this.app.config.logoSpeed * 0.1;
			this.model.out.rotation.x -= this.app.config.logoSpeed * 0.1;
			this.model.out.rotation.y -= this.app.config.logoSpeed * 0.1;
		}
	}

	resize() {

	}
	
	destroy() {

	}
}
