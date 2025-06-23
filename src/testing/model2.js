import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { MeshSurfaceSampler } from 'three/addons/math/MeshSurfaceSampler.js';

import gsap from 'gsap';

import vertex from "../shaders/vertex.glsl"
import fragment from "../shaders/fragment.glsl"

class Model {
    constructor(obj) {
        // console.log(obj)

        this.name = obj.name
        this.file = obj.file
        this.scene = obj.scene
        this.playOnLoad = obj.playOnLoad
        this.color1 = obj.color1
        this.color2 = obj.color2

        this.isActive = false

        this.background = obj.background

        this.loader = new GLTFLoader();
        this.dracoLoader = new DRACOLoader();
        this.dracoLoader.setDecoderPath('./draco/');
        this.loader.setDRACOLoader(this.dracoLoader);

        this.init()
    }

    init() {
        this.loader.load(this.file, (response) => {

            // original mesh
            this.mesh = response.scene.children[0]

            // material mesh
            this.material = new THREE.MeshBasicMaterial({
                wireframe: true,
                color: "red"
            })
            this.mesh.material = this.material
                //geometry mesh
            this.geometry = this.mesh.geometry

            // material particles
            // this.particlesMaterial = new THREE.PointsMaterial({
            //         color: "red",
            //         size: 0.02
            //     })
            this.particlesMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    uColor1: {
                        value: new THREE.Color(this.color1)
                    },
                    uColor2: {
                        value: new THREE.Color(this.color2)
                    },
                    uTime: {
                        value: 0
                    },
                    uScale: {
                        value: 0
                    }
                },
                vertexShader: vertex,
                fragmentShader: fragment,
                transparent: true,
                depthTest: false,
                depthWrite: false,
                blending: THREE.AdditiveBlending
            })

            //geometry particles
            const sampler = new MeshSurfaceSampler(this.mesh).build();
            const numParticles = 20000
            this.particlesGeometry = new THREE.BufferGeometry()
            const particlesPositions = new Float32Array(numParticles * 3)
            const particlesRandomness = new Float32Array(numParticles * 3)

            for (let i = 0; i < numParticles; i++) {
                const newPosition = new THREE.Vector3();
                sampler.sample(newPosition)
                particlesPositions.set([
                    newPosition.x,
                    newPosition.y,
                    newPosition.z
                ], i * 3)

                particlesRandomness.set([
                    Math.random() * 2 - 1, // -1 to 1
                    Math.random() * 2 - 1,
                    Math.random() * 2 - 1,
                ], i * 3)
            }

            this.particlesGeometry.setAttribute("position", new THREE.BufferAttribute(particlesPositions, 3))
            this.particlesGeometry.setAttribute("aRandom", new THREE.BufferAttribute(particlesRandomness, 3))

            console.log(this.particlesGeometry)

            //particles
            this.particles = new THREE.Points(this.particlesGeometry, this.particlesMaterial)

            //place on load
            if (this.playOnLoad) {
                this.add()
            }

        })
    }

    add() {
        this.scene.add(this.particles);

        gsap.to(this.particlesMaterial.uniforms.uScale, {
            value: 1,
            duration: 0.8,
            delay: 0.3,
            ease: "power3.out"
        })
        if (!this.isActive) {
            gsap.fromTo(this.particles.rotation, {
                y: Math.PI,
            }, {
                y: 0,
                duration: 0.8,
                // delay: 0.3,
                ease: "power3.out"
            })
            gsap.to("body", {
                background: this.background,
                duration: 0.8
            })
        }
        this.isActive = true
    }

    remove() {
        gsap.to(this.particlesMaterial.uniforms.uScale, {
            value: 0,
            duration: 0.9,
            ease: "power3.out",
            onComplete: () => {
                this.scene.remove(this.particles)
                this.isActive = false
            }
        })
        gsap.to(this.particles.rotation, {
            y: Math.PI,
            duration: 0.9,
            // delay: 0.3,
            ease: "power3.out"
        })
    }
}

export default Model