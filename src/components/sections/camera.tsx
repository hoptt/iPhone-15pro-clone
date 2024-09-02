"use client";
import React, { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import LeftIcon from "@/public/assets/icons/left.svg";
import RightIcon from "@/public/assets/icons/right.svg";
import FloatingPlusBtn from "../buttons/FloatingPlusBtn";
import { BLUR_DATA_URL } from "@/src/constants";

export default function CameraSection() {
  const iguanaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: iguanaRef,
    offset: ["start end", "start center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);
  return (
    <section className="bg-black flex flex-col items-center justify-center pt-[200px] pb-[100px] text-[#86868b] text-[21px] font-semibold">
      <div className="flex flex-col w-full items-center justify-center overflow-x-hidden">
        <div className="flex flex-col flex-1 max-w-[1260px] w-full pb-[100px] px-20">
          <h4 className="text-[80px] text-[#f5f5f7] leading-tight whitespace-pre">
            상상 이상의 디테일까지{"\n"}포착해주는 카메라.
          </h4>
          <div className="text-[28px] mt-[40px] z-[1]">
            비약적으로 유연해진 프레임 옵션부터 한 차원 높은 수준의 인물
            사진까지, iPhone 사상 가장 강력한 카메라 시스템이 만들어내는 놀라운
            이미지를 소개합니다.
          </div>
        </div>
        <div className="flex flex-1 w-full justify-center">
          <motion.div
            ref={iguanaRef}
            className="relative w-full max-w-[1260px] aspect-[3/2]"
            style={{ scale }}
          >
            <Image
              fill
              objectFit="contain"
              src="/assets/images/iguana.jpg"
              alt="iguana"
            />
          </motion.div>
        </div>
        <div className="max-w-[1260px] w-full px-10 z-[1]">
          48MP 메인 카메라로 촬영한 초록색 이구아나
        </div>
        <RenderSwiper />
        <RenderDescription />
      </div>
      <FloatingPlusBtn title="카메라 성능 줌인해 보기" />
    </section>
  );
}

const RenderDescription = () => {
  return (
    <div className="max-w-[1260px] w-full flex flex-col items-center justify-center">
      <div className="flex flex-1 w-full gap-16 min-h-[800px] py-[200px]">
        <div className="flex flex-1 items-center justify-end">
          <motion.div
            className="relative w-[330px] aspect-[1/2]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { duration: 1 } }}
            viewport={{ amount: 0.2 }}
          >
            <Image
              src="/assets/images/camera.jpg"
              fill
              objectFit="contain"
              alt="description"
            />
          </motion.div>
        </div>
        <div className="flex flex-col flex-1 gap-4 items-start justify-center text-lg">
          <div className="flex flex-col gap-8 w-[330px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "100px" }}
            >
              그 어느 때보다 앞선 성능을 자랑하는 48MP 메인 카메라. 덕분에{" "}
              <span className="text-[#f5f5f7]">
                새로운 차원의 디테일 및 색상 표현력
              </span>
              이 돋보이는 초고해상도 사진을 촬영할 수 있죠.
            </motion.div>
            <motion.div
              className="break-keep"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
              viewport={{ amount: "some" }}
            >
              향상된 성능은 인물 사진을 찍을 때 빛을 발합니다. 더 이상 인물 사진
              모드로 일일이 전환할 필요 없이, 피사체가 사람 혹은 강아지, 고양이
              같은 반려동물인 경우 iPhone이 자동으로 심도 정보를 포착합니다.
              그래서 촬영 중에{" "}
              <span className="text-[#f5f5f7]">
                인물 사진처럼 흐림 효과가 아름답게 배경에 적용된 상태
              </span>
              를 확인하면서 찍을 수 있고, 촬영 후에 `사진` 앱에서 인물 사진으로
              바꾸는 것도 가능하죠
            </motion.div>
          </div>
        </div>
      </div>
      <div className="text-[#f5f5f7] text-[40px] border-t-[0.5px] border-[#86868b] leading-tight pt-[150px] text-center whitespace-pre">
        마법 같은 공간 동영상을 촬영하고 그 순간을{"\n"}Apple Vision Pro에서
        생생하게 다시 경험하세요.
      </div>
    </div>
  );
};

const CAROUSEL_IMAGES = [
  {
    src: "/assets/images/carousel_1.webp",
    size: "0.5x",
    type: "울트라 와이드 | 접사",
  },
  {
    src: "/assets/images/carousel_2.webp",
    size: "0.5x",
    type: "울트라 와이드 | 13mm",
  },
  { src: "/assets/images/carousel_3.webp", size: "1x", type: "메인 | 24mm" },
  { src: "/assets/images/carousel_4.webp", size: "1x", type: "메인 | 28mm" },
  { src: "/assets/images/carousel_5.webp", size: "1x", type: "메인 | 35mm" },
  { src: "/assets/images/carousel_7.webp", size: "2x", type: "망원 | 48mm" },
  {
    src: "/assets/images/carousel_7.webp",
    size: "새로운 5x",
    type: "망원 | 120mm",
  },
];
const RenderSwiper = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: "some", once: true });
  const [activeIndex, setActiveIndex] = useState(0);
  const handleSwipeBack = () => {
    if (activeIndex <= 0) return;
    setActiveIndex((prev) => prev - 1);
  };

  const handleSwipeForward = () => {
    if (activeIndex >= CAROUSEL_IMAGES.length - 1) return;
    setActiveIndex((prev) => prev + 1);
  };
  return (
    <>
      <div className="flex flex-1 flex-col w-[660px] mt-[200px]">
        <div className="max-w-[330px]">
          iPhone 15 Pro 는 다양한 초점 거리를 지원합니다.{" "}
          <span className="text-white">7개의 프로급 렌즈를 주머니에 쏙</span>{" "}
          넣어 어디든 갖고 다닐 수 있게 된 거나 다름없죠.
        </div>
        <div className="my-[60px] w-full h-[495px]">
          <motion.div
            ref={ref}
            className="w-[7000px] h-[495px] flex gap-[8px] items-center justify-start"
            initial={{ x: 0 }}
            animate={{
              transition: { duration: 0.5 },
              x: -1 * activeIndex * (660 + 8),
            }}
          >
            {isInView && (
              <>
                {CAROUSEL_IMAGES.map((_image, index) => (
                  <motion.div
                    key={index}
                    className="relative overflow-hidden"
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                      x: -1 * index * (660 * 0.8),
                      width: index > activeIndex ? 660 * 0.8 : 660,
                      height: index > activeIndex ? 495 * 0.8 : 495,
                      zIndex: 10 - index,
                    }}
                    animate={{
                      x: 0,
                      scale: 1,
                      opacity: index !== activeIndex ? 0.3 : 1,
                      width: index > activeIndex ? 660 * 0.8 : 660,
                      height: index > activeIndex ? 495 * 0.8 : 495,
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <Image
                      src={_image.src}
                      fill
                      objectFit="cover"
                      alt="image"
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                    />
                  </motion.div>
                ))}
              </>
            )}
          </motion.div>
        </div>
      </div>
      <RenderSwiperController
        activeIndex={activeIndex}
        handleSwipeBack={handleSwipeBack}
        handleSwipeForward={handleSwipeForward}
      />
    </>
  );
};

type SwiperControllerProps = {
  activeIndex: number;
  handleSwipeBack: () => void;
  handleSwipeForward: () => void;
};
const RenderSwiperController = ({
  activeIndex,
  handleSwipeBack,
  handleSwipeForward,
}: SwiperControllerProps) => {
  return (
    <div className="relative max-w-[860px] mx-auto flex w-full justify-center">
      <div className="text-[19px]">
        <span className="text-white">{CAROUSEL_IMAGES[activeIndex].size} </span>
        {CAROUSEL_IMAGES[activeIndex].type}
      </div>
      <div className="flex gap-2 absolute top-0 right-0">
        <button
          className="w-[36px] h-[36px] bg-[#333336] rounded-full flex justify-center items-center"
          style={{
            opacity: activeIndex === 0 ? 0.5 : 1,
            cursor: activeIndex === 0 ? "default" : "pointer",
          }}
          onClick={handleSwipeBack}
          disabled={activeIndex === 0}
        >
          <LeftIcon color="#86868b" />
        </button>
        <button
          className="w-[36px] h-[36px] bg-[#333336] rounded-full flex justify-center items-center"
          style={{
            opacity: activeIndex === CAROUSEL_IMAGES.length - 1 ? 0.5 : 1,
            cursor:
              activeIndex === CAROUSEL_IMAGES.length - 1
                ? "default"
                : "pointer",
          }}
          onClick={handleSwipeForward}
          disabled={activeIndex === CAROUSEL_IMAGES.length - 1}
        >
          <RightIcon color="#86868b" />
        </button>
      </div>
    </div>
  );
};
