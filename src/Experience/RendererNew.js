import * as THREE from "three";
import Experience from "./Experience.js";
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
		this.app = new Experience();
		this.setRenderer()
		// this.setPostProcess()
		// this.addMotionBlurPasses()
		// this.addUnrealBloomPass()
		// this.addDotScreenPass()
		// this.addDebug()
		console.log("Renderer import!");
	}

	setRenderer() {
		this.webGLRenderer = new THREE.WebGLRenderer({
			canvas: this.app.canvas,
			antialias: true
		})
		this.webGLRenderer.setClearColor('#211d20')
		this.webGLRenderer.setSize(this.app.sizes.width, this.app.sizes.height)
    this.webGLRenderer.setPixelRatio(this.app.sizes.pixelRatio)
		// this.webGLRenderer.toneMapping = THREE.NoToneMapping
		// this.webGLRenderer.toneMappingExposure = 1
	}

	setPostProcess() {	
		// this.renderTarget = new THREE.WebGLRenderTarget(
		// 		this.app.sizes.width,
		// 		this.app.sizes.height,
		// 		{
		// 			samples: 8,
		// 		}
		// 	)
		// this.effectComposer = new EffectComposer(this.webGLRenderer, this.renderTarget)
		this.effectComposer = new EffectComposer(this.webGLRenderer)
		this.renderPass = new RenderPass(this.app.scene, this.app.camera.basicCamera)
		this.effectComposer.addPass(this.renderPass)
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
		this.blendPass.uniforms['mixRatio'].value = 0.725

		this.outputPass = new ShaderPass(CopyShader)
		this.outputPass.renderToScreen = true

		this.effectComposer.addPass(this.blendPass)
		this.effectComposer.addPass(this.savePass)
		this.effectComposer.addPass(this.outputPass)
	}

	addUnrealBloomPass() {
		this.unrealBloomPass = new UnrealBloomPass()
		this.unrealBloomPass.strength = 0.32
		this.unrealBloomPass.radius = 1
		this.unrealBloomPass.threshold = 0.8
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

	resize() {
		// if (this.effectComposer) {
		// 	this.effectComposer.setSize(this.app.sizes.width, this.app.sizes.height)
    // 	this.effectComposer.setPixelRatio(this.app.sizes.pixelRatio)
		// } else {
			this.webGLRenderer.setSize(this.app.sizes.width, this.app.sizes.height)
			this.webGLRenderer.setPixelRatio(this.app.sizes.pixelRatio)
		// }
	}

	update() {
		if (this.effectComposer) {
			this.effectComposer.render()
		} else {
			this.webGLRenderer.render(this.app.scene, this.app.camera.basicCamera)
		}
	}
}