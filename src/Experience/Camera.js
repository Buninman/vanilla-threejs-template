import * as THREE from "three";
import Experience from "./Experience.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera {
	constructor(_options) {
		// Options
		this.experience = new Experience();
		this.config = this.experience.config;
		this.debug = this.experience.debug;
		this.time = this.experience.time;
		this.sizes = this.experience.sizes;
		this.targetElement = this.experience.targetElement;
		this.scene = this.experience.scene;

		// Set up
		// this.mode = "default"; // defaultCamera \ debugCamera

		// this.debugActiveCamera = true;

		this.setInstance();
		// this.setModes();
		this.addDebug();
	}

	setInstance() {
		// Set up
		this.instance = new THREE.PerspectiveCamera(
			75,
			this.config.width / this.config.height,
			0.1,
			100
		);
		this.instance.rotation.reorder("YXZ");
		this.instance.position.z = 2;

		this.scene.add(this.instance);
	}

	// setModes() {
	// 	this.modes = {};

	// 	// Default
	// 	this.modes.default = {};
	// 	this.modes.default.instance = this.instance.clone();
	// 	this.modes.default.instance.rotation.reorder("YXZ");

	// 	// Debug
	// 	this.modes.debug = {};
	// 	this.modes.debug.instance = this.instance.clone();
	// 	this.modes.debug.instance.rotation.reorder("YXZ");
	// 	this.modes.debug.instance.position.set(8, 2, 8);

	// 	this.modes.debug.orbitControls = new OrbitControls(
	// 		this.modes.debug.instance,
	// 		this.targetElement
	// 	);
	// 	this.modes.debug.orbitControls.enabled = true;
	// 	this.modes.debug.orbitControls.enableKeys = false;
	// 	this.modes.debug.orbitControls.screenSpacePanning = true;
	// 	this.modes.debug.orbitControls.maxDistance = 11;

	// 	this.modes.debug.orbitControls.update();
	// }

	addDebug() {
		if (this.debug) {
			// this.debug.cameraFolder = this.debug.addFolder({ title: "Camera" });
			// console.log(this.debug.cameraFolder);
		}
	}

	resize() {
		this.instance.aspect = this.config.width / this.config.height;
		this.instance.updateProjectionMatrix();

		// this.modes.default.instance.aspect = this.config.width / this.config.height;
		// this.modes.default.instance.updateProjectionMatrix();

		// this.modes.debug.instance.aspect = this.config.width / this.config.height;
		// this.modes.debug.instance.updateProjectionMatrix();
	}

	update() {
		// Update debug orbit controls
		// this.modes.debug.orbitControls.update();
		// console.log(`Q ${this.instance.quaternion.y}, R ${this.instance.rotation.y}`);
		// Apply coordinates
		// this.instance.position.copy(this.modes[this.mode].instance.position);
		// this.instance.quaternion.copy(this.modes[this.mode].instance.quaternion);
		this.instance.updateMatrixWorld(); // To be used in projection
	}

	destroy() {
		// this.modes.debug.orbitControls.destroy();
	}
}
