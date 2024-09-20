import { useRef } from "react";
import {
  useMotionValue,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";

interface Use3DEffectResult {
  ref: React.RefObject<HTMLDivElement>;
  style: {
    rotateX: MotionValue<number>;
    rotateY: MotionValue<number>;
  };
  handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseLeave: () => void;
}

export const use3DEffect = (
  rotationIntensity: number = 17.5,
  springConfig = { stiffness: 300, damping: 30, mass: 0.5 }
): Use3DEffectResult => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(
    mouseY,
    [-0.5, 0.5],
    [`${rotationIntensity}deg`, `-${rotationIntensity}deg`]
  );
  const rotateY = useTransform(
    mouseX,
    [-0.5, 0.5],
    [`-${rotationIntensity}deg`, `${rotationIntensity}deg`]
  );

  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return {
    ref,
    style: {
      rotateX: springRotateX,
      rotateY: springRotateY,
    },
    handleMouseMove,
    handleMouseLeave,
  };
};
