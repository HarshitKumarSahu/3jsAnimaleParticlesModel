uniform vec3 uColor1;
uniform vec3 uColor2;
varying vec3 vPosition;

void main() { 
    float depth = vPosition.z * 0.5 + 0.5;
    vec3 color = mix(uColor1, uColor2, depth);
    gl_FragColor = vec4(color, depth * 0.3 + 0.2);
}
