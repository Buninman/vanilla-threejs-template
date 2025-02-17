import * as THREE from "three";
import App from "./App.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera {
	constructor() {
		this.app = new App();
		
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
		this.basicCamera.position.set(0, 3, 0)
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
