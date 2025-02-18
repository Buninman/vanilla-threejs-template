import * as THREE from "three";
import App from "./App.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass.js'
import { SavePass } from 'three/examples/jsm/postprocessing/SavePass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { BlendShader } from 'three/examples/jsm/shaders/BlendShader.js'
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js'

export default class Renderer {
	constructor() {
		this.app = new App();
		this.setConfig()
		this.setRenderer()
		this.setPostProcess()
		this.addDebug()
	}

	setConfig() {
		this.app.config.motionBlur = true
		this.app.config.motionBlurMix = 0.93
		this.app.config.unrealBloom = false
		this.app.config.unrealBloomStrength = 0.3
		this.app.config.unrealBloomRadius = 0
		this.app.config.unrealBloomThreshold = 0.8
		this.app.config.dotScreen = false
	}

	setRenderer() {
		this.webGLRenderer = new THREE.WebGLRenderer({
			canvas: this.app.canvas,
			antialias: true
		})
		this.webGLRenderer.setClearColor(this.app.colors.backgroundColor)
		this.webGLRenderer.setSize(this.app.sizes.width, this.app.sizes.height)
    this.webGLRenderer.setPixelRatio(this.app.sizes.pixelRatio)
		// this.webGLRenderer.toneMapping = THREE.NoToneMapping
		// this.webGLRenderer.toneMappingExposure = 1
		this.context = this.webGLRenderer.getContext();
	}

	setPostProcess() {	
		this.effectComposer = new EffectComposer(this.webGLRenderer)
		this.renderPass = new RenderPass(this.app.scene, this.app.camera.basicCamera)
		this.effectComposer.addPass(this.renderPass)

		if (this.app.config.motionBlur) this.addMotionBlurPasses()
		if (this.app.config.unrealBloom) this.addUnrealBloomPass()
		if (this.app.config.dotScreen) this.addDotScreenPass()
	}

	addMotionBlurPasses() {
		this.savePass = new SavePass(new THREE.WebGLRenderTarget(
			this.app.sizes.width,
			this.app.sizes.height,
			{
				minFilter: THREE.LinearFilter,
    		magFilter: THREE.LinearFilter,
    		stencilBuffer: false,
			}
		))

		this.blendPass = new ShaderPass(BlendShader, 'tDiffuse1')
		this.blendPass.uniforms['tDiffuse2'].value = this.savePass.renderTarget.texture
		this.blendPass.uniforms['mixRatio'].value = this.app.config.motionBlurMix

		this.outputPass = new ShaderPass(CopyShader)
		this.outputPass.renderToScreen = true

		this.effectComposer.addPass(this.blendPass)
		this.effectComposer.addPass(this.savePass)
		this.effectComposer.addPass(this.outputPass)
	}

	addUnrealBloomPass() {
		this.unrealBloomPass = new UnrealBloomPass()
		this.unrealBloomPass.strength = this.app.config.unrealBloomStrength
		this.unrealBloomPass.radius = this.app.config.unrealBloomRadius
		this.unrealBloomPass.threshold = this.app.config.unrealBloomThreshold
		this.effectComposer.addPass(this.unrealBloomPass)
	}

	addDotScreenPass() {
		this.dotScreenPass = new DotScreenPass()
		this.effectComposer.addPass(this.dotScreenPass)
	}

	// addDebug() {
	// 	this.app.debug.colorsFolder
	// 		.addBinding(this.app.colors, 'backgroundColor', { view: 'color', label: 'Background' })
	// 		.on('change', () => {
	// 			this.webGLRenderer.setClearColor(this.app.colors.backgroundColor, 1)
	// 	})
	// }

	addDebug() {
		if (this.app.debug) {
			this.app.debug.folder2
			.addBinding(this.app.colors, 'backgroundColor', { label: 'Background Color' })
			.on('change', () => {
				this.webGLRenderer.setClearColor(this.app.colors.backgroundColor)
			})

			this.app.debug.folder2
			.addBinding(this.app.config, 'motionBlur')
			.on('change', () => {
				this.setPostProcess()
			})
			this.app.debug.folder2
			.addBinding(this.app.config, 'motionBlurMix', { min: 0.5, max: 0.99, step: 0.001 })
			.on('change', () => {
				this.blendPass.uniforms['mixRatio'].value = this.app.config.motionBlurMix
			})

			this.app.debug.folder2.addBlade({ view: 'separator' })

			this.app.debug.folder2
			.addBinding(this.app.config, 'unrealBloom')
			.on('change', () => {
				this.setPostProcess()
			})
			this.app.debug.folder2
			.addBinding(this.app.config, 'unrealBloomStrength', { min: 0, max: 1, step: 0.01 })
			.on('change', () => {
				this.unrealBloomPass.strength = this.app.config.unrealBloomStrength
			})
			this.app.debug.folder2
			.addBinding(this.app.config, 'unrealBloomRadius', { min: 0, max: 1, step: 0.01 })
			.on('change', () => {
				this.unrealBloomPass.radius = this.app.config.unrealBloomRadius
			})
			this.app.debug.folder2
			.addBinding(this.app.config, 'unrealBloomThreshold', { min: 0, max: 1, step: 0.01 })
			.on('change', () => {
				this.unrealBloomPass.threshold = this.app.config.unrealBloomThreshold
			})

			this.app.debug.folder2.addBlade({ view: 'separator' })

			this.app.debug.folder2
			.addBinding(this.app.config, 'dotScreen')
			.on('change', () => {
				this.setPostProcess()
			})
		}
	}

	resize() {
		this.webGLRenderer.setSize(this.app.sizes.width, this.app.sizes.height)
		this.webGLRenderer.setPixelRatio(this.app.sizes.pixelRatio)
	}

	update() {
		if (this.effectComposer) {
			this.effectComposer.render()
		} else {
			this.webGLRenderer.render(this.app.scene, this.app.camera.basicCamera)
		}
	}
}