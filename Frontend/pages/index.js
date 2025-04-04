'use client';

import { useEffect, useRef } from 'react';

export default function LoadingScreen() {
  const canvasRef = useRef(null);
  let tick = 0;
  const particles = [];

  class Particle {
    constructor({ x, y, angle, speed, accel }) {
      this.x = x;
      this.y = y;
      this.angle = angle;
      this.speed = speed;
      this.accel = accel;
      this.radius = 2;
      this.hue = tick;
    }

    step() {
      this.speed += this.accel;
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;
      this.radius *= 0.98;
      this.hue += 2;
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${this.hue}, 100%, 60%)`;
      ctx.fill();
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const step = () => {
      tick++;
      const angle = tick * 0.05;
      const min = Math.min(width, height);

      particles.push(
        new Particle({
          x: width / 2 + Math.cos(tick / 20) * (min / 2) * 0.4,
          y: height / 2 + Math.sin(tick / 20) * (min / 2) * 0.4,
          angle,
          speed: 0,
          accel: 0.01,
        })
      );

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p, i) => {
        p.step();
        p.draw(ctx);
        if (p.radius < 0.5) particles.splice(i, 1);
      });

      requestAnimationFrame(step);
    };

    step();

    // Resize canvas if window size changes
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Gradient background behind canvas */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1D818A] to-[#421763] z-0" />

      {/* Canvas Animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-10"
      ></canvas>

      {/* Optional Centered Text */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <h1 className="text-white text-4xl font-bold font-serif">Loading...</h1>
      </div>
    </div>
  );
}
