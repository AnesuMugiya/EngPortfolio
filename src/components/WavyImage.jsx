import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * WavyImage — a self‑contained React component that renders a shader‑warped image.
 *
 * Usage:
 *   <WavyImage src="/images/avatar.png" className="h-[60vh] w-full" />
 *
 * Notes:
 * - Put your image in /public (Vite serves it at "/images/…").
 * - Component cleans up WebGL resources on unmount.
 */
export default function WavyImage({
  src,
  className = "w-full h-[80vh]",
  baseIntensity = 0.007,
  hoverIntensity = 0.01,
  transitionSpeed = 0.05,
  pixelRatioCap = 2,
}) {
  const containerRef = useRef(null);
  const stateRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    plane: null,
    uniforms: null,
    raf: 0,
    current: { mouse: { x: 0, y: 0 }, intensity: baseIntensity },
    target: { mouse: { x: 0, y: 0 }, intensity: baseIntensity },
  });

  // Shaders (same logic as your original file)
  const vertexShader = /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = /* glsl */ `
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform float u_intensity;
    uniform sampler2D u_texture;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      float wave1 = sin(uv.x * 10.0 + u_time * 0.5 + u_mouse.x * 5.0) * u_intensity;
      float wave2 = sin(uv.y * 12.0 + u_time * 0.8 + u_mouse.y * 4.0) * u_intensity;
      float wave3 = cos(uv.x * 8.0  + u_time * 0.5 + u_mouse.x * 3.0) * u_intensity;
      float wave4 = cos(uv.y * 9.0  + u_time * 0.7 + u_mouse.y * 3.5) * u_intensity;
      uv.y += wave1 + wave2;
      uv.x += wave3 + wave4;
      gl_FragColor = texture2D(u_texture, uv);
    }
  `;

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !src) return;

    // Sizes
    const getSize = () => ({
      w: el.clientWidth || window.innerWidth,
      h: el.clientHeight || window.innerHeight,
    });
    let { w, h } = getSize();

    // Camera
    const camera = new THREE.PerspectiveCamera(90, (1.2*w) / (h), 0.01, 10);
    camera.position.z = 1;

    // Scene
    const scene = new THREE.Scene();

    // Texture
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(src);

    // Uniforms
    const uniforms = {
      u_time: { value: 1.0 },
      u_mouse: { value: new THREE.Vector2() },
      u_intensity: { value: baseIntensity },
      u_texture: { value: texture },
    };

    // Mesh
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
      })
    );
    scene.add(plane);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, pixelRatioCap));
    renderer.setSize(w, h);
    el.appendChild(renderer.domElement);

    // Save to state
    const S = stateRef.current;
    S.scene = scene;
    S.camera = camera;
    S.renderer = renderer;
    S.plane = plane;
    S.uniforms = uniforms;
    S.current.intensity = baseIntensity;
    S.target.intensity = baseIntensity;

    // Events
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      S.target.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      S.target.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    const onOver = () => {
      S.target.intensity = hoverIntensity;
    };
    const onOut = () => {
      S.target.intensity = baseIntensity;
      S.target.mouse = { x: 0, y: 0 };
    };
    const onResize = () => {
      const size = getSize();
      w = size.w; h = size.h;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseover", onOver);
    el.addEventListener("mouseout", onOut);
    window.addEventListener("resize", onResize);

    // Helpers
    const lerp = (a, b, t) => a + (b - a) * t;

    // Animate
    const animate = () => {
      S.current.mouse.x = lerp(S.current.mouse.x, S.target.mouse.x, transitionSpeed);
      S.current.mouse.y = lerp(S.current.mouse.y, S.target.mouse.y, transitionSpeed);
      S.current.intensity = lerp(S.current.intensity, S.target.intensity, transitionSpeed);

      uniforms.u_time.value += 0.005;
      uniforms.u_intensity.value = S.current.intensity;
      uniforms.u_mouse.value.set(S.current.mouse.x, S.current.mouse.y);

      renderer.render(scene, camera);
      S.raf = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(stateRef.current.raf);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseover", onOver);
      el.removeEventListener("mouseout", onOut);
      window.removeEventListener("resize", onResize);

      if (renderer.domElement && renderer.domElement.parentNode === el) {
        el.removeChild(renderer.domElement);
      }

      plane.geometry.dispose();
      plane.material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, [src, baseIntensity, hoverIntensity, transitionSpeed, pixelRatioCap]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "relative", overflow: "hidden" }}
      aria-label="Wavy image canvas"
      role="img"
    />
  );
}
