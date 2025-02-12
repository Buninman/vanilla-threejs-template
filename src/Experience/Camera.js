import * as THREE from "three";
import Experience from "./Experience.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera {
	constructor() {
		this.app = new Experience();

		// Set up
		// this.mode = "debug"; // defaultCamera \ debugCamera
		// this.debugActiveCamera = true;

		this.setBasicCamera();
		this.setOrbitControls()
	}

	setBasicCamera() {
		this.basicCamera = new THREE.PerspectiveCamera(
			75,
			this.app.sizes.width / this.app.sizes.height,
			0.1,
			100
		);
		this.basicCamera.position.set(5, 5, 5)
		this.app.scene.add(this.basicCamera);
	}
	setOrbitControls() {
		this.controls = new OrbitControls(this.basicCamera, this.app.canvas)
		this.controls.enableDamping = true
	}
	resize() {
		this.basicCamera.aspect = this.app.sizes.width / this.app.sizes.height;
		this.basicCamera.updateProjectionMatrix();
	}
	update() {
		this.controls.update()
	}
}
