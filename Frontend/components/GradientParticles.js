// File: components/GradientParticles.js
"use client";

import { useEffect, useRef } from "react";

export default function GradientParticles() {
  const canvasRef = useRef(null);
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      constructor(x, y, velocity, color) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 4 + 1;
        this.velocityX = velocity.x;
        this.velocityY = velocity.y;
        this.color = color;
      }

      update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.size *= 0.96;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    function getPointerVelocity(e) {
      const a = e.movementX;
      const b = e.movementY;
      const speed = Math.sqrt(a * a + b * b) * 0.2;
      return { x: a * 0.1, y: b * 0.1, speed };
    }

    function handleParticles(e) {
      const velocity = getPointerVelocity(e);
      const colors = [
        "#1D818A", // teal
        "#3B5BA5", // blueish
        "#5E3F99", // purple
        "#421763"  // deep violet
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];

      for (let i = 0; i < 6; i++) {
        particles.current.push(new Particle(e.clientX, e.clientY, velocity, color));
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i];
        p.update();
        p.draw();
        if (p.size <= 0.5) {
          particles.current.splice(i, 1);
          i--;
        }
      }

      requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", handleParticles);
    animate();

    return () => window.removeEventListener("mousemove", handleParticles);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    ></canvas>
  );
}
