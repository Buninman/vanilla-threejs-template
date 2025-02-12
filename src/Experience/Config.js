export default class Config {
	constructor(targetElement) {
		// Debug
		this.debug = true;
		// this.debug = window.location.hash === "#debug";

		// Colors
		this.backgroundColor = "#00022a";

		// Events
		this.html_loader = document.querySelector(".loader");
		this.html_footerText = document.querySelector(".footerText");
		this.html_musicKey = document.querySelector(".musicKey");
		this.html_musicSvg = document.querySelector(".musicSvg");
		this.html_experience = document.querySelector(".experience");
		this.html_footerIcons = document.querySelector(".footerIcons");
	}
}
