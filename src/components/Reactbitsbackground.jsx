import React, { useEffect, useRef, useState } from "react";

/**
 * ShaderBackground
 * ---------------------------------------------------------------
 * Single-file, dependency-free (React only) animated WebGL background.
 *
 * Where to put it (shadcn structure):  components/ui/shader-background.jsx
 * Usage:   import ShaderBackground from "@/components/ui/shader-background";
 *          <ShaderBackground />   // place once, e.g. at the top of your layout
 *
 * Performance / compatibility features
 *  - WebGL 1 only (works on practically every browser/OS since ~2012)
 *  - Renders at reduced resolution and upscales (smooth gradients hide it)
 *  - Auto-lowers resolution if the device can't hold ~45fps (no lag, no jitter)
 *  - Fewer shader lines on phones / low-core CPUs
 *  - mediump fallback for GPUs without highp fragment support
 *  - Pauses completely when the tab is hidden (zero battery/CPU use)
 *  - Honors "prefers-reduced-motion" (renders one still frame)
 *  - Recovers from WebGL context loss
 *  - Falls back to a CSS gradient if WebGL is missing or software-rendered
 *  - Styles are inline, so it works with or without Tailwind
 */

const VERTEX_SRC = `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const buildFragmentSrc = (lines) => `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 iResolution;
uniform float iTime;
uniform float uLightMode;

#define LINES ${lines}

const float overallSpeed = 0.2;
const float gridSmoothWidth = 0.015;
const float axisWidth = 0.05;
const float majorLineWidth = 0.025;
const float minorLineWidth = 0.0125;
const float majorLineFrequency = 5.0;
const float minorLineFrequency = 1.0;
const float scale = 5.0;
const float minLineWidth = 0.01;
const float maxLineWidth = 0.2;
const float lineSpeed = 1.0 * overallSpeed;
const float lineAmplitude = 1.0;
const float lineFrequency = 0.2;
const float warpSpeed = 0.2 * overallSpeed;
const float warpFrequency = 0.5;
const float warpAmplitude = 1.0;
const float offsetFrequency = 0.5;
const float offsetSpeed = 1.33 * overallSpeed;
const float minOffsetSpread = 0.6;
const float maxOffsetSpread = 2.0;

#define drawCircle(pos, radius, coord) smoothstep(radius + gridSmoothWidth, radius, length(coord - (pos)))
#define drawSmoothLine(pos, halfWidth, t) smoothstep(halfWidth, 0.0, abs(pos - (t)))
#define drawCrispLine(pos, halfWidth, t) smoothstep(halfWidth + gridSmoothWidth, halfWidth, abs(pos - (t)))

float random(float t) {
  return (cos(t) + cos(t * 1.3 + 1.3) + cos(t * 1.4 + 1.4)) / 3.0;
}

float getPlasmaY(float x, float horizontalFade, float offset) {
  return random(x * lineFrequency + iTime * lineSpeed) * horizontalFade * lineAmplitude + offset;
}

void main() {
  vec2 fragCoord = gl_FragCoord.xy;
  vec2 uv = fragCoord / iResolution.xy;
  vec2 space = (fragCoord - iResolution.xy / 2.0) / iResolution.x * 2.0 * scale;

  float horizontalFade = 1.0 - (cos(uv.x * 6.28) * 0.5 + 0.5);
  float verticalFade = 1.0 - (cos(uv.y * 6.28) * 0.5 + 0.5);

  space.y += random(space.x * warpFrequency + iTime * warpSpeed) * warpAmplitude * (0.5 + horizontalFade);
  space.x += random(space.y * warpFrequency + iTime * warpSpeed + 2.0) * warpAmplitude * horizontalFade;

  // Red, Black, White, Cream Theme Palettes
  vec4 darkBg1 = vec4(0.04, 0.04, 0.05, 1.0);  // Obsidian black
  vec4 darkBg2 = vec4(0.08, 0.03, 0.04, 1.0);  // Deep crimson depth
  vec4 darkLine = vec4(0.88, 0.15, 0.2, 0.28); // Vibrant crimson line

  vec4 lightBg1 = vec4(0.99, 0.98, 0.965, 1.0); // Warm cream alabaster
  vec4 lightBg2 = vec4(0.96, 0.93, 0.88, 1.0);   // Warm subtle cream
  vec4 lightLine = vec4(0.86, 0.15, 0.2, 0.12);  // Soft crimson whisper

  vec4 bgColor1 = mix(darkBg1, lightBg1, uLightMode);
  vec4 bgColor2 = mix(darkBg2, lightBg2, uLightMode);
  vec4 lineColor = mix(darkLine, lightLine, uLightMode);

  vec4 lines = vec4(0.0);

  for (int l = 0; l < LINES; l++) {
    float normalizedLineIndex = float(l) / float(LINES);
    float offsetTime = iTime * offsetSpeed;
    float offsetPosition = float(l) + space.x * offsetFrequency;
    float rand = random(offsetPosition + offsetTime) * 0.5 + 0.5;
    float halfWidth = mix(minLineWidth, maxLineWidth, rand * horizontalFade) / 2.0;
    float offset = random(offsetPosition + offsetTime * (1.0 + normalizedLineIndex)) * mix(minOffsetSpread, maxOffsetSpread, horizontalFade);
    float linePosition = getPlasmaY(space.x, horizontalFade, offset);
    float line = drawSmoothLine(linePosition, halfWidth, space.y) / 2.0
               + drawCrispLine(linePosition, halfWidth * 0.15, space.y);

    float circleX = mod(float(l) + iTime * lineSpeed, 25.0) - 12.0;
    vec2 circlePosition = vec2(circleX, getPlasmaY(circleX, horizontalFade, offset));
    float circle = drawCircle(circlePosition, 0.01, space) * 4.0;

    lines += (line + circle) * lineColor * rand;
  }

  vec4 fragColor = mix(bgColor1, bgColor2, uv.x);
  fragColor *= verticalFade;
  fragColor.a = 1.0;
  fragColor += lines;

  gl_FragColor = fragColor;
}
`;

const FALLBACK_DARK = "linear-gradient(135deg, #0A0A0C 0%, #170A0D 100%)";
const FALLBACK_LIGHT = "linear-gradient(135deg, #FCFAF6 0%, #F5EDE0 100%)";

const compile = (gl, type, src) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn("ShaderBackground: shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

const ShaderBackground = ({
  lightMode = false,
  /** Starting render scale (0.3 – 1). Lower = lighter. Auto-reduces if the device is slow. */
  resolutionScale = 0.75,
  /** Number of animated lines. Leave undefined for automatic (16 desktop / 10 mobile). */
  lines,
  className,
  style,
}) => {
  const canvasRef = useRef(null);
  const [failed, setFailed] = useState(false);
  const [contextKey, setContextKey] = useState(0); // bump to remount canvas after context loss

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const win = window;
    const isSmall =
      (win.matchMedia && win.matchMedia("(pointer: coarse)").matches) ||
      win.innerWidth < 768 ||
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
    const lineCount = lines || (isSmall ? 10 : 16);

    const gl =
      canvas.getContext("webgl", {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        preserveDrawingBuffer: false,
        powerPreference: "low-power",
        failIfMajorPerformanceCaveat: true, // skip software rendering -> CSS fallback
      }) ||
      canvas.getContext("experimental-webgl", { alpha: false, antialias: false });

    if (!gl) {
      setFailed(true);
      return undefined;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX_SRC);
    const fs = compile(gl, gl.FRAGMENT_SHADER, buildFragmentSrc(lineCount));
    const program = gl.createProgram();
    if (!vs || !fs || !program) {
      setFailed(true);
      return undefined;
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn("ShaderBackground: link error:", gl.getProgramInfoLog(program));
      setFailed(true);
      return undefined;
    }

    gl.useProgram(program);
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.BLEND);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "iResolution");
    const uTime = gl.getUniformLocation(program, "iTime");
    const uLightMode = gl.getUniformLocation(program, "uLightMode");

    const reduceMotion =
      win.matchMedia && win.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let scale = Math.min(1, Math.max(0.3, resolutionScale));
    let raf = 0;
    let running = false;
    let startTime = performance.now();
    let hiddenAt = 0;
    let lastFrame = 0;
    let frameCount = 0;
    let acc = 0;
    let disposed = false;

    const resize = () => {
      const w = Math.max(1, Math.floor(canvas.clientWidth * scale));
      const h = Math.max(1, Math.floor(canvas.clientHeight * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, w, h);
    };

    const draw = (seconds) => {
      gl.uniform1f(uTime, seconds);
      gl.uniform1f(uLightMode, lightMode ? 1.0 : 0.0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const loop = (now) => {
      if (!running) return;
      raf = requestAnimationFrame(loop);

      const dt = now - lastFrame;
      lastFrame = now;

      // Adaptive resolution: ignore warm-up + long pauses, then react to sustained slowness.
      if (dt < 100) {
        frameCount += 1;
        if (frameCount > 20) {
          acc += dt;
          if (frameCount === 65) {
            const avg = acc / 45;
            if (avg > 22 && scale > 0.35) {
              scale = Math.max(0.35, scale * 0.8);
              resize();
            }
            acc = 0;
            frameCount = 21;
          }
        }
      }

      draw((now - startTime) / 1000);
    };

    const start = () => {
      if (running || reduceMotion || disposed) return;
      running = true;
      lastFrame = performance.now();
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const drawStill = () => {
      resize();
      draw(12.0);
    };

    const onVisibility = () => {
      if (document.hidden) {
        hiddenAt = performance.now();
        stop();
      } else {
        if (hiddenAt) startTime += performance.now() - hiddenAt; // no time jump on return
        hiddenAt = 0;
        start();
      }
    };

    const onResize = () => {
      resize();
      if (!running) draw((performance.now() - startTime) / 1000);
    };

    const onLost = (e) => {
      e.preventDefault();
      stop();
    };
    const onRestored = () => setContextKey((k) => k + 1);

    resize();
    if (reduceMotion) drawStill();
    else start();

    let ro = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(onResize);
      ro.observe(canvas);
    } else {
      win.addEventListener("resize", onResize);
    }
    document.addEventListener("visibilitychange", onVisibility);
    canvas.addEventListener("webglcontextlost", onLost, false);
    canvas.addEventListener("webglcontextrestored", onRestored, false);

    return () => {
      disposed = true;
      stop();
      if (ro) ro.disconnect();
      else win.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onLost, false);
      canvas.removeEventListener("webglcontextrestored", onRestored, false);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      const ext = gl.getExtension("WEBGL_lose_context");
      if (ext) ext.loseContext();
    };
  }, [contextKey, resolutionScale, lines, lightMode]);

  const baseStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
    pointerEvents: "none",
    display: "block",
    background: lightMode ? "#FCFAF6" : "#0A0A0C",
    transition: "background 0.3s ease",
    ...style,
  };

  if (failed) {
    return (
      <div
        aria-hidden="true"
        className={className}
        style={{ ...baseStyle, background: lightMode ? FALLBACK_LIGHT : FALLBACK_DARK }}
      />
    );
  }

  return (
    <canvas
      key={contextKey}
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={baseStyle}
    />
  );
};

export default ShaderBackground;

/* ---------------------------------------------------------------
   Demo (optional) – each export is one use case
   --------------------------------------------------------------- */
export const DemoOne = () => (
  <>
    <ShaderBackground />
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", color: "#fff" }}>
      <h1 style={{ fontSize: "clamp(2rem, 6vw, 4rem)", fontWeight: 600 }}>Your content here</h1>
    </main>
  </>
);