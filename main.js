import * as THREE from 'three'
import vertex from './shaders/vertex.glsl'
import fragment from './shaders/fragment.glsl'
import { Clock } from 'three'
import image from './img/punk.png'

const clock = new Clock()

class App {
  constructor() {
    this.init()
    this.addObjects()
    this.render()
  }

  init() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.canvasWrapper = document.getElementById('canvas-wrapper')

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, this.width/this.height, .1, 1000)
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    })

    this.renderer.setSize(this.width, this.height)
    this.canvasWrapper.appendChild(this.renderer.domElement)
  }

  addObjects() {
    // const image = 'https://www.dreamalittlebigger.com/wp-content/uploads/2015/04/001-marla-dressed-up-cat-face-art-dreamalittlebigger.jpg'
    const texture = new THREE.TextureLoader().load(image)

    this.geometry = new THREE.PlaneGeometry(1, 1, 20, 20)
    this.material = new THREE.ShaderMaterial({
      // color: 0xff0000,
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: texture }
      },
      // wireframe: true,
      vertexShader: vertex,
      fragmentShader: fragment
    })
    this.plane = new THREE.Mesh(this.geometry, this.material)

    this.scene.add(this.plane)

    this.camera.position.z = 1
  }

  render() {
    this.material.uniforms.uTime.value += 0.04

    this.renderer.render(this.scene, this.camera)
    window.requestAnimationFrame(this.render.bind(this))
  }
}

new App()