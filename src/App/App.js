import * as THREE from "three";
import { Pane } from "tweakpane";

import Time from "./Utils/Time.js";
import Sizes from "./Utils/Sizes.js";

import Resources from "./Resources.js";
import Renderer from "./Renderer.js";
import Camera from "./Camera.js";
import World from "./World.js";
import Events from "./Events.js";

export default class App {
	static instance;
	constructor() {
		if (App.instance) {
			return App.instance;
		}
		App.instance = this;

		this.time = new Time();
		this.sizes = new Sizes();

		this.setConfig();
		this.setDebug()
		this.setThreejs();
		this.setLoader();
		this.setExperience();

		this.sizes.on('resize', () => this.resize())
		this.time.on('tick', () => this.update())
	}

	setConfig() {
		this.config = {
			loaderIsHidden: false
		}
		this.htmlQS = {
			loader: document.querySelector('.loader'),
			footerIcons: document.querySelector(".footerIcons"),
			footerText: document.querySelector(".footerText"),
			musicKey: document.querySelector(".musicKey"),
			musicSvg: document.querySelector(".musicSvg"),
		}
		this.colors = {
			backgroundColor: '#211d20',
			icoSphereColor: '#F4AFC7'
		}
	}

	setDebug() {
		this.debug = new Pane({
			title: "Wait for the Website to Load",
			expanded: false,
		});
		this.debug.containerElem_.style.width = "320px";
		this.debug.colorsFolder = this.debug.addFolder({ title: 'Colors' })
	}

	setThreejs() {
		this.canvas = document.querySelector('.canvas')
		if (!this.canvas) {
			console.warn("Missing 'appQuerySelector' property");
			return;
		}
		this.scene = new THREE.Scene();
		this.camera = new Camera();

		// this.renderer = new Renderer();
		this.renderer = new Renderer();

		// this.renderer = new RendererOld({ rendererInstance: this.rendererInstance });
		// this.canvas.appendChild(this.renderer.instance.domElement);

		this.resources = new Resources();
	}

	setLoader() {
		const setHtmlTimer = (value) => htmlLoaderTimer.innerHTML = value
		setHtmlTimer("0%");
		this.resources.on("progress", (_progress) => {
			setHtmlTimer( Math.round((_progress.loaded / _progress.toLoad) * 100) + "%" );
		});
		this.resources.on("end", (_progress) => {
			setHtmlTimer("Done");
			window.setTimeout(() => {
				this.canvas.classList.remove("cursorBlack");
				this.htmlQS.loader.classList.add("unvisible");
				this.htmlQS.footerIcons.classList.remove("unvisible");
				setHtmlTimer("");
				this.config.loaderIsHidden = true;
				this.debug.title = "Play With Me";
				this.debug.expanded = true;
			}, 1000);
		});
	}

	setExperience() {
		this.world = new World();
		this.events = new Events();
	}
	
	resize() {
		if (this.camera) this.camera.resize();
		if (this.renderer) this.renderer.resize();
		if (this.world) this.world.resize();
	}

	update() {
		if (this.camera.controls) this.camera.update();
		if (this.world) this.world.update();
		if (this.renderer) this.renderer.update();
		if (this.events) this.events.update();
	}

	destroy() {}
}
