import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { inSphere } from 'maath/random';

function StarsLayer({ count, radius, color, size }) {
  const ref = useRef(null);
  const { pointer } = useThree();

  const positions = useMemo(
    () => inSphere(new Float32Array(count * 3), { radius }),
    [count, radius]
  );

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 12;
      ref.current.rotation.y -= delta / 18;
      // Subtle mouse drift
      ref.current.rotation.x += pointer.x * 0.0008;
      ref.current.rotation.y += pointer.y * 0.0008;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={size}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function StarBackground() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
    }}>
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        {/* Cream-white dense layer */}
        <StarsLayer count={3500} radius={1.4} color="#f5ede0" size={0.0018} />
        {/* Yellow accent sparse layer — matches comic yellow */}
        <StarsLayer count={500} radius={1.4} color="#ffd600" size={0.0026} />
      </Canvas>
    </div>
  );
}
