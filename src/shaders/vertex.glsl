varying vec2 vUv;
varying vec3 vPosition;
uniform float uTime;
uniform float uScale;
attribute vec3 aRandom;

void main() {
    vUv = uv;
    float PI = 3.1415925;
    vPosition = position;

    vec3 pos = position;
    float time = uTime * 3.25;
    pos.x += sin(time * aRandom.x) * 0.01;
    pos.y += cos(time * aRandom.y) * 0.01;
    pos.z += sin(time * aRandom.z) * 0.01;

    pos.x *= uScale + (sin(pos.y * 4. + time) * (1. - uScale));
    pos.y *= uScale + (cos(pos.z * 4. + time) * (1. - uScale));
    pos.z *= uScale + (sin(pos.x * 4. + time) * (1. - uScale));

    pos *= uScale; 

    vec4 mvPosition =  modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = 8.0 / -mvPosition.z;
}

