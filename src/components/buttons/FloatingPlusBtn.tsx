"use client";
import { AnimatePresence, motion, useAnimate, useInView } from "framer-motion";
import React, { useEffect, useRef } from "react";
import MoreIcon from "@/public/assets/icons/more.svg";

type Props = {
  title: string;
};

export default function FloatingPlusBtn({ title }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: "all" });

  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (!isInView) return;
    const animationButton = async () => {
      if (!scope || !scope.current || !animate) return;
      await animate(scope.current, { borderWidth: "20px" });
      animate(scope.current, { borderWidth: "0px" });
    };
    animationButton();
  }, [isInView]);

  return (
    <div
      className="sticky bottom-0 flex justify-center items-center h-40 z-10"
      ref={sectionRef}
    >
      <AnimatePresence>
        {isInView && (
          <div ref={scope} className="rounded-full border-[#016dda]">
            <motion.button
              type="button"
              className="flex items-center min-w-[14px] min-h-[14px] rounded-full p-1.5 backdrop-blur"
              style={{ backgroundColor: "rgb(66 66 69/90%)" }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  opacity: {
                    duration: 1,
                    delay: 0,
                  },
                },
              }}
              exit={{
                opacity: 0,
                transition: {
                  opacity: {
                    duration: 0.3,
                    delay: 0.3,
                  },
                },
              }}
            >
              <motion.span
                className="text-white overflow-hidden whitespace-nowrap font-semibold text-sm"
                initial={{
                  opacity: 0,
                  width: 0,
                  marginInlineStart: "0px",
                  marginInlineEnd: "0px",
                }}
                animate={{
                  opacity: 1,
                  width: "auto",
                  marginInlineStart: "12px",
                  marginInlineEnd: "12px",
                  transition: {
                    delay: 1,
                  },
                }}
                exit={{
                  opacity: 0,
                  width: 0,
                  marginInlineStart: "0px",
                  marginInlineEnd: "0px",
                }}
              >
                {title}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    delay: 0.5,
                  },
                }}
                exit={{ opacity: 0, scale: 0 }}
                className="bg-[#0071e3] rounded-full text-white"
              >
                <MoreIcon />
              </motion.span>
            </motion.button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
