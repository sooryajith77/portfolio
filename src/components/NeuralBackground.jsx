import React, { useRef, useEffect } from "react";

/**
 * NeuralBackground
 * A full-viewport, fixed, canvas-based animated network of nodes and
 * connecting lines with simulated depth (z-axis) for a 3D parallax feel.
 * Pure Canvas 2D — no extra dependencies (three.js / react-three-fiber)
 * required. Sits behind all page content (z-index handled via CSS class
 * `.neural-bg`) and never intercepts pointer events.
 *
 * Palette: black background, red (#ff1b3d) nodes/lines — matches the
 * portfolio's black & red theme.
 */
export default function NeuralBackground() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const NODE_COUNT = Math.min(90, Math.floor((width * height) / 18000));
    const MAX_DIST = 150; // connect nodes within this distance
    const RED = [255, 27, 61];

    let nodes = [];

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function makeNode() {
      const z = Math.random(); // 0 = far, 1 = near — drives size/opacity/speed
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        vx: (Math.random() - 0.5) * (0.15 + z * 0.35),
        vy: (Math.random() - 0.5) * (0.15 + z * 0.35),
        r: 1 + z * 2.2,
      };
    }

    function init() {
      resize();
      nodes = Array.from({ length: NODE_COUNT }, makeNode);
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    function onMouseMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }

    function step() {
      ctx.clearRect(0, 0, width, height);

      // update + draw nodes
      for (const n of nodes) {
        if (!reduceMotion) {
          n.x += n.vx;
          n.y += n.vy;

          // gentle parallax pull toward mouse, stronger for "nearer" (higher z) nodes
          const dx = (mouseX - width / 2) * 0.02 * n.z;
          const dy = (mouseY - height / 2) * 0.02 * n.z;
          n.x += dx * 0.01;
          n.y += dy * 0.01;

          if (n.x < -20) n.x = width + 20;
          if (n.x > width + 20) n.x = -20;
          if (n.y < -20) n.y = height + 20;
          if (n.y > height + 20) n.y = -20;
        }
      }

      // connecting lines (only between nodes close enough — a real network, not noise)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const opacity = (1 - dist / MAX_DIST) * 0.18 * ((a.z + b.z) / 2 + 0.3);
            ctx.strokeStyle = `rgba(${RED[0]},${RED[1]},${RED[2]},${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes on top, nearer (higher z) ones brighter and bigger
      for (const n of nodes) {
        const opacity = 0.25 + n.z * 0.55;
        const glow = 4 + n.z * 10;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${RED[0]},${RED[1]},${RED[2]},${opacity})`;
        ctx.shadowColor = `rgba(${RED[0]},${RED[1]},${RED[2]},${opacity})`;
        ctx.shadowBlur = glow;
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      rafRef.current = requestAnimationFrame(step);
    }

    init();
    window.addEventListener("resize", init);
    window.addEventListener("mousemove", onMouseMove);
    rafRef.current = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="neural-bg" aria-hidden="true" />;
}