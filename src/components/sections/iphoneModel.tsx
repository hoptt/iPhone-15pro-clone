"use client";

import { Html, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Suspense, useEffect, useRef, useState } from "react";
import { Object3D } from "three";
import FloatingBtnForCanvas from "../buttons/FloatingBtnForCanvas";
import IphoneMesh from "../model/iphoneMesh";
import gsap from "gsap";

const COLORS = [
  { hex: "#8f8a81" },
  { hex: "#202630" },
  { hex: "#c9c8c3" },
  { hex: "#242526" },
];
export default function IPhoneModel() {
  const MODELS = ["pro", "pro-max"];
  const ref = useRef<HTMLDivElement>(null);
  const proRef = useRef<Object3D>(null);
  const proMaxRef = useRef<Object3D>(null);
  const cameraRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const [color, setColor] = useState(COLORS[0].hex);
  const [model, setModel] = useState(MODELS[0]);

  const COLOR_CHANGABLE_MATERIAL_NAMES = [
    "cam",
    "ant",
    "frame",
    "rglass",
    "back",
  ];

  const handleColor = (color: string) => {
    if (!proRef?.current) return;
    setColor(color);
    [proRef, proMaxRef].map((_ref) => {
      _ref.current!.children.map((child: any) => {
        if (!child.isMesh) return;
        const isChangable = COLOR_CHANGABLE_MATERIAL_NAMES.includes(
          child.material.name
        );

        if (isChangable) {
          child.material.color.set(color);
        }
      });
    });
  };

  const handleModel = async (model: string) => {
    if (!cameraRef.current || !proRef.current || !proMaxRef.current) return;
    setModel(model);
    const isProModel = model === MODELS[0];
    /* 초기화 */
    // 카메라가 먼저 돌도록
    await gsap.to(cameraRef.current!.position, { x: 0, y: 0, z: 10 });
    // visible 초기화
    proRef.current.visible = true;
    proMaxRef.current.visible = true;
    // material opacity 초기화
    proRef.current.children.map((child: any) => {
      if (["frame", "ant"].includes(child.material.name))
        gsap.to(child.material, {
          opacity: 1,
        });
    });
    proMaxRef.current.children.map((child: any) => {
      if (["frame", "ant"].includes(child.material.name))
        gsap.to(child.material, {
          opacity: 1,
        });
    });
    // rotation 초기화
    gsap.to(proMaxRef.current!.rotation, { y: 0 });

    /* 초기화 끝 애니메이션 시작 */
    // position 조정
    gsap.to(proRef.current.position, {
      x: isProModel ? 0 : -5,
      duration: 1,
      ease: "circ.inout",
    });
    // position 조정
    await gsap.to(proMaxRef.current.position, {
      x: isProModel ? 5 : 0,
      duration: 1,
      ease: "circ.inout",
    });

    // opacity 및 visible 조정
    proRef.current.children.map((child: any) => {
      child.material.transparent = true;
      child.material.needsUpdate = true;
      if (["frame", "ant"].includes(child.material.name))
        gsap.to(child.material, {
          opacity: isProModel ? 1 : 0,
          onComplete: () => {
            proMaxRef.current!.visible = !isProModel;
          },
        });
    });
    proMaxRef.current.children.map((child: any) => {
      child.material.transparent = true;
      child.material.needsUpdate = true;
      if (["frame", "ant"].includes(child.material.name))
        gsap.to(child.material, {
          opacity: isProModel ? 0 : 1,
          onComplete: () => {
            proRef.current!.visible = isProModel;
          },
        });
    });
  };

  return (
    <section className="bg-black px-10">
      <div
        ref={ref}
        className="bg-black max-w-[1260px] mx-auto w-full h-[100vh]"
      >
        <motion.div
          className="text-[56px] text-[#86868b] opacity-40 w-full py-10 mx-auto max-w-screen-xl font-semibold"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.5 }}
        >
          보다 자세히 들여다보기.
        </motion.div>
        <div className="relative h-[780px] bg-black">
          <Canvas id="canvas">
            <ambientLight intensity={1} />
            <OrbitControls enableZoom={false} enablePan={false} />
            <PerspectiveCamera
              ref={cameraRef}
              makeDefault
              position={[0, 0, 10]}
            >
              <directionalLight
                color="white"
                position={[0, 0, 5]}
                intensity={1}
              />
            </PerspectiveCamera>
            <Suspense
              fallback={
                <Html wrapperClass="wrapper__initial" className="sub__initial">
                  <div className="text-white absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center backdrop-blur gap-0 text-[28px]">
                    <div>탭하고 돌려가며</div>
                    <div>iPhone 을 자세히 살펴볼 수 있습니다</div>
                    <div>Loading..</div>
                  </div>
                </Html>
              }
            >
              <IphoneMesh
                type={MODELS[0]}
                ref={proRef}
                scrollYProgress={scrollYProgress}
              />
              <IphoneMesh
                type={MODELS[1]}
                ref={proMaxRef}
                scrollYProgress={scrollYProgress}
              />
            </Suspense>
          </Canvas>
        </div>
        <FloatingBtnForCanvas
          colors={COLORS}
          color={color}
          model={model}
          handleModel={handleModel}
          handleColor={handleColor}
        />
      </div>
    </section>
  );
}
