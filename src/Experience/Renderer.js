import * as THREE from "three";
import Experience from "./Experience.js";

export default class Renderer {
	constructor(_options = {}) {
		this.experience = new Experience();
		this.config = this.experience.config;
		this.debug = this.experience.debug;
		// this.stats = this.experience.stats;
		this.time = this.experience.time;
		this.sizes = this.experience.sizes;
		this.scene = this.experience.scene;
		this.camera = this.experience.camera;

		this.setInstance();
	}

	setInstance() {
		// Renderer
		this.instance = new THREE.WebGLRenderer({
			// alpha: true,
			antialias: true,
		});
		this.instance.domElement.style.position = "absolute";
		this.instance.domElement.style.top = 0;
		this.instance.domElement.style.left = 0;
		this.instance.domElement.style.width = "100%";
		this.instance.domElement.style.height = "100%";

		this.instance.setClearColor('#211d20', 1);
		this.instance.setSize(this.sizes.width, this.sizes.height);
		this.instance.setPixelRatio(this.sizes.pixelRatio);

		this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
		this.instance.shadowMap.enabled = true;
		this.instance.toneMapping = THREE.NoToneMapping;
		this.instance.toneMappingExposure = 1;

		this.context = this.instance.getContext();
	}

	addDebug() {}

	resize() {
		this.instance.setSize(this.sizes.width, this.sizes.height);
		this.instance.setPixelRatio(this.sizes.pixelRatio);
	}

	update() {
			this.instance.render(this.scene, this.camera.basicCamera);
	}

	destroy() {}
}
