
import { useMemo } from "react";

import { Canvas } from "@react-three/fiber";

import {
  ContactShadows,
  Float,
  OrbitControls,
} from "@react-three/drei";

import * as THREE from "three";

/* ==========================================
   MELTO - 3D TYPES
========================================== */

export type ServingType =
  | "cup"
  | "cone"
  | "waffle";

export type ToppingType =
  | "none"
  | "sprinkles"
  | "cherry"
  | "nuts";

export type SauceType =
  | "none"
  | "chocolate"
  | "strawberry"
  | "caramel";

interface IceCream3DProps {
  serving: ServingType;
  flavourColors: string[];
  scoopCount: number;
  topping: ToppingType;
  sauce: SauceType;
}

/* ==========================================
   GOLDEN WAFFLE CONE
========================================== */

function WaffleCone() {
  const lines = useMemo(
    () =>
      [-1, 1].flatMap((direction) =>
        Array.from({ length: 12 }, (_, i) => {
          const points = Array.from(
            { length: 28 },
            (_, j) => {
              const t = j / 27;

              const angle =
                (i / 12) * Math.PI * 2 +
                direction * t * 2.3;

              const radius =
                0.63 * (1 - t) + 0.025 * t;

              return new THREE.Vector3(
                Math.cos(angle) * radius,
                -0.38 - t * 1.6,
                Math.sin(angle) * radius
              );
            }
          );

          return new THREE.CatmullRomCurve3(
            points
          );
        })
      ),
    []
  );

  return (
    <group>

      {/* WAFFLE CONE BODY */}

      <mesh
        position={[0, -1.18, 0]}
        rotation={[Math.PI, 0, 0]}
        castShadow
      >
        <coneGeometry
          args={[0.64, 1.6, 64]}
        />

        <meshStandardMaterial
          color="#E3A460"
          roughness={0.75}
        />
      </mesh>

      {/* WAFFLE TEXTURE */}

      {lines.map((line, i) => (
        <mesh key={i}>
          <tubeGeometry
            args={[
              line,
              36,
              0.013,
              5,
              false,
            ]}
          />

          <meshStandardMaterial
            color={
              i % 2
                ? "#AE6939"
                : "#BD793E"
            }
            roughness={0.88}
          />
        </mesh>
      ))}

      {/* CONE RIM */}

      <mesh
        position={[0, -0.38, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <torusGeometry
          args={[0.63, 0.06, 12, 56]}
        />

        <meshStandardMaterial
          color="#F9CD8B"
          roughness={0.52}
        />
      </mesh>

    </group>
  );
}

/* ==========================================
   PINK ICE CREAM CUP
========================================== */

function Cup() {
  return (
    <group>

      {/* CUP BODY */}

      <mesh
        position={[0, -1.0, 0]}
        castShadow
      >
        <cylinderGeometry
          args={[
            0.75,
            0.51,
            1.25,
            56,
          ]}
        />

        <meshPhysicalMaterial
          color="#FF9CC7"
          roughness={0.28}
          clearcoat={0.55}
        />
      </mesh>

      {/* CUP RIM */}

      <mesh
        position={[0, -0.38, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <torusGeometry
          args={[0.75, 0.065, 12, 56]}
        />

        <meshStandardMaterial
          color="#FFF2FA"
        />
      </mesh>

      {/* CUP BASE */}

      <mesh position={[0, -1.66, 0]}>
        <cylinderGeometry
          args={[0.5, 0.54, 0.12, 48]}
        />

        <meshStandardMaterial
          color="#F16BA1"
        />
      </mesh>

    </group>
  );
}

/* ==========================================
   WAFFLE BOWL - GAP FIXED
========================================== */

function WaffleBowl() {
  return (
    /*
      FIX:
      Previous position was [0, -0.15, 0].

      The bowl was too low, leaving a visible
      gap between the scoop and the bowl rim.

      Move the bowl upward to [0, 0.38, 0].
    */

    <group position={[0, 0.38, 0]}>

      {/* WAFFLE BOWL BODY */}

      <mesh
        position={[0, -0.83, 0]}
        castShadow
        rotation={[0, Math.PI / 6, 0]}
      >
        <sphereGeometry
          args={[
            0.88,
            48,
            32,
            0,
            Math.PI * 2,
            Math.PI / 2,
            Math.PI / 2,
          ]}
        />

        <meshStandardMaterial
          color="#DFA66C"
          roughness={0.68}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* GOLDEN WAFFLE BOWL RIM */}

      <mesh
        position={[0, -0.82, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <torusGeometry
          args={[0.88, 0.09, 12, 64]}
        />

        <meshStandardMaterial
          color="#F6C783"
          roughness={0.48}
        />
      </mesh>

      {/* WAFFLE BOWL PATTERN */}

      {Array.from(
        { length: 12 },
        (_, index) => {
          const angle =
            (index / 12) * Math.PI * 2;

          return (
            <mesh
              key={index}
              position={[
                Math.sin(angle) * 0.69,
                -1.18,
                Math.cos(angle) * 0.69,
              ]}
              rotation={[0, angle, 0]}
            >
              <boxGeometry
                args={[0.045, 0.42, 0.045]}
              />

              <meshStandardMaterial
                color="#B97442"
                roughness={0.7}
              />
            </mesh>
          );
        }
      )}

    </group>
  );
}

/* ==========================================
   INDIVIDUAL ICE CREAM SCOOP
========================================== */

function Scoop({
  y,
  color,
}: {
  y: number;
  color: string;
}) {
  return (
    <group>

      {/* MAIN ICE CREAM SCOOP */}

      <mesh
        position={[0, y, 0]}
        castShadow
        receiveShadow
      >
        <sphereGeometry
          args={[0.71, 64, 48]}
        />

        <meshPhysicalMaterial
          color={color}
          roughness={0.53}
          clearcoat={0.12}
        />
      </mesh>

      {/* NATURAL SCOOP EDGES */}

      {Array.from(
        { length: 18 },
        (_, index) => {
          const angle =
            (index / 18) * Math.PI * 2;

          return (
            <mesh
              key={index}
              position={[
                Math.cos(angle) * 0.55,
                y -
                  0.36 +
                  Math.sin(index * 3) * 0.035,
                Math.sin(angle) * 0.55,
              ]}
              castShadow
            >
              <sphereGeometry
                args={[0.145, 12, 10]}
              />

              <meshStandardMaterial
                color={color}
                roughness={0.68}
              />
            </mesh>
          );
        }
      )}

      {/* SOFT HIGHLIGHT */}

      <mesh
        position={[-0.22, y + 0.32, 0.57]}
        scale={[1.4, 0.45, 0.28]}
      >
        <sphereGeometry
          args={[0.18, 16, 12]}
        />

        <meshBasicMaterial
          color="white"
          transparent
          opacity={0.17}
          depthWrite={false}
        />
      </mesh>

    </group>
  );
}

/* ==========================================
   SAUCE OPTIONS
========================================== */

const sauceColors: Record<
  Exclude<SauceType, "none">,
  string
> = {
  chocolate: "#5D2A20",
  strawberry: "#EC2171",
  caramel: "#CE843B",
};

function Sauce({
  type,
  y,
}: {
  type: SauceType;
  y: number;
}) {
  if (type === "none") {
    return null;
  }

  const color = sauceColors[type];

  const drips = [
    [-0.48, 0.52, 0.30],
    [-0.19, 0.67, 0.48],
    [0.19, 0.67, 0.25],
    [0.49, 0.49, 0.40],
  ];

  return (
    <group position={[0, y, 0]}>

      {/* GLOSSY SAUCE */}

      <mesh castShadow>
        <sphereGeometry
          args={[
            0.738,
            64,
            32,
            0,
            Math.PI * 2,
            0,
            1.0,
          ]}
        />

        <meshPhysicalMaterial
          color={color}
          roughness={0.19}
          clearcoat={0.9}
        />
      </mesh>

      {/* SAUCE DRIPS */}

      {drips.map(
        ([x, z, length], index) => (
          <mesh
            key={index}
            position={[
              x,
              0.22 - length / 2,
              z,
            ]}
            castShadow
          >
            <capsuleGeometry
              args={[
                0.065,
                length,
                6,
                12,
              ]}
            />

            <meshPhysicalMaterial
              color={color}
              roughness={0.23}
              clearcoat={0.7}
            />
          </mesh>
        )
      )}

    </group>
  );
}

/* ==========================================
   SPRINKLES / CHERRY / NUTS
========================================== */

function Toppings({
  type,
  y,
}: {
  type: ToppingType;
  y: number;
}) {
  const positions = useMemo(
    () =>
      Array.from(
        { length: 36 },
        (_, index) => {
          const angle =
            index * 2.399963;

          const radius =
            Math.sqrt(
              (index + 0.5) / 36
            ) * 0.63;

          const x =
            Math.cos(angle) * radius;

          const z =
            Math.sin(angle) * radius;

          const top = Math.sqrt(
            Math.max(
              0,
              0.73 * 0.73 -
                radius * radius
            )
          );

          return {
            x,
            z,
            top,
            angle,
          };
        }
      ),
    []
  );

  if (type === "none") {
    return null;
  }

  /* CHERRY TOPPING */

  if (type === "cherry") {
    return (
      <group position={[0, y + 0.79, 0]}>

        <mesh castShadow>
          <sphereGeometry
            args={[0.2, 24, 24]}
          />

          <meshPhysicalMaterial
            color="#D70C38"
            roughness={0.16}
            clearcoat={1}
          />
        </mesh>

        <mesh
          position={[0.05, 0.28, 0]}
          rotation={[0, 0, -0.45]}
        >
          <cylinderGeometry
            args={[
              0.02,
              0.03,
              0.41,
              10,
            ]}
          />

          <meshStandardMaterial
            color="#4E853F"
          />
        </mesh>

      </group>
    );
  }

  /* COLOURFUL SPRINKLES */

  if (type === "sprinkles") {
    const colors = [
      "#FE2B75",
      "#FFD438",
      "#50D7B7",
      "#9074F2",
      "#FFFFFF",
      "#F89136",
    ];

    return (
      <group>

        {positions.map((point, index) => (
          <mesh
            key={index}
            position={[
              point.x,
              y + point.top + 0.03,
              point.z,
            ]}
            rotation={[
              index * 0.4,
              index * 0.2,
              point.angle,
            ]}
          >
            <capsuleGeometry
              args={[0.026, 0.08, 4, 7]}
            />

            <meshStandardMaterial
              color={
                colors[index % colors.length]
              }
            />
          </mesh>
        ))}

      </group>
    );
  }

  /* CRUNCHY NUTS */

  return (
    <group>

      {positions
        .filter(
          (_, index) => index % 2 === 0
        )
        .map((point, index) => (
          <mesh
            key={index}
            position={[
              point.x,
              y + point.top + 0.04,
              point.z,
            ]}
            rotation={[
              index,
              index * 0.3,
              point.angle,
            ]}
          >
            <icosahedronGeometry
              args={[0.073, 0]}
            />

            <meshStandardMaterial
              color={
                index % 2
                  ? "#B67943"
                  : "#E8BB82"
              }
              roughness={0.8}
            />
          </mesh>
        ))}

    </group>
  );
}

/* ==========================================
   COMPLETE MIXED-FLAVOUR MODEL
========================================== */

function IceCreamModel({
  serving,
  flavourColors,
  scoopCount,
  topping,
  sauce,
}: IceCream3DProps) {
  const topY =
    0.16 + (scoopCount - 1) * 0.79;

  return (
    <Float
      speed={1.2}
      floatIntensity={0.10}
      rotationIntensity={0.02}
    >
      <group position={[0, -0.13, 0]}>

        {/* THREE SERVING OPTIONS */}

        {serving === "cone" ? (
          <WaffleCone />
        ) : serving === "cup" ? (
          <Cup />
        ) : (
          <WaffleBowl />
        )}

        {/* INDIVIDUAL FLAVOUR COLOURS */}

        {Array.from(
          { length: scoopCount },
          (_, index) => (
            <Scoop
              key={index}
              y={0.16 + index * 0.79}
              color={
                flavourColors[index] ??
                flavourColors[0] ??
                "#F47BA8"
              }
            />
          )
        )}

        {/* SELECTED SAUCE */}

        <Sauce
          type={sauce}
          y={topY}
        />

        {/* SELECTED TOPPING */}

        <Toppings
          type={topping}
          y={topY}
        />

      </group>
    </Float>
  );
}

/* ==========================================
   LIVE 3D VIEWER
========================================== */

function IceCream3D(
  props: IceCream3DProps
) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.7]}
      camera={{
        position: [3.1, 2.25, 8.6],
        fov: 36,
        near: 0.1,
        far: 100,
      }}
      gl={{
        alpha: true,
        antialias: true,
      }}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {/* LIGHTING */}

      <ambientLight intensity={1.55} />

      <hemisphereLight
        args={[
          "#ffffff",
          "#F8AFD1",
          1.2,
        ]}
      />

      <directionalLight
        position={[4, 7, 5]}
        intensity={2.7}
        castShadow
        shadow-mapSize={[
          1024,
          1024,
        ]}
      />

      <directionalLight
        position={[-4, 2, -3]}
        color="#FFCBDE"
        intensity={1.2}
      />

      {/* ICE CREAM MODEL */}

      <IceCreamModel {...props} />

      {/* ==================================
          DYNAMIC SHADOW POSITION

          Waffle Bowl has a higher base.
          Its shadow must also move up.
      ================================== */}

      <ContactShadows
        position={[
          0,
          props.serving === "waffle"
            ? -1.50
            : -2.12,
          0,
        ]}
        opacity={0.25}
        scale={4.5}
        blur={2.8}
        far={4.5}
        color="#B86E91"
      />

      {/* 360 DEGREE ROTATION */}

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.08}
        minPolarAngle={
          Math.PI / 3.7
        }
        maxPolarAngle={
          Math.PI / 1.85
        }
        target={[0, 0.23, 0]}
      />

    </Canvas>
  );
}

export default IceCream3D;
