import * as THREE from "three";
import { Pane } from "tweakpane";

import Time from "./Utils/Time.js";
import Sizes from "./Utils/Sizes.js";

import Config from "./Config.js";
import Resources from "./Resources.js";
import Renderer from "./Renderer.js";
import RendererNew from "./RendererNew.js";
import Camera from "./Camera.js";
import World from "./World.js";
import Events from "./Events.js";


export default class Experience {
	static instance;

	constructor() {
		// this.setHtmlTimer("0%");

		if (Experience.instance) {
			return Experience.instance;
		}
		Experience.instance = this;

		this.config = new Config();
		this.time = new Time();
		this.sizes = new Sizes();

		this.setConfig();
		this.setDebug()
		this.setThreejs();
		this.setLoader();
		this.setWorld();
		this.setEvents();
		this.sizes.on('resize', () => this.resize())
		this.time.on('tick', () => this.update())
	}

	setConfig() {
		this.htmlQS = {
			canvas: document.querySelector('.experience'),
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
		this.renderConfig = {
			loaderIsHidden: false
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
		this.canvas = document.querySelector(".experience");
		if (!this.canvas) {
			console.warn("Missing 'appQuerySelector' property");
			return;
		}
		this.scene = new THREE.Scene();
		this.camera = new Camera();

		this.renderer = new Renderer({ rendererInstance: this.rendererInstance });
		// this.renderer = new RendererNew();
		this.canvas.appendChild(this.renderer.instance.domElement);

		this.resources = new Resources();
	}

	// setHtmlTimer(value) {
	// 	htmlLoaderTimer.innerHTML = value;
	// }
	setLoader() {
		const setHtmlTimer = (value) => htmlLoaderTimer.innerHTML = value
		setHtmlTimer("0%");
		this.resources.on("progress", (_progress) => {
			setHtmlTimer( Math.round((_progress.loaded / _progress.toLoad) * 100) + "%" );
		});
		this.resources.on("end", (_progress) => {
			setHtmlTimer("Done");
			window.setTimeout(() => {
				this.htmlQS.canvas.classList.remove("cursorBlack");
				this.htmlQS.loader.classList.add("unvisible");
				this.htmlQS.footerIcons.classList.remove("unvisible");
				setHtmlTimer("");
				this.renderConfig.loaderIsHidden = true;
				this.debug.title = "Play With Me";
				this.debug.expanded = true;
			}, 1000);
		});
	}

	setWorld() {
		this.world = new World();
	}
	setEvents() {
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
