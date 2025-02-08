import * as THREE from "three";

export default class Config {
	constructor(targetElement) {
		// Pixel ratio
		this.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2);
		// Width and height
		const boundings = targetElement.getBoundingClientRect();
		this.width = boundings.width;
		this.height = boundings.height || window.innerHeight;
		this.smallestSide = Math.min(this.width, this.height);
		this.largestSide = Math.max(this.width, this.height);

		// Debug
		this.debug = window.location.hash === "#debug";

		// Colors
		this.backgroundColor = "#00022a";

		// World
		this.icoRotationSpeed = 0.02;
		this.motionBlurAmount = 0.725;

		// Post Processing
		this.unrealBloomStrength = 0.32;
		this.unrealBloomRadius = 1;
		this.unrealBloomThreshold = 0.82;
		this.unrealBloomMyPulseSpeed = 1;
		this.unrealBloomMyWaveLength = 1.5;
		this.unrealBloomMyStrength = 0.1;

		// Events
		this.html_loader = document.querySelector(".loader");
		this.html_footerText = document.querySelector(".footerText");
		this.html_musicKey = document.querySelector(".musicKey");
		this.html_musicSvg = document.querySelector(".musicSvg");
		this.html_experience = document.querySelector(".experience");
		this.html_footerIcons = document.querySelector(".footerIcons");
	}
}
