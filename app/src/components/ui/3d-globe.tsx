import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export interface GlobeMarker {
  lat: number;
  lng: number;
  src?: string;
  label?: string;
}

export interface Globe3DConfig {
  atmosphereColor?: string;
  atmosphereIntensity?: number;
  bumpScale?: number;
  autoRotateSpeed?: number;
}

interface Globe3DProps {
  markers?: GlobeMarker[];
  config?: Globe3DConfig;
  className?: string;
  onMarkerClick?: (marker: GlobeMarker) => void;
  onMarkerHover?: (marker: GlobeMarker | null) => void;
}

const GLOBE_RADIUS = 2;
const EARTH_TEXTURE_URL = "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg";
const EARTH_BUMP_URL = "https://unpkg.com/three-globe/example/img/earth-topology.png";

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function RotatingGroup({ speed, children }: { speed: number; children: ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * speed * 0.2;
  });
  return <group ref={ref}>{children}</group>;
}

function Earth({ bumpScale }: { bumpScale: number }) {
  const [colorMap, bumpMap] = useLoader(THREE.TextureLoader, [EARTH_TEXTURE_URL, EARTH_BUMP_URL]);
  return (
    <mesh>
      <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
      <meshStandardMaterial map={colorMap} bumpMap={bumpMap} bumpScale={bumpScale / 100} />
    </mesh>
  );
}

function Atmosphere({ color, intensity }: { color: string; intensity: number }) {
  const uniforms = useMemo(
    () => ({
      glowColor: { value: new THREE.Color(color) },
      intensity: { value: intensity / 20 },
    }),
    [color, intensity],
  );
  return (
    <mesh scale={1.15}>
      <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
      <shaderMaterial
        transparent
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        uniforms={uniforms}
        vertexShader={`
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 glowColor;
          uniform float intensity;
          varying vec3 vNormal;
          void main() {
            float glow = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0) * intensity;
            gl_FragColor = vec4(glowColor, clamp(glow, 0.0, 1.0));
          }
        `}
      />
    </mesh>
  );
}

function Marker({
  marker,
  onClick,
  onHover,
}: {
  marker: GlobeMarker;
  onClick?: (marker: GlobeMarker) => void;
  onHover?: (marker: GlobeMarker | null) => void;
}) {
  const position = useMemo(
    () => latLngToVector3(marker.lat, marker.lng, GLOBE_RADIUS + 0.02),
    [marker.lat, marker.lng],
  );
  const [hovered, setHovered] = useState(false);

  return (
    <Html position={position} center distanceFactor={8} occlude>
      <div style={{ position: "relative" }}>
        <button
          type="button"
          onClick={() => onClick?.(marker)}
          onMouseEnter={() => {
            setHovered(true);
            onHover?.(marker);
          }}
          onMouseLeave={() => {
            setHovered(false);
            onHover?.(null);
          }}
          style={{
            border: 0,
            padding: 0,
            background: "none",
            cursor: "pointer",
            display: "block",
            transform: hovered ? "scale(1.2)" : "scale(1)",
            transition: "transform 150ms ease-out",
          }}
        >
          {marker.src ? (
            <img
              src={marker.src}
              alt={marker.label ?? ""}
              style={{
                width: 28,
                height: 28,
                borderRadius: "9999px",
                border: "2px solid #fff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
                objectFit: "cover",
                display: "block",
              }}
            />
          ) : (
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: "9999px",
                background: "#ff5c5c",
                border: "2px solid #fff",
                display: "block",
              }}
            />
          )}
        </button>
        {hovered && marker.label && (
          <span
            style={{
              position: "absolute",
              top: "115%",
              left: "50%",
              transform: "translateX(-50%)",
              whiteSpace: "nowrap",
              background: "rgba(20,20,20,0.85)",
              color: "#fff",
              fontSize: 11,
              lineHeight: 1.4,
              padding: "3px 8px",
              borderRadius: 6,
              pointerEvents: "none",
            }}
          >
            {marker.label}
          </span>
        )}
      </div>
    </Html>
  );
}

function GlobeScene({
  markers,
  config,
  onMarkerClick,
  onMarkerHover,
}: {
  markers: GlobeMarker[];
  config: Required<Globe3DConfig>;
  onMarkerClick?: (marker: GlobeMarker) => void;
  onMarkerHover?: (marker: GlobeMarker | null) => void;
}) {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 3, 5]} intensity={1.1} />
      <Suspense fallback={null}>
        <RotatingGroup speed={config.autoRotateSpeed}>
          <Earth bumpScale={config.bumpScale} />
          {markers.map((marker, i) => (
            <Marker key={`${marker.lat}-${marker.lng}-${i}`} marker={marker} onClick={onMarkerClick} onHover={onMarkerHover} />
          ))}
        </RotatingGroup>
        <Atmosphere color={config.atmosphereColor} intensity={config.atmosphereIntensity} />
      </Suspense>
      <OrbitControls enablePan={false} enableZoom={false} />
    </Canvas>
  );
}

/**
 * Client-only 3D globe (Three.js/WebGL) with avatar markers. Rendering is
 * gated behind a mount effect since WebGL canvases cannot be constructed
 * during SSR.
 */
export function Globe3D({ markers = [], config, className, onMarkerClick, onMarkerHover }: Globe3DProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const resolved: Required<Globe3DConfig> = {
    atmosphereColor: config?.atmosphereColor ?? "#4da6ff",
    atmosphereIntensity: config?.atmosphereIntensity ?? 15,
    bumpScale: config?.bumpScale ?? 5,
    autoRotateSpeed: config?.autoRotateSpeed ?? 0.3,
  };

  if (!mounted) {
    return <div className={className} style={{ aspectRatio: "1 / 1" }} />;
  }

  return (
    <div className={className} style={{ aspectRatio: "1 / 1" }}>
      <GlobeScene markers={markers} config={resolved} onMarkerClick={onMarkerClick} onMarkerHover={onMarkerHover} />
    </div>
  );
}
