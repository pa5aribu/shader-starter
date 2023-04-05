precision mediump float;

uniform float uTime;

varying vec2 vUv;

void main() {
  vUv = uv;

  vec3 p = position;
  p.z = sin(p.x + uTime) / 4. * cos(p.y + uTime) / 4.;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( p, 1.0 );
}