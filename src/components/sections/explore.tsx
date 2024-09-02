"use client";

import { useInView, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import FloatingPlusBtn from "../buttons/FloatingPlusBtn";

export default function ExploreSection() {
  const imageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "center center"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);

  const isInView = useInView(videoRef, { amount: "all" });

  useEffect(() => {
    if (!videoRef.current) return;
    isInView
      ? videoRef.current.ended
        ? null
        : videoRef.current.play()
      : videoRef.current.pause();
  }, [isInView]);
  return (
    <section className="bg-[#101010] flex flex-col pt-[200px] pb-[100px] px-10">
      <div className="max-w-[1260px] mx-auto w-full">
        <motion.div
          className="text-[56px] text-[#86868b] font-semibold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: "all" }}
        >
          본격적으로 탐구해 보기.
        </motion.div>
        <div className="flex flex-col pt-[200px] max-w-[1050px] mx-auto w-full">
          <div className="text-[80px] text-[#f5f5f7] leading-tight font-semibold px-2 whitespace-pre-line">
            iPhone.{"\n"}티타늄을 두르다.
          </div>
          <div className="flex flex-col gap-4 mt-[100px]">
            <div className="aspect-[2/1] relative">
              <video ref={videoRef} playsInline autoPlay muted>
                <source src="/assets/videos/section3_1.mp4" />
              </video>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-1 flex-col">
                <div className="flex flex-1 bg-black aspect-square overflow-hidden">
                  <motion.div
                    ref={imageRef}
                    className="flex flex-1 bg-black aspect-square relative"
                    style={{ opacity, scale }}
                  >
                    <Image
                      src="/assets/images/explore_1.jpeg"
                      fill
                      objectFit="contain"
                      alt="iphone"
                    />
                  </motion.div>
                </div>
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex flex-1 bg-black aspect-square overflow-hidden">
                  <motion.div
                    className="flex flex-1 bg-black aspect-square relative"
                    style={{ opacity, scale }}
                  >
                    <Image
                      src="/assets/images/explore_2.jpeg"
                      fill
                      objectFit="contain"
                      alt="iphone"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
            <div className="flex flex-1 gap-4 items-center justify-center py-20 text-[21px] text-[#86868b]">
              <div className="max-w-[330px] mx-auto w-full">
                <span className="text-white">
                  iPhone 사상 최초로 항공우주 등급의 티타늄 디자인
                </span>
                을 채택한 iPhone 15 Pro. 화성 탐사선에 쓰이는 소재와 동일한
                합금을 사용했습니다.
              </div>
              <div className="max-w-[330px] mx-auto w-full">
                금속 중 비강도가 가장 탁월한 것으로 손꼽히는 티타늄을 사용한
                덕분에 iPhone 15 Pro는
                <span className="text-white">
                  역대 Pro 모델 중 가장 가볍습니다
                </span>
                . 기기를 집어드는 순간, 가벼워진 무게감이 확연히 느껴지죠.
              </div>
            </div>
          </div>
        </div>
        <FloatingPlusBtn title="디자인 및 디스플레이에 대해 더 알아보기" />
      </div>
    </section>
  );
}
