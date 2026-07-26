import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  NgZone,
  OnDestroy,
  viewChild,
} from '@angular/core';

const VERTEX_SHADER = `
  attribute vec4 aVertexPosition;
  void main() {
    gl_Position = aVertexPosition;
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  uniform vec2 iResolution;
  uniform float iTime;

  const float overallSpeed = 0.2;
  const float gridSmoothWidth = 0.015;
  const float axisWidth = 0.05;
  const float majorLineWidth = 0.025;
  const float minorLineWidth = 0.0125;
  const float majorLineFrequency = 5.0;
  const float minorLineFrequency = 1.0;
  const float scale = 5.0;
  // Brand yellow #F3D302 + complementary violet #302CF3
  const vec3 brandColor = vec3(0.953, 0.827, 0.008);
  const vec3 complementColor = vec3(0.188, 0.173, 0.953);
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
  const int linesPerGroup = 16;

  #define drawCircle(pos, radius, coord) smoothstep(radius + gridSmoothWidth, radius, length(coord - (pos)))
  #define drawSmoothLine(pos, halfWidth, t) smoothstep(halfWidth, 0.0, abs(pos - (t)))
  #define drawCrispLine(pos, halfWidth, t) smoothstep(halfWidth + gridSmoothWidth, halfWidth, abs(pos - (t)))
  #define drawPeriodicLine(freq, width, t) drawCrispLine(freq / 2.0, width, abs(mod(t, freq) - (freq) / 2.0))

  float drawGridLines(float axis) {
    return drawCrispLine(0.0, axisWidth, axis)
          + drawPeriodicLine(majorLineFrequency, majorLineWidth, axis)
          + drawPeriodicLine(minorLineFrequency, minorLineWidth, axis);
  }

  float random(float t) {
    return (cos(t) + cos(t * 1.3 + 1.3) + cos(t * 1.4 + 1.4)) / 3.0;
  }

  float getPlasmaY(float x, float horizontalFade, float offset) {
    return random(x * lineFrequency + iTime * lineSpeed) * horizontalFade * lineAmplitude + offset;
  }

  void main() {
    vec2 fragCoord = gl_FragCoord.xy;
    vec4 fragColor;
    vec2 uv = fragCoord.xy / iResolution.xy;
    vec2 space = (fragCoord - iResolution.xy / 2.0) / iResolution.x * 2.0 * scale;

    float horizontalFade = 1.0 - (cos(uv.x * 6.28) * 0.5 + 0.5);
    float verticalFade = 1.0 - (cos(uv.y * 6.28) * 0.5 + 0.5);

    space.y += random(space.x * warpFrequency + iTime * warpSpeed) * warpAmplitude * (0.5 + horizontalFade);
    space.x += random(space.y * warpFrequency + iTime * warpSpeed + 2.0) * warpAmplitude * horizontalFade;

    vec4 lines = vec4(0.0);
    vec4 bgColor1 = vec4(0.039, 0.035, 0.012, 1.0);
    vec4 bgColor2 = vec4(0.090, 0.055, 0.180, 1.0);

    for(int l = 0; l < linesPerGroup; l++) {
      float normalizedLineIndex = float(l) / float(linesPerGroup);
      float offsetTime = iTime * offsetSpeed;
      float offsetPosition = float(l) + space.x * offsetFrequency;
      float rand = random(offsetPosition + offsetTime) * 0.5 + 0.5;
      float halfWidth = mix(minLineWidth, maxLineWidth, rand * horizontalFade) / 2.0;
      float offset = random(offsetPosition + offsetTime * (1.0 + normalizedLineIndex)) * mix(minOffsetSpread, maxOffsetSpread, horizontalFade);
      float linePosition = getPlasmaY(space.x, horizontalFade, offset);
      float line = drawSmoothLine(linePosition, halfWidth, space.y) / 2.0 + drawCrispLine(linePosition, halfWidth * 0.15, space.y);

      float circleX = mod(float(l) + iTime * lineSpeed, 25.0) - 12.0;
      vec2 circlePosition = vec2(circleX, getPlasmaY(circleX, horizontalFade, offset));
      float circle = drawCircle(circlePosition, 0.01, space) * 4.0;

      line = line + circle;
      float colorMix = mix(horizontalFade, rand, 0.45);
      vec3 lineRgb = mix(complementColor, brandColor, colorMix);
      lines += line * vec4(lineRgb, 1.0) * rand * 0.82;
    }

    fragColor = mix(bgColor1, bgColor2, uv.x);
    fragColor *= verticalFade;
    fragColor.a = 1.0;
    fragColor += lines;

    gl_FragColor = fragColor;
  }
`;

interface ShaderProgramInfo {
  program: WebGLProgram;
  attribLocations: {
    vertexPosition: number;
  };
  uniformLocations: {
    resolution: WebGLUniformLocation | null;
    time: WebGLUniformLocation | null;
  };
}

@Component({
  selector: 'app-shader-background',
  standalone: true,
  templateUrl: './shader-background.component.html',
  styleUrl: './shader-background.component.scss',
})
export class ShaderBackgroundComponent implements AfterViewInit, OnDestroy {
  private readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly host = inject(ElementRef<HTMLElement>);

  private gl?: WebGLRenderingContext;
  private programInfo?: ShaderProgramInfo;
  private positionBuffer?: WebGLBuffer;
  private rafId = 0;
  private resizeObserver?: ResizeObserver;
  private startTime = 0;

  constructor(private readonly ngZone: NgZone) {}

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.warn('WebGL not supported.');
      return;
    }

    this.gl = gl;
    this.programInfo = this.initShaderProgram(gl) ?? undefined;
    if (!this.programInfo) return;

    this.positionBuffer = gl.createBuffer() ?? undefined;
    if (!this.positionBuffer) return;

    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );

    this.startTime = performance.now();
    this.resizeCanvas();

    this.resizeObserver = new ResizeObserver(() => this.resizeCanvas());
    this.resizeObserver.observe(this.host.nativeElement);

    this.ngZone.runOutsideAngular(() => {
      this.render();
    });
  }

  ngOnDestroy(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    this.resizeObserver?.disconnect();
    this.gl = undefined;
    this.programInfo = undefined;
  }

  private loadShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
    const shader = gl.createShader(type);
    if (!shader) return null;

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  private initShaderProgram(gl: WebGLRenderingContext): ShaderProgramInfo | null {
    const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return null;

    const program = gl.createProgram();
    if (!program) return null;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Shader program link error:', gl.getShaderInfoLog(program));
      return null;
    }

    return {
      program,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(program, 'aVertexPosition'),
      },
      uniformLocations: {
        resolution: gl.getUniformLocation(program, 'iResolution'),
        time: gl.getUniformLocation(program, 'iTime'),
      },
    };
  }

  private resizeCanvas = (): void => {
    const canvas = this.canvasRef()?.nativeElement;
    const gl = this.gl;
    if (!canvas || !gl) return;

    const { width, height } = this.host.nativeElement.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pixelWidth = Math.max(1, Math.floor(width * dpr));
    const pixelHeight = Math.max(1, Math.floor(height * dpr));

    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
      gl.viewport(0, 0, pixelWidth, pixelHeight);
    }
  };

  private render = (): void => {
    const canvas = this.canvasRef()?.nativeElement;
    const gl = this.gl;
    const programInfo = this.programInfo;
    const positionBuffer = this.positionBuffer;

    if (!canvas || !gl || !programInfo || !positionBuffer) return;

    const currentTime = (performance.now() - this.startTime) / 1000;

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(programInfo.program);

    gl.uniform2f(programInfo.uniformLocations.resolution, canvas.width, canvas.height);
    gl.uniform1f(programInfo.uniformLocations.time, currentTime);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    this.rafId = requestAnimationFrame(this.render);
  };
}
