import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface ScrollParticleGlobeTextProps {
  /** The text string that the particles will reassemble into. Can contain newlines. */
  text: string;
  /** The scroll progress of the section, a value between 0 and 1. */
  progress: number;
  /** Total number of particles to render. Tunable for performance. */
  particleCount?: number;
  /** Colors of the particles. */
  particleColor?: string;
  /** Color of the glowing atmosphere effect or composite blend glow. */
  ambientColor?: string;
  /** Rotation speed of the sphere at rest. */
  rotationSpeed?: number;
  /** The distance of the camera from the center of the globe (default: 420 to match Section 2). */
  cameraZ?: number;
  /** The field of view of the camera in degrees (default: 50 to match ThreeJS canvas). */
  fov?: number;
  /** Vertical offset of the globe center (default: 0). */
  yOffset?: number;
  /** Base radius of the globe in 3D units (default: 100). */
  globeRadius?: number;
  /** Extra Tailwind classes for styling the canvas container. */
  className?: string;
}

interface Particle {
  x0: number; // Initial sphere coordinates
  y0: number;
  z0: number;

  scatterX: number; // Scattered coordinates during explosion phase
  scatterY: number;
  scatterZ: number;

  tx: number; // Target text coordinates in 3D space (at Z = 0)
  ty: number;
  tz: number;

  delay: number; // Delay factor for organic staggered motion
  baseSize: number; // Base radius of the individual dot
  colorOffset: number; // Variation for subtle particle twinkle/glow
}

export const ScrollParticleGlobeText: React.FC<ScrollParticleGlobeTextProps> = ({
  text,
  progress,
  particleCount = 900,
  particleColor = "#ffffff",
  ambientColor = "#ffffff",
  rotationSpeed = 1.2,
  cameraZ = 420,
  fov = 50,
  yOffset = 0,
  globeRadius = 100,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Monitor element dimensions and determine if mobile
  useEffect(() => {
    if (!containerRef.current) return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        // Make sure we only set non-zero dimensions
        if (width > 0 && height > 0) {
          setDimensions({ width, height });
        }
      }
    });

    observer.observe(containerRef.current);

    return () => {
      window.removeEventListener("resize", checkMobile);
      observer.disconnect();
    };
  }, []);

  // Initialize and reconstruct particles when text, dimensions, or count changes
  useEffect(() => {
    const { width, height } = dimensions;
    if (width === 0 || height === 0) return;

    // Scale particle count down slightly on mobile for standard 2D canvas budget
    const activeCount = isMobile ? Math.min(450, particleCount) : particleCount;

    // 1. Generate text points offscreen
    const textPoints = getSampledTextPoints(text, width, height);

    // 2. Generate Fibonacci sphere coordinates
    const spherePoints = generateFibonacciSphere(activeCount, globeRadius);

    // 3. Create Particle structures
    const fovRad = (fov * Math.PI) / 180;
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const cameraFactorX = (cameraZ * Math.tan(fovRad / 2)) / halfWidth;
    const cameraFactorY = (cameraZ * Math.tan(fovRad / 2)) / halfHeight;

    const particles: Particle[] = [];

    for (let i = 0; i < activeCount; i++) {
      const sPt = spherePoints[i];

      // Create an organic radial scatter direction
      // Blow out particles by 1.6x to 3.2x their original radius
      const scatterMultiplier = 1.8 + Math.random() * 1.4;
      const noise = globeRadius * 0.15;
      
      const scatterX = sPt.x * scatterMultiplier + (Math.random() - 0.5) * noise;
      const scatterY = sPt.y * scatterMultiplier + (Math.random() - 0.5) * noise;
      const scatterZ = sPt.z * scatterMultiplier + (Math.random() - 0.5) * noise;

      // Map to corresponding text coordinate
      let tx = 0;
      let ty = 0;
      let tz = 0;

      if (textPoints.length > 0) {
        const targetIdx = Math.floor((i * textPoints.length) / activeCount);
        const tPt = textPoints[targetIdx % textPoints.length];
        
        // Inverse projection from screen 2D to 3D space at Z = 0
        tx = (tPt.x - halfWidth) * cameraFactorX;
        ty = -(tPt.y - halfHeight) * cameraFactorY;
        
        // Add a slight jitter so particles don't map to identical spots
        tx += (Math.random() - 0.5) * 1.8;
        ty += (Math.random() - 0.5) * 1.8;
      } else {
        // Fallback target if no text is rendered
        tx = sPt.x * 0.1;
        ty = sPt.y * 0.1;
      }

      particles.push({
        x0: sPt.x,
        y0: sPt.y,
        z0: sPt.z,
        scatterX,
        scatterY,
        scatterZ,
        tx,
        ty,
        tz,
        delay: Math.random() * 0.25, // Stagger value
        baseSize: 0.95 + Math.random() * 1.1, // Particle size variation
        colorOffset: Math.random() * 0.4,
      });
    }

    particlesRef.current = particles;
  }, [text, dimensions, particleCount, globeRadius, cameraZ, fov, isMobile]);

  // Main animation and projection loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = dimensions;
    if (width === 0 || height === 0) return;

    // Setup high-DPI scaling
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    let lastTime = performance.now();
    let accumulatedAngle = 0;

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      // Update rotation angle
      // autoRotateSpeed 1.2 corresponds to roughly 0.08 radians per second
      accumulatedAngle -= deltaTime * (rotationSpeed * 0.08);

      ctx.clearRect(0, 0, width, height);

      // Blend mode for high-tech premium glow
      ctx.globalCompositeOperation = "lighter";

      const particles = particlesRef.current;
      const fovRad = (fov * Math.PI) / 180;
      const halfWidth = width / 2;
      const halfHeight = height / 2;
      const fovTan = Math.tan(fovRad / 2);

      // Cache rotation values
      const cosA = Math.cos(accumulatedAngle);
      const sinA = Math.sin(accumulatedAngle);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 2. Rotate coordinates
        const rx = p.x0 * cosA - p.z0 * sinA;
        const ry = p.y0;
        const rz = p.x0 * sinA + p.z0 * cosA;

        const rsx = p.scatterX * cosA - p.scatterZ * sinA;
        const rsy = p.scatterY;
        const rsz = p.scatterX * sinA + p.scatterZ * cosA;

        let x3d = 0;
        let y3d = 0;
        let z3d = 0;
        let activeTextWeight = 0;

        if (progress <= 0.5) {
          // Transition from Globe to Text (Progress 0.0 -> 0.25)
          const t_start = p.delay * 0.1;
          const t_end = 0.18 + p.delay * 0.1;
          const t_w = easeInOutQuad(clamp((progress - t_start) / (t_end - t_start), 0, 1));
          
          x3d = rx * (1 - t_w) + p.tx * t_w;
          y3d = ry * (1 - t_w) + p.ty * t_w;
          z3d = rz * (1 - t_w) + p.tz * t_w;
          
          activeTextWeight = t_w;
        } else {
          // Transition from Text to Scatter (Progress 0.7 -> 0.95)
          const s_start = 0.70 + p.delay * 0.1;
          const s_end = 0.88 + (0.12 - p.delay * 0.4);
          const s_w = easeInOutQuad(clamp((progress - s_start) / (s_end - s_start), 0, 1));
          
          x3d = p.tx * (1 - s_w) + rsx * s_w;
          y3d = p.ty * (1 - s_w) + rsy * s_w;
          z3d = p.tz * (1 - s_w) + rsz * s_w;
          
          activeTextWeight = 1 - s_w;
        }

        // 6. Project 3D coordinate to 2D screen coordinate
        // z3d represents the point depth, camera is at cameraZ
        const distToCam = cameraZ - z3d;
        if (distToCam <= 10) continue; // Clip behind camera

        const scale = halfWidth / (distToCam * fovTan);
        const px = halfWidth + x3d * scale;
        const py = halfHeight - (y3d + yOffset) * scale;

        // Skip drawing if outside canvas boundaries
        if (px < -10 || px > width + 10 || py < -10 || py > height + 10) continue;

        // 7. Depth cueing: particles closer to camera are larger and brighter
        const depthFactor = clamp((z3d + globeRadius) / (2 * globeRadius), 0, 1);
        const alpha = 0.35 + depthFactor * 0.55 * (1 - activeTextWeight * 0.4); // Subtle dim when forming text
        const size = p.baseSize * (cameraZ / distToCam);

        // Draw particle
        ctx.beginPath();
        ctx.arc(px, py, Math.max(0.5, size), 0, 2 * Math.PI);

        // Twinkling effect or solid color
        ctx.fillStyle = hexToRgbA(particleColor, alpha);
        ctx.fill();

        // Optional ambient glow for front-most particles (only when not in full text form)
        if (z3d > globeRadius * 0.4 && activeTextWeight < 0.6) {
          ctx.beginPath();
          ctx.arc(px, py, size * 2.5, 0, 2 * Math.PI);
          ctx.fillStyle = hexToRgbA(ambientColor, alpha * 0.15);
          ctx.fill();
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dimensions, progress, rotationSpeed, cameraZ, fov, yOffset, globeRadius, particleColor, ambientColor]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-full select-none pointer-events-none", className)}
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full pointer-events-none"
        style={{ backfaceVisibility: "hidden" }}
      />
    </div>
  );
};

// --- HELPER UTILS ---

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

function easeInOutQuad(x: number): number {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

function generateFibonacciSphere(count: number, radius: number) {
  const points = [];
  const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
    const radiusAtY = Math.sqrt(1 - y * y); // Radius at this height

    const theta = phi * i;

    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;

    points.push({
      x: x * radius,
      y: y * radius,
      z: z * radius,
    });
  }
  return points;
}

/**
 * Renders text on an offscreen canvas and returns all non-transparent coordinates.
 */
function getSampledTextPoints(text: string, width: number, height: number): { x: number; y: number }[] {
  if (typeof document === "undefined") return [];

  const offscreen = document.createElement("canvas");
  offscreen.width = width;
  offscreen.height = height;

  const ctx = offscreen.getContext("2d");
  if (!ctx) return [];

  // Clear context
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, width, height);

  // Setup text formatting
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const isParagraph = text.length > 30;
  const baseFontSize = isParagraph ? 42 : 110;

  // Split lines manually or auto-wrap
  let lines = text.split("\n");
  if (lines.length === 1 && isParagraph) {
    lines = wrapText(ctx, text, width * 0.85, baseFontSize);
  }

  // Adjust font size dynamically to fit within canvas bounds
  let fontSize = baseFontSize;
  let totalHeight = lines.length * fontSize * 1.35;
  const maxAllowedWidth = width * 0.88;
  const maxAllowedHeight = height * 0.78;

  ctx.font = `bold ${fontSize}px Outfit, Gilroy, sans-serif`;
  let maxLineWidth = 0;
  lines.forEach((line) => {
    const w = ctx.measureText(line).width;
    if (w > maxLineWidth) maxLineWidth = w;
  });

  if (maxLineWidth > maxAllowedWidth || totalHeight > maxAllowedHeight) {
    const scaleX = maxAllowedWidth / maxLineWidth;
    const scaleY = maxAllowedHeight / totalHeight;
    const scale = Math.min(scaleX, scaleY);
    fontSize = Math.floor(fontSize * scale);
    totalHeight = lines.length * fontSize * 1.35;
  }

  ctx.font = `bold ${fontSize}px Outfit, Gilroy, sans-serif`;

  // Draw lines centered
  const startY = (height - totalHeight) / 2 + fontSize * 0.65;
  lines.forEach((line, idx) => {
    ctx.fillText(line, width / 2, startY + idx * fontSize * 1.35);
  });

  // Collect active pixel coordinates
  const imgData = ctx.getImageData(0, 0, width, height);
  const points: { x: number; y: number }[] = [];
  const step = 2; // Step size controls dot spacing/resolution

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const idx = (y * width + x) * 4;
      const r = imgData.data[idx];
      const g = imgData.data[idx + 1];
      const b = imgData.data[idx + 2];
      // Collect pixels that are sufficiently white/bright
      if (r > 120 && g > 120 && b > 120) {
        points.push({ x, y });
      }
    }
  }

  return points;
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, fontSize: number): string[] {
  ctx.font = `bold ${fontSize}px Outfit, Gilroy, sans-serif`;
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + " " + word).width;
    if (width < maxWidth) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}

/**
 * Converts a hex color to rgba color string.
 */
function hexToRgbA(hex: string, alpha: number): string {
  // Simple check for rgb/rgba formats
  if (hex.startsWith("rgb")) {
    return hex.replace("rgb(", "rgba(").replace(")", `, ${alpha})`);
  }

  let c = hex.substring(1);
  if (c.length === 3) {
    c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
  }
  const num = parseInt(c, 16);
  return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
}
