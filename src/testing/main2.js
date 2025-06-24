import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import Model from './model2';

import Lenis from '@studio-freight/lenis';
const lenis = new Lenis({
    // infinite: true
});
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
        if (arguments.length) {
            lenis.scrollTo(value);
        }
        return lenis.scroll;
    },
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    }
});
ScrollTrigger.addEventListener('refresh', () => lenis.resize());

/*------------------------------
Renderer
------------------------------*/
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
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
OrbitControls
------------------------------*/
const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = false;

/*------------------------------
Models
------------------------------*/
const horse = new Model({
    name: "horse",
    file: "/model/horse.glb",
    scene: scene,
    color1: "red",
    color2: "yellow",
    background: "#47001b",
    playOnLoad: true, // Start with horse visible
});
const hand = new Model({
    name: "hand",
    file: "/model/hand.glb",
    scene: scene,
    color1: "blue",
    color2: "pink",
    background: "#110047",
});
const horse2 = new Model({
    name: "horse2",
    file: "/model/horse.glb",
    scene: scene,
    color1: "red",
    color2: "pink",
    background: "#470047",
});


/*------------------------------
Scroll-Based Model Switching
------------------------------*/
ScrollTrigger.create({
    trigger: "#section-horse",
    start: "top top",
    end: "bottom 50%",
    markers: true, // Set to true for debugging
    onEnter: () => {
        if (!horse.isActive) {
            console.log("Entering horse section");
            horse.add();
            hand.remove();
            horse2.remove();
        }
    },
    onEnterBack: () => {
        if (!horse.isActive) {
            console.log("Re-entering horse section");
            horse.add();
            hand.remove();
            horse2.remove();
        }
    },
});
ScrollTrigger.create({
    trigger: "#section-hand",
    start: "top 50%",
    end: "bottom 50%",
    markers: true,
    onEnter: () => {
        if (!hand.isActive) {
            console.log("Entering hand section");
            horse.remove();
            hand.add();
            horse2.remove();
        }
    },
    onEnterBack: () => {
        if (!hand.isActive) {
            console.log("Re-entering hand section");
            horse.remove();
            hand.add();
            horse2.remove();
        }
    }
});
ScrollTrigger.create({
    trigger: "#section-horse2",
    start: "top 50%",
    end: "bottom 50%",
    markers: false,
    onEnter: () => {
        if (!horse2.isActive) {
            console.log("Entering horse2 section");
            horse.remove();
            hand.remove();
            horse2.add();
        }
    },
    onEnterBack: () => {
        if (!horse2.isActive) {
            console.log("Re-entering horse2 section");
            horse.remove();
            hand.remove();
            horse2.add();
        }
    }
});

// function handleScroll() {
//     const scrollY = window.scrollY;
//     const windowHeight = window.innerHeight;
//     const documentHeight = document.documentElement.scrollHeight;
//     const scrollFraction = scrollY / (documentHeight - windowHeight); // 0 to 1
//     const sectionIndex = Math.min(
//         Math.floor(scrollFraction * 3), // Divide scroll into 3 sections
//         2
//     );

//     // Switch models based on section
//     if (sectionIndex === 0 && !horse.isActive) {
//         horse.add();
//         hand.remove();
//         horse2.remove();
//     } else if (sectionIndex === 1 && !hand.isActive) {
//         horse.remove();
//         hand.add();
//         horse2.remove();
//     } else if (sectionIndex === 2 && !horse2.isActive) {
//         horse.remove();
//         hand.remove();
//         horse2.add();
//     }
// }

// // window.addEventListener('scroll', handleScroll);
// let isScrolling = false;
// window.addEventListener('scroll', () => {
//     if (!isScrolling) {
//         isScrolling = true;
//         requestAnimationFrame(() => {
//             handleScroll();
//             isScrolling = false;
//         });
//     }
// });

/*------------------------------
Clock time
------------------------------*/
const clock = new THREE.Clock();

/*------------------------------
Loop
------------------------------*/
const animate = function() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    if (horse.isActive) {
        horse.particlesMaterial.uniforms.uTime.value = clock.getElapsedTime();
    }
    if (hand.isActive) {
        hand.particlesMaterial.uniforms.uTime.value = clock.getElapsedTime();
    }
    if (horse2.isActive) {
        horse2.particlesMaterial.uniforms.uTime.value = clock.getElapsedTime();
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
Mouse Move
------------------------------*/
function onMouseMove(e) {
    const x = e.clientX;
    const y = e.clientY;

    gsap.to(scene.rotation, {
        y: gsap.utils.mapRange(0, window.innerWidth, 0.5, -0.5, x),
        x: gsap.utils.mapRange(0, window.innerHeight, 0.2, -0.2, y) // Adjusted to use innerHeight for y-axis
    });
}
window.addEventListener("mousemove", onMouseMove);
