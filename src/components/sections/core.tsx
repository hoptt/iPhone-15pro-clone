"use client";

import {
  AnimatePresence,
  useAnimationControls,
  useInView,
  useScroll,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Autoplay } from "swiper/modules";
import {
  Swiper,
  SwiperClass,
  SwiperProps,
  SwiperSlide,
  SwiperSlideProps,
} from "swiper/react";
import PauseIcon from "@/public/assets/icons/pause.svg";
import PlayIcon from "@/public/assets/icons/play.svg";

import "swiper/css";
import "swiper/css/pagination";

const Carousel = () => {
  const VIDEOS = [
    {
      text: "A17 Pro 등장.\n게임의 판도를 바꾸는 칩.\n획기적인 성능.",
      source: "/assets/videos/section2_1_large_2x.mp4",
    },
    {
      text: "티타늄.\n초강력. 초경량. 초프로.",
      source: "/assets/videos/section2_2_large_2x.mp4",
    },
    {
      text: "iPhone 사상 가장 긴\n광학 줌 초점 거리를 자랑하는\niPhone 15 Pro Max.\n저 멀리 내다보다.",
      source: "/assets/videos/section2_3_large_2x.mp4",
    },
    {
      text: "완전히 새로운 동작 버튼.\n요모조모 요긴하게.",
      source: "/assets/videos/section2_4_large_2x.mp4",
    },
  ];
  const [swiper, setSwiper] = useState<SwiperClass>();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-200px" });

  const videoPlayRef = useRef<HTMLDivElement | null>(null);
  const isVideoPlayRefInView = useInView(videoPlayRef);

  useEffect(() => {
    isVideoPlaying ? playVideo() : pauseVideo();
  }, [isVideoPlaying]);

  useEffect(() => {
    if (!swiper) return;
    if (isVideoPlayRefInView) {
      setIsVideoPlaying(true);
      swiper.params.autoplay = {
        delay: 6000,
        disableOnInteraction: false,
        stopOnLastSlide: true,
      };
      swiper.autoplay.start();
    } else {
      setIsVideoPlaying(false);
      swiper.autoplay.pause();
    }
  }, [swiper, isVideoPlayRefInView]);

  const handleSlideChange = (e: any) => {
    setActiveSlide(e.activeIndex);
    if (isVideoPlaying) {
      playVideo();
    } else {
      setIsVideoPlaying(true);
    }
  };

  const handlePaginationClick = (_idx: number) => {
    if (!swiper) return;
    swiper.slideTo(_idx);
  };

  const playVideo = () => {
    if (!swiper) return;
    videoRefs.current.map((videoRefs, idx: number) => {
      if (idx === swiper.activeIndex) {
        videoRefs.play();
      } else {
        videoRefs.pause();
        videoRefs.currentTime = 0;
      }
    });
  };

  const pauseVideo = () => {
    if (!swiper) return;
    videoRefs.current.map((videoRefs, idx: number) => {
      videoRefs.pause();
    });
  };

  const toggleVideoPlay = () => {
    setIsVideoPlaying((prev) => !prev);
  };

  const itemVariants = {
    hidden: { x: 28, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.5,
        delayChildren: 1,
      },
    },
    exitt: { x: 28, opacity: 0, y: -20 },
  };

  const subVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: { width: "168px", opacity: 1 },
    exitt: { width: 0, opacity: 0 },
  };

  const itemVariants2 = {
    hidden: {
      x: -28,
      marginInlineStart: 0,
      opacity: 0,
    },
    visible: {
      x: 0,
      marginInlineStart: "14px",
      opacity: 1,
      transition: {
        delay: 0.5,
      },
    },
    exitt: {
      x: -28,
      marginInlineStart: 0,
      opacity: 0,
      y: -20,
    },
  };

  const itemVariants3 = {
    hidden: {
      y: 100,
      scale: 0,
      opacity: 0,
    },
    visible: {
      y: -14.5,
      scale: [1, 1.2, 0],
      opacity: 1,
    },
    exitt: {
      y: 100,
      scale: 0,
      opacity: 0,
    },
  };
  const itemVariants4 = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      scale: [1, 0],
      opacity: [1, 0],
      transition: { delay: 0.5, duration: 0.15 },
    },
    exitt: {
      scale: 0,
      opacity: 0,
    },
  };

  return (
    <div className="relative">
      <div ref={videoPlayRef} />
      <Swiper
        modules={[Autoplay]}
        className="w-full"
        slidesPerView={2}
        spaceBetween={40}
        onSwiper={setSwiper}
        onSlideChange={handleSlideChange}
        speed={800}
        centeredSlides
      >
        {VIDEOS.map((video, idx) => (
          <SwiperSlide key={`slide-${idx}`}>
            <div className="max-w-[1260px] w-full mx-auto relative">
              <div className="h-[680px] bg-black rounded-[28px] overflow-hidden relative">
                <div
                  className="w-full h-full cursor-pointer"
                  onClick={toggleVideoPlay}
                >
                  <div className="absolute top-10 left-10 color-[#f5f5f7] text-[24px] font-medium whitespace-pre-line text-left">
                    {video.text}
                  </div>
                  <video
                    ref={(ref) => {
                      videoRefs.current[idx] = ref!;
                    }}
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  >
                    <source src={video.source} type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        ref={sectionRef}
        className="flex justify-center sticky bottom-0 z-10 py-[100px]"
      >
        <AnimatePresence>
          {isInView && (
            <>
              <div className="flex">
                <motion.div
                  className="min-h-[56px] min-w-[56px] rounded-[32px] backdrop-blur backdrop-effect"
                  style={{ backgroundColor: "rgba(66, 66, 69, 0.7)" }}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exitt"
                >
                  <motion.div
                    className="flex justify-center h-full overflow-hidden relative"
                    variants={subVariants}
                  >
                    {VIDEOS.map((_, paginationIndex) => {
                      return (
                        <motion.button
                          key={`pagination-${paginationIndex}`}
                          className="p-2 paginate"
                          onClick={() => handlePaginationClick(paginationIndex)}
                        >
                          <motion.span
                            className="bg-[#f5f5f7] h-2 rounded-full block"
                            initial={{ opacity: 0, minWidth: "8px" }}
                            animate={{
                              opacity: 1,
                              minWidth:
                                activeSlide === paginationIndex
                                  ? "40px"
                                  : "8px",
                            }}
                          />
                        </motion.button>
                      );
                    })}
                  </motion.div>
                </motion.div>
                <motion.div
                  className="min-h-[56px] min-w-[56px] rounded-[32px] backdrop-blur backdrop-effect"
                  style={{ backgroundColor: "rgba(66, 66, 69, 0.7)" }}
                  variants={itemVariants2}
                  initial="hidden"
                  animate="visible"
                  exit="exitt"
                >
                  <motion.span
                    className="cursor-pointer"
                    onClick={() => {
                      setIsVideoPlaying((prev) => !prev);
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {isVideoPlaying ? <PauseIcon /> : <PlayIcon />}
                  </motion.span>
                </motion.div>
              </div>
              <motion.div
                className="min-h-[84px] min-w-[84px] rounded-full backdrop-blur backdrop-effect bg-[#0077ed] absolute"
                variants={itemVariants3}
                initial="hidden"
                animate="visible"
                exit="exitt"
              />
              <motion.div
                className="min-h-[56px] min-w-[56px] rounded-[32px] backdrop-blur backdrop-effect absolute"
                style={{ backgroundColor: "rgba(66, 66, 69, 0.7)" }}
                variants={itemVariants4}
                initial="hidden"
                animate="visible"
                exit="exitt"
              />
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function CoreSection() {
  const scrollRef = useRef<HTMLElement | null>(null);
  const control1 = useAnimationControls();
  const control2 = useAnimationControls();
  const control3 = useAnimationControls();
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"],
  });
  useEffect(() => {
    const onScrollChange = (yProgress: number) => {
      if (yProgress < 0.2) {
        control1.start({ opacity: 0, y: 20 });
      } else if (yProgress < 0.3) {
        control1.start({ opacity: 1, y: 0 });
        control2.start({ opacity: 0, y: 20 });
      } else if (yProgress < 0.35) {
        control1.start({ opacity: 1, y: 0 });
        control2.start({ opacity: 1, y: 0 });
        control3.start({ opacity: 0, y: 20 });
      } else {
        control1.start({ opacity: 1, y: 0 });
        control2.start({ opacity: 1, y: 0 });
        control3.start({ opacity: 1, y: 0 });
      }
    };
    const unsubScribeY = scrollYProgress.on("change", onScrollChange);

    return () => {
      unsubScribeY();
    };
  }, []);
  return (
    <section
      ref={scrollRef}
      className="bg-[#101010] flex flex-col relative text-white text-center gap-4 py-[100px] px-10"
    >
      <div className="max-w-[1260px] w-full mx-auto relative">
        <div className="flex flex-wrap w-full gap-6 items-center px-4 lg:px-0 pb-10">
          <motion.h1
            className="font-semibold self-start w-full text-left md:w-auto text-2xl md:text-[46px] text-[#86868b] mr-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={control1}
          >
            일단 핵심부터.
          </motion.h1>
          <motion.div
            className="md:text-xl font-semibold text-[#0071e3] cursor-pointer hover:underline"
            initial={{ opacity: 0, y: 20 }}
            animate={control2}
          >
            동영상 보기
          </motion.div>
          <motion.div
            className="md:text-xl font-semibold text-[#0071e3] cursor-pointer hover:underline"
            initial={{ opacity: 0, y: 20 }}
            animate={control3}
          >
            이벤트 시청하기
          </motion.div>
        </div>
      </div>
      <Carousel />
    </section>
  );
}
