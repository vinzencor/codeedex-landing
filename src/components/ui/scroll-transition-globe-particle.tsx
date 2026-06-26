import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface ScrollTransitionGlobeParticleProps {
  /** The text string that the particles will reassemble into. */
  text: string;
  /** The global scroll progress (0.0 at top of page, 1.0 when reached Section 2). */
  progress: number;
  /** Total number of particles to render. */
  particleCount?: number;
  /** Colors of the particles. */
  particleColor?: string;
  /** Color of the glowing atmosphere effect or composite blend. */
  ambientColor?: string;
  /** Rotation speed of the globes. */
  rotationSpeed?: number;
  className?: string;
}

interface Particle {
  // Relative unit sphere coordinates (from 0 to 1)
  sx: number;
  sy: number;
  sz: number;

  // Scatter noise offsets
  scatterOffsetX: number;
  scatterOffsetY: number;
  scatterOffsetZ: number;

  // Target text coordinates in Section 2 (3D space relative to Section 2 center)
  tx: number;
  ty: number;
  tz: number;

  isTextParticle: boolean; // True if this particle forms text in Section 2
  delay: number; // Stagger factor for transitions
  baseSize: number; // Size scale of individual particle
}

export const ScrollTransitionGlobeParticle: React.FC<ScrollTransitionGlobeParticleProps> = ({
  text,
  progress,
  particleCount = 1200,
  particleColor = "#ffffff",
  ambientColor = "#ffffff",
  rotationSpeed = 1.2,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  const [dimensions, setDimensions] = useState({ width: 0, height: 2048 });
  const [isMobile, setIsMobile] = useState(false);

  // Monitor canvas size
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

  // Initialize particles
  useEffect(() => {
    const { width } = dimensions;
    if (width === 0) return;

    const activeCount = isMobile ? Math.min(600, particleCount) : particleCount;

    // Offscreen text points in Section 2 (container size 976 x 976)
    const textPoints = getSampledTextPoints(text, 976, 976);

    // Generate unit sphere points
    const spherePoints = generateFibonacciSphere(activeCount);

    const particles: Particle[] = [];

    // Section 2 parameters for inverse text projection
    const cameraZ = 420;
    const fov = 50;
    const fovRad = (fov * Math.PI) / 180;
    const halfTextCanvas = 488; // 976 / 2
    const cameraFactorX = (cameraZ * Math.tan(fovRad / 2)) / halfTextCanvas;
    const cameraFactorY = (cameraZ * Math.tan(fovRad / 2)) / halfTextCanvas;

    for (let i = 0; i < activeCount; i++) {
      const sPt = spherePoints[i];
      const isTextParticle = i % 2 === 0 && textPoints.length > 0;

      // Assign organic scatter noise
      const scatterMultiplier = 150 + Math.random() * 200;
      const scatterOffsetX = (Math.random() - 0.5) * scatterMultiplier;
      const scatterOffsetY = (Math.random() - 0.5) * scatterMultiplier;
      const scatterOffsetZ = (Math.random() - 0.5) * scatterMultiplier;

      let tx = 0;
      let ty = 0;
      let tz = 0;

      if (isTextParticle) {
        const targetIdx = Math.floor((i / 2) * textPoints.length / (activeCount / 2));
        const tPt = textPoints[targetIdx % textPoints.length];

        // Inverse project text from 2D screen to 3D world coords
        tx = (tPt.x - halfTextCanvas) * cameraFactorX;
        ty = -(tPt.y - halfTextCanvas) * cameraFactorY;

        // Jitter text position slightly to fill letters beautifully
        tx += (Math.random() - 0.5) * 1.5;
        ty += (Math.random() - 0.5) * 1.5;
      }

      particles.push({
        sx: sPt.x,
        sy: sPt.y,
        sz: sPt.z,
        scatterOffsetX,
        scatterOffsetY,
        scatterOffsetZ,
        tx,
        ty,
        tz,
        isTextParticle,
        delay: Math.random() * 0.25, // Stagger parameter
        baseSize: 1.6 + Math.random() * 1.4,
      });
    }

    particlesRef.current = particles;
  }, [text, dimensions.width, particleCount, isMobile]);

  // Main render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = dimensions;
    if (width === 0 || height === 0) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const animate = () => {

      // Use global performance.now() to ensure frame-perfect synchronization with ThreeJS Globe
      const time = performance.now() / 1000;
      const accumulatedAngle = -time * (rotationSpeed * 0.08);

      ctx.clearRect(0, 0, width, height);

      if (progress < 0.02) {
        return;
      }

      // Glow blending
      ctx.globalCompositeOperation = "lighter";

      const particles = particlesRef.current;

      // Globe positions on page
      const viewportHeight = height / 2;
      const C1_x = width / 2 - 3;
      const C1_y = viewportHeight - 39;
      const C2_x = width / 2 - 8;
      const C2_y = viewportHeight + (viewportHeight * 0.4775);

      // Globe radii on page
      const R1 = 443;
      const R2 = 249;

      // Precompute rotation matrices (combining time-based rotation with scroll-driven spin and X-axis tumble)
      const rotY = accumulatedAngle - progress * Math.PI * 3.2;
      const rotX = -progress * Math.PI * 0.4;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // --- TIMELINE INTERPOLATIONS ---
        // Progress 0.0 -> 0.45: Transition from Section 1 Globe to Section 2 (Bell-curve Scatter & Travel)
        // Progress 0.45 -> 0.70: Stable in Section 2 (Text formed & Globe formed)
        // Progress 0.70 -> 1.00: Scatter / Dissolve out of Section 2

        let finalX = 0;
        let finalY = 0;
        let finalZ = 0;
        let textWeight = 0;
        let uVal = 0;

        // Y-axis rotation (time + scroll)
        let rx = p.sx * cosY - p.sz * sinY;
        let ry = p.sy;
        let rz = p.sx * sinY + p.sz * cosY;

        // X-axis rotation (scroll tumble)
        const ryX = ry * cosX - rz * sinX;
        const rzX = ry * sinX + rz * cosX;
        ry = ryX;
        rz = rzX;

        if (progress <= 0.5) {
          // Travel and transition from Section 1 to Section 2 (peels off early)
          const u_start = 0.05 + p.delay * 0.15;
          const u_end = 0.42 + p.delay * 0.06;
          const u = easeInOutQuad(clamp((progress - u_start) / (u_end - u_start), 0, 1));
          uVal = u;

          // Interpolated center and radius
          const centerY = lerp(C1_y, C2_y, u);
          const centerX = lerp(C1_x, C2_x, u);
          const radius = lerp(R1, R2, u);

          // Position relative to current center
          const sphereX = rx * radius;
          const sphereY = ry * radius;
          const sphereZ = rz * radius;

          // Scatter amount is a bell curve peaking at midpoint
          const scatterVal = Math.sin(u * Math.PI);
          const scX = p.scatterOffsetX * scatterVal;
          const scY = p.scatterOffsetY * scatterVal;
          const scZ = p.scatterOffsetZ * scatterVal;

          if (p.isTextParticle) {
            // Text particles transition from Globe to flat Text shape
            const textX = p.tx;
            const textY = p.ty;
            const textZ = p.tz;

            // lerp from relative rotating sphere to relative static text
            const relX = lerp(sphereX, textX, u);
            const relY = lerp(sphereY, textY, u);
            const relZ = lerp(sphereZ, textZ, u);

            finalX = centerX + relX + scX;
            finalY = centerY + relY + scY;
            finalZ = relZ + scZ;
            textWeight = u;
          } else {
            // Globe particles transition from Globe 1 to Globe 2
            finalX = centerX + sphereX + scX;
            finalY = centerY + sphereY + scY;
            finalZ = sphereZ + scZ;
          }
        } else {
          // Stable / Scatter phase in Section 2
          const s_start = 0.70 + p.delay * 0.1;
          const s_end = 0.88 + (0.12 - p.delay * 0.4);
          const s_w = easeInOutQuad(clamp((progress - s_start) / (s_end - s_start), 0, 1));

          // Center and radius are locked to Section 2
          const centerX = C2_x;
          const centerY = C2_y;
          const radius = R2;

          const sphereX = rx * radius;
          const sphereY = ry * radius;
          const sphereZ = rz * radius;

          // Disperse scatter outwards
          const scX = p.scatterOffsetX * s_w;
          const scY = p.scatterOffsetY * s_w;
          const scZ = p.scatterOffsetZ * s_w;

          if (p.isTextParticle) {
            // lerp from text to scatter
            const relX = lerp(p.tx, sphereX, s_w);
            const relY = lerp(p.ty, sphereY, s_w);
            const relZ = lerp(p.tz, sphereZ, s_w);

            finalX = centerX + relX + scX;
            finalY = centerY + relY + scY;
            finalZ = relZ + scZ;
            textWeight = 1 - s_w;
          } else {
            // Globe particles scatter outwards
            finalX = centerX + sphereX + scX;
            finalY = centerY + sphereY + scY;
            finalZ = sphereZ + scZ;
          }
        }

        // --- PERSPECTIVE PROJECT ---
        // Treat coordinates as absolute screen-centered space relative to their centers.
        // We use Section 2 camera params for consistent projection.
        const cameraZ = 420;
        const distToCam = cameraZ - finalZ;
        if (distToCam <= 10) continue;

        // Visual projection onto canvas height
        const px = finalX; // finalX already contains absolute center X

        // Add vertical offset to align particle text exactly with HTML paragraph center (Y = 1534.5px vs 1519px)
        const py = finalY + textWeight * 15.5;

        // Clip bottom particles that are still at rest in Section 1 to prevent static round bottom protrusion
        if (progress <= 0.5 && uVal === 0 && py > viewportHeight) continue;

        if (px < -20 || px > width + 20 || py < -20 || py > height + 20) continue;

        // Depth cueing
        const depthFactor = clamp((finalZ + 150) / 300, 0, 1);
        const alpha = 0.5 + depthFactor * 0.45 * (1 - textWeight * 0.35);
        const size = Math.min(4.0, Math.max(0.8, p.baseSize * (cameraZ / distToCam)));

        // Draw
        ctx.beginPath();
        ctx.arc(px, py, size, 0, 2 * Math.PI);
        ctx.fillStyle = hexToRgbA(particleColor, alpha);
        ctx.fill();

        // Subtle glow for front particles
        if (finalZ > 40 && textWeight < 0.6) {
          ctx.beginPath();
          ctx.arc(px, py, size * 2.8, 0, 2 * Math.PI);
          ctx.fillStyle = hexToRgbA(ambientColor, alpha * 0.22);
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
  }, [dimensions, progress, rotationSpeed, particleColor, ambientColor]);

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

// --- HELPERS ---

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

function easeInOutQuad(x: number): number {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

function generateFibonacciSphere(count: number) {
  const points = [];
  const phi = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = phi * i;

    points.push({
      x: Math.cos(theta) * radiusAtY,
      y: y,
      z: Math.sin(theta) * radiusAtY,
    });
  }
  return points;
}

function getSampledTextPoints(text: string, width: number, height: number): { x: number; y: number }[] {
  if (typeof document === "undefined") return [];

  const offscreen = document.createElement("canvas");
  offscreen.width = width;
  offscreen.height = height;

  const ctx = offscreen.getContext("2d");
  if (!ctx) return [];

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const isParagraph = text.length > 30;
  const baseFontSize = isParagraph ? 42 : 110;

  let lines = text.split("\n");
  if (lines.length === 1 && isParagraph) {
    lines = wrapText(ctx, text, width * 0.85, baseFontSize);
  }

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

  const startY = (height - totalHeight) / 2 + fontSize * 0.65;
  lines.forEach((line, idx) => {
    ctx.fillText(line, width / 2, startY + idx * fontSize * 1.35);
  });

  const imgData = ctx.getImageData(0, 0, width, height);
  const points: { x: number; y: number }[] = [];
  const step = 2;

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const idx = (y * width + x) * 4;
      if (imgData.data[idx] > 120) {
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

function hexToRgbA(hex: string, alpha: number): string {
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
