"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Subtle WebGL water-light caustics that drift behind the hero. Intentionally
 * low-contrast and slow — "late-afternoon light moving across a room," not a
 * gimmick. Rendered only on capable desktops (see hero-backdrop-lazy.tsx) and
 * always behind a heavy mask, so it never hurts readability or performance.
 */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uSky;
  uniform vec3 uDeep;
  uniform vec3 uGold;

  float caustic(vec2 p) {
    float t = uTime * 0.16;
    vec2 q = p * 3.2;
    float v = 0.0;
    v += sin(q.x + t);
    v += sin(q.y * 1.3 - t * 1.1);
    v += sin((q.x + q.y) * 0.8 + t * 0.7);
    vec2 r = vec2(sin(q.y + t), cos(q.x - t));
    v += sin(length(q + r) * 1.4 - t * 1.3);
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float c = caustic(uv) * 0.25 + 0.5;
    float lines = smoothstep(0.55, 0.96, c);
    vec3 col = mix(uDeep, uSky, c);
    col += uGold * pow(lines, 3.0) * 0.45;
    // fade toward edges so it melts into the page
    float vignette = smoothstep(1.05, 0.2, distance(uv, vec2(0.5)));
    float alpha = (0.30 + lines * 0.32) * vignette;
    gl_FragColor = vec4(col, alpha);
  }
`;

function CausticsPlane() {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSky: { value: new THREE.Color("#3da5d9") },
      uDeep: { value: new THREE.Color("#0b2942") },
      uGold: { value: new THREE.Color("#f2a93b") },
    }),
    []
  );

  useFrame((_, delta) => {
    if (matRef.current) {
      // clamp delta so a backgrounded tab doesn't jump the animation
      matRef.current.uniforms.uTime.value += Math.min(delta, 0.05);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export default function HeroBackdrop() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      style={{ width: "100%", height: "100%" }}
      frameloop="always"
    >
      <CausticsPlane />
    </Canvas>
  );
}
