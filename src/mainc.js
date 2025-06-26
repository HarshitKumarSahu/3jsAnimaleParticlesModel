import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from "gsap";
import Model from './model';

/*------------------------------
Renderer
------------------------------*/
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


/*------------------------------
Scene & Camera
------------------------------*/
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);
camera.position.z = 5;
camera.position.y = 1;


/*------------------------------
Mesh
------------------------------*/
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
});
const cube = new THREE.Mesh(geometry, material);
// scene.add( cube );


/*------------------------------
OrbitControls
------------------------------*/
const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = false

/*------------------------------
Helpers
------------------------------*/
// const gridHelper = new THREE.GridHelper(10, 10);
// scene.add(gridHelper);
// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

/*------------------------------
Models
------------------------------*/
const horse = new Model({
    name: "horse",
    file: "/model/horse.glb",
    scene: scene,
    color1: "fuchsia",
    color2: "aqua",
    background: "#47001b",
    // playOnLoad: true,
})
const panda = new Model({
    name: "panda",
    file: "/model/panda.glb",
    scene: scene,
    color1: "blue",
    color2: "pink",
    background: "#110047",
})
// const deer = new Model({
//     name: "deer",
//     file: "/model/deer.glb",
//     scene: scene,
//     color1: "red",
//     color2: "pink",
//     background: "#470047",
//     playOnLoad: true,
// })
// const dog = new Model({
//     name: "dog",
//     file: "/model/dog.glb",
//     scene: scene,
//     color1: "pink",
//     color2: "yellow",
//     background: "#110047",
// })
// const giraffe = new Model({
//     name: "giraffe",
//     file: "/model/giraffe.glb",
//     scene: scene,
//     color1: "red",
//     color2: "blue",
//     background: "#47001b",
//     // playOnLoad: true,
// })

const deer = new Model({
    name: "deer",
    file: "/model/deer.glb",
    scene: scene,
    // color1: "#fe7f2d",
    // color2: "Blue",
    color1: "red",
    color2: "Yellow",
    background: "#004700",
    playOnLoad: true,
})

const dog = new Model({
    name: "dog",
    file: "/model/dog.glb",
    scene: scene,
    color1: "aqua",
    color2: "red",
    background: "#470047",
})

const giraffe = new Model({
    name: "giraffe",
    file: "/model/giraffe.glb",
    scene: scene,
    color1: "yellow",
    color2: "lime",
    background: "#001b47",
    // playOnLoad: true,
})

/*------------------------------
Controllers
------------------------------*/
const buttons = document.querySelectorAll(".btn")
buttons[0].addEventListener("click", () => {
    horse.add()
    panda.remove()
    deer.remove()
    dog.remove()
    giraffe.remove()
})
buttons[1].addEventListener("click", () => {
    horse.remove()
    panda.add()
    deer.remove()
    dog.remove()
    giraffe.remove()
})
buttons[2].addEventListener("click", () => {
    horse.remove()
    panda.remove()
    deer.add()
    dog.remove()
    giraffe.remove()
})
buttons[3].addEventListener("click", () => {
    horse.remove()
    panda.remove()
    deer.remove()
    dog.add()
    giraffe.remove()
})
buttons[4].addEventListener("click", () => {
    horse.remove()
    panda.remove()
    deer.remove()
    dog.remove()
    giraffe.add()
})

// const buttons2 = document.querySelectorAll(".button")
// buttons2[0].addEventListener("click", () => {
//     horse.add()
//     hand.remove()
//     horse2.remove()
//     hand2.remove()
//     horse3.remove()
// })
// buttons2[1].addEventListener("click", () => {
//     horse.remove()
//     hand.add()
//     horse2.remove()
//     hand2.remove()
//     horse3.remove()
// })
// buttons2[2].addEventListener("click", () => {
//     horse.remove()
//     hand.remove()
//     horse2.add()
//     hand2.remove()
//     horse3.remove()
// })
// buttons2[3].addEventListener("click", () => {
//     horse.remove()
//     hand.remove()
//     horse2.remove()    
//     hand2.add()
//     horse3.remove()
// })
// buttons2[4].addEventListener("click", () => {
//     horse.remove()
//     hand.remove()
//     horse2.remove()    
//     hand2.remove()
//     horse3.add()
// })

/*------------------------------
Clock time
------------------------------*/
const clock = new THREE.Clock()

/*------------------------------
Loop
------------------------------*/
const animate = function() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    if (horse.isActive) {
        horse.particlesMaterial.uniforms.uTime.value = clock.getElapsedTime()
    }
    if (panda.isActive) {
        panda.particlesMaterial.uniforms.uTime.value = clock.getElapsedTime()
    }
    if (deer.isActive) {
        deer.particlesMaterial.uniforms.uTime.value = clock.getElapsedTime()
    }
    if (dog.isActive) {
        dog.particlesMaterial.uniforms.uTime.value = clock.getElapsedTime()
    }
    if (giraffe.isActive) {
        giraffe.particlesMaterial.uniforms.uTime.value = clock.getElapsedTime()
    }
};
animate();


/*------------------------------
Resize
------------------------------*/
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);

/*------------------------------
mouse move
------------------------------*/
function onMouseMove(e) {
    const x = e.clientX
    const y = e.clientY

    gsap.to(scene.rotation, {
        y: gsap.utils.mapRange(0, window.innerWidth, 0.5, -0.5, x),
        x: gsap.utils.mapRange(0, window.innerWidth, 0.25, -0.25, y)
    })
}
window.addEventListener("mousemove", onMouseMove)

