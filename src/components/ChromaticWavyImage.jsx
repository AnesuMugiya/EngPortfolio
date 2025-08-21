import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * ChromaticWavyImage — React component that reproduces your grid-based
 * displacement + chromatic aberration effect using Three.js shaders.
 *
 * Props:
 *  - src: string (required) — image path, e.g. "/images/avatar.png"
 *  - className: string — container sizing (Tailwind-friendly)
 *  - pixelRatioCap: number — caps devicePixelRatio (default 2)
 *  - initialEase: number — starting easing factor (default 0.02)
 *  - leaveEase: number — easing used on mouse leave (default 0.05)
 */
export default function ChromaticWavyImage({
  src,
  className = "w-full",
  pixelRatioCap = 2,
  initialEase = 0.02,
  leaveEase = 0.05,
}) {
  const containerRef = useRef(null);
  const [aspectRatio, setAspectRatio] = useState(0.75); // default 4:3
  const stateRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    plane: null,
    uniforms: null,
    raf: 0,
    easeFactor: initialEase,
    mouse: { x: 0.5, y: 0.5 },
    targetMouse: { x: 0.5, y: 0.5 },
    prevTarget: { x: 0.5, y: 0.5 },
    aberrationIntensity: 0.0,
  });

  // Shaders
  const vertexShader = /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = /* glsl */ `
    varying vec2 vUv;
    uniform sampler2D u_texture;
    uniform vec2 u_mouse;
    uniform vec2 u_prevMouse;
    uniform float u_aberrationIntensity;

    void main() {
        vec2 gridUV = floor(vUv * vec2(20.0, 20.0)) / vec2(20.0, 20.0);
        vec2 centerOfPixel = gridUV + vec2(1.0/20.0, 1.0/20.0);

        vec2 mouseDirection = u_mouse - u_prevMouse;

        vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
        float pixelDistanceToMouse = length(pixelToMouseDirection);
        float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);

        vec2 uvOffset = strength * - mouseDirection * 0.2;
        vec2 uv = vUv - uvOffset;

        vec4 colorR = texture2D(u_texture, uv + vec2(strength * u_aberrationIntensity * 0.01, 0.0));
        vec4 colorG = texture2D(u_texture, uv);
        vec4 colorB = texture2D(u_texture, uv - vec2(strength * u_aberrationIntensity * 0.01, 0.0));

        gl_FragColor = vec4(colorR.r, colorG.g, colorB.b, 1.0);
    }
  `;

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !src) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(92, -100, 0.01, 10);
    camera.position.z = 1;

    // Texture loader (compute aspect once loaded)
    const loader = new THREE.TextureLoader();
    const texture = loader.load(src, (tex) => {
      const iw = tex.image?.naturalWidth || tex.image?.width || 1;
      const ih = tex.image?.naturalHeight || tex.image?.height || 0.9;
      const newAspect = ih / iw;
      setAspectRatio(newAspect);
    });

    // Uniforms
    const uniforms = {
      u_texture: { value: texture },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_prevMouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_aberrationIntensity: { value: 0.0 },
    };

    // Mesh
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader,transparent: true })
    );
    scene.add(plane);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true,
      premultipliedAlpha: false });
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, pixelRatioCap));
    el.appendChild(renderer.domElement);

    // Size the canvas to the container (respect Tailwind widths)
    const resizeToContainer = () => {
      const rect = el.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));

      renderer.setSize(w, h, false);
      
      // Camera aspect will be handled by the separate useEffect
      // Just ensure canvas fills container exactly
      const c = renderer.domElement;
      c.style.display = "inline-block";
      c.style.width = "82%";
      c.style.height = "100%";
      c.style.background = "none";
    };

    const ro = new ResizeObserver(resizeToContainer);
    ro.observe(el);
    resizeToContainer();

    // Save to state
    const S = stateRef.current;
    S.scene = scene;
    S.camera = camera;
    S.renderer = renderer;
    S.plane = plane;
    S.uniforms = uniforms;
    S.easeFactor = initialEase;

    // Events
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      S.prevTarget = { ...S.targetMouse };
      S.targetMouse.x = (e.clientX - rect.left) / rect.width;
      S.targetMouse.y = (e.clientY - rect.top) / rect.height;
      S.aberrationIntensity = 1.0;
      S.easeFactor = initialEase;
    };

    const onEnter = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      S.mouse.x = S.targetMouse.x = x;
      S.mouse.y = S.targetMouse.y = y;
      S.easeFactor = initialEase;
    };

    const onLeave = () => {
      S.easeFactor = leaveEase;
      S.targetMouse = { ...S.prevTarget };
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    // Animation loop
    const animate = () => {
      S.mouse.x += (S.targetMouse.x - S.mouse.x) * S.easeFactor;
      S.mouse.y += (S.targetMouse.y - S.mouse.y) * S.easeFactor;

      uniforms.u_mouse.value.set(S.mouse.x, 1.0 - S.mouse.y);
      uniforms.u_prevMouse.value.set(S.prevTarget.x, 1.0 - S.prevTarget.y);

      S.aberrationIntensity = Math.max(0.0, S.aberrationIntensity - 0.05);
      uniforms.u_aberrationIntensity.value = S.aberrationIntensity;

      renderer.render(scene, camera);
      S.raf = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(stateRef.current.raf);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      ro.disconnect();

      if (renderer.domElement && renderer.domElement.parentNode === el) {
        el.removeChild(renderer.domElement);
      }
      plane.geometry.dispose();
      plane.material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, [src, pixelRatioCap, initialEase, leaveEase]);

  // Separate effect to update camera aspect when aspectRatio changes
  useEffect(() => {
    const S = stateRef.current;
    if (S.camera && aspectRatio > 0) {
      S.camera.aspect = 1 / aspectRatio; // convert height/width to width/height
      S.camera.updateProjectionMatrix();
    }
  }, [aspectRatio]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ 
        position: "relative", 
        overflow: "hidden",
        aspectRatio: `1 / ${aspectRatio}`
      }}
      aria-label="Chromatic wavy image canvas"
      role="img"
    />
  );
}