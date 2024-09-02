"use client";
import { useFBX } from "@react-three/drei";
import { MotionValue } from "framer-motion";
import gsap from "gsap";
import { forwardRef, RefObject, useEffect, useRef } from "react";
import { Box3, Vector3 } from "three";
import { Object3D } from "three";

type Props = {
  type: string;
  scrollYProgress: MotionValue<number>;
};

const IphoneMesh = forwardRef<Object3D, Props>(function IphoineMesh(
  { type, scrollYProgress },
  ref
) {
  const internalRef = ref as RefObject<Object3D>;
  const iPhoneModelFbx = useFBX(
    type === "pro"
      ? "/assets/models/model_low.fbx"
      : "/assets/models/model_high.fbx"
  );
  const THRESHOLD = 0.4;
  const ROUNDS = 2;

  useEffect(() => {
    if (!internalRef.current) return;

    const obj = internalRef.current;
    const newPosition = new Vector3();
    new Box3().setFromObject(obj).getCenter(newPosition);
    obj.position.setY(-newPosition.y);
    if (type === "pro-max") {
      obj.position.setX(10);
    }
    const unsubscribe = scrollYProgress.on("change", (_scrollYProgress) => {
      if (type === "pro-max") return;
      if (_scrollYProgress > THRESHOLD) {
        gsap.to(obj.rotation, { y: Math.PI / 4 });
        unsubscribe();
        return;
      }
      obj.rotation.y =
        -1 * ROUNDS * Math.PI * (1 - _scrollYProgress / THRESHOLD) +
        Math.PI / 4;
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <primitive
      ref={internalRef}
      position={[0, 0, 0]}
      object={iPhoneModelFbx}
      scale={type === "pro" ? 1 / 2.5 : 1 / 2.25}
      visible={type === "pro"}
    />
  );
});

export default IphoneMesh;
