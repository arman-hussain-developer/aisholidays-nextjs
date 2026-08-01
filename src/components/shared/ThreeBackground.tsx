"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * ThreeBackground — subtle ambient 3D backdrop with floating particles.
 * Used as a decorative layer behind sections. Auto-disables on mobile.
 * GPU-friendly: small particle count, low pixel ratio cap.
 *
 * Props:
 *  - color: hex string for particles (default: leaf green)
 *  - count: number of particles (default 80)
 *  - className: positioning (e.g. "absolute inset-0")
 */
interface ThreeBackgroundProps {
  color?: string;
  count?: number;
  className?: string;
}

export function ThreeBackground({
  color = "#7CC242",
  count = 80,
  className = "absolute inset-0",
}: ThreeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Skip on mobile / reduced motion
    if (window.matchMedia("(max-width: 768px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId: number;
    const { clientWidth: w, clientHeight: h } = container;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Particles (simple buffer geometry)
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      velocities[i * 3 + 0] = (Math.random() - 0.5) * 0.005;
      velocities[i * 3 + 1] = Math.random() * 0.01 + 0.002;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size: 0.08,
      transparent: true,
      opacity: 0.65,
      sizeAttenuation: true,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Mouse parallax (gentle)
    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.3;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 0.3;
    };
    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const pos = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 0] += velocities[i * 3 + 0];
        pos[i * 3 + 1] += velocities[i * 3 + 1];
        pos[i * 3 + 2] += velocities[i * 3 + 2];

        // Wrap around when out of bounds
        if (pos[i * 3 + 1] > 4) pos[i * 3 + 1] = -4;
        if (Math.abs(pos[i * 3 + 0]) > 7) pos[i * 3 + 0] *= -1;
      }
      geometry.attributes.position.needsUpdate = true;

      // Camera parallax
      camera.position.x += (mouseX - camera.position.x) * 0.04;
      camera.position.y += (-mouseY - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const onResize = () => {
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [color, count]);

  return <div ref={containerRef} aria-hidden className={className} />;
}
