import { useEffect, useRef, useState } from 'react';
import { cn } from '../../utils/cn';
import { theme } from '../../data/theme';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function DottedSurface({ className, children, ...props }: DottedSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!containerRef.current || failed) return;

    let THREE: typeof import('three');
    let animationId = 0;
    let renderer: InstanceType<typeof THREE.WebGLRenderer> | null = null;
    let disposed = false;

    (async () => {
      try {
        THREE = await import('three');
      } catch {
        setFailed(true);
        return;
      }

      if (disposed || !containerRef.current) return;

      const SEPARATION = 150;
      const AMOUNTX = 40;
      const AMOUNTY = 60;

      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        1,
        10000,
      );
      camera.position.set(0, 355, 1220);

      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      } catch {
        setFailed(true);
        return;
      }

      if (disposed || !containerRef.current) {
        renderer.dispose();
        return;
      }

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);

      const canvas = renderer.domElement;
      canvas.style.position = 'absolute';
      canvas.style.inset = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      containerRef.current.appendChild(canvas);

      // Dot color from theme
      const dotColor = theme.colors.text.muted;
      const r = parseInt(dotColor.slice(1, 3), 16) / 255;
      const g = parseInt(dotColor.slice(3, 5), 16) / 255;
      const b = parseInt(dotColor.slice(5, 7), 16) / 255;

      const positions: number[] = [];
      const colors: number[] = [];

      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          positions.push(
            ix * SEPARATION - (AMOUNTX * SEPARATION) / 2,
            0,
            iy * SEPARATION - (AMOUNTY * SEPARATION) / 2,
          );
          colors.push(r, g, b);
        }
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 8,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true,
      });

      scene.add(new THREE.Points(geometry, material));

      let count = 0;

      const animate = () => {
        if (disposed) return;
        animationId = requestAnimationFrame(animate);

        const posArr = geometry.attributes.position.array as Float32Array;
        let i = 0;
        for (let ix = 0; ix < AMOUNTX; ix++) {
          for (let iy = 0; iy < AMOUNTY; iy++) {
            posArr[i * 3 + 1] =
              Math.sin((ix + count) * 0.3) * 50 +
              Math.sin((iy + count) * 0.5) * 50;
            i++;
          }
        }
        geometry.attributes.position.needsUpdate = true;
        renderer!.render(scene, camera);
        count += 0.1;
      };

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer!.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);
      animate();

      // Store cleanup references on the ref so the cleanup closure can use them
      const cleanup = () => {
        disposed = true;
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationId);
        geometry.dispose();
        material.dispose();
        renderer!.dispose();
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      };

      // Attach to a mutable ref so the effect cleanup can call it
      cleanupRef.current = cleanup;
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(animationId);
      if (cleanupRef.current) cleanupRef.current();
    };
  }, [failed]);

  const cleanupRef = useRef<(() => void) | null>(null);

  if (failed) return null;

  return (
    <div
      ref={containerRef}
      className={cn('pointer-events-none fixed inset-0 z-0', className)}
      {...props}
    >
      {children}
    </div>
  );
}
