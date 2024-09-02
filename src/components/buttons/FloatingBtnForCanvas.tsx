"use client";
import { AnimatePresence, motion, useAnimate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
type Props = {
  colors: {
    hex: string;
  }[];
  color: string;
  model: string;
  handleModel: (model: string) => void;
  handleColor: (color: string) => void;
};
export default function FloatingBtnForCanvas({
  colors,
  color,
  model,
  handleModel,
  handleColor,
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { margin: "-200px" });
  const [scope, animate] = useAnimate();
  useEffect(() => {
    if (!isInView) return;
    const animateButton = async () => {
      if (!scope || !scope.current || !animate) return;
      await animate(scope.current, { borderWidth: "20px" });
      animate(scope.current, { borderWidth: "0px" });
    };
    animateButton();
  }, [animate, isInView, scope]);
  //   const variants = {
  //     hidden: { borderWidth: "0px" },
  //     visible: {
  //       borderWidth: ["0px", "20px", "0px"],
  //       transition: { duration: 1, times: [0.5, 1] },
  //     },
  //     exitt: { borderWidth: "0px" },
  //   };
  const models = ["pro", "pro-max"];
  return (
    <div
      ref={sectionRef}
      className="flex justify-center sticky bottom-0 z-10 py-[100px]"
    >
      <AnimatePresence>
        <div className="h-[76px] flex justify-center items-center text-white">
          {isInView && (
            <motion.div
              ref={scope}
              className="flex border-[#016dda] rounded-full items-center"
            >
              <div className="rounded-full backdrop-blur backdrop-effect bg-[#f5f5f730] h-[56px]">
                <motion.div
                  className="flex justify-center h-full overflow-hidden relative items-center"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{
                    width: "168px",
                    opacity: 1,
                    transition: { delay: 1 },
                  }}
                  exit={{ width: 0, opacity: 0 }}
                >
                  {colors.map((_color, paginationIndex) => {
                    const isSelected = color === _color.hex;
                    return (
                      <motion.div
                        key={`pagination-${paginationIndex}`}
                        className="py-1 px-2 paginate"
                        onClick={() => handleColor(_color.hex)}
                      >
                        <motion.span
                          className="rounded-full block w-6 h-6 cursor-pointer"
                          style={{
                            backgroundColor: _color.hex,

                            borderColor: isSelected ? "white" : _color.hex,
                          }}
                          initial={{ opacity: 0, borderWidth: 2 }}
                          animate={{
                            opacity: 1,
                            borderWidth: isSelected ? "2px" : "0px",
                            transition: { delay: 1 },
                          }}
                        />
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
              <motion.div
                className="flex rounded-full backdrop-blur backdrop-effect bg-[#f5f5f730] h-[56px] font-semibold"
                initial={{
                  width: 56,
                  marginLeft: 0,
                  backgroundColor: "#f5f5f780",
                }}
                animate={{
                  width: "160px",
                  margin: "14px",
                  backgroundColor: "#f5f5f730",
                  transition: { delay: 1 },
                }}
                exit={{
                  backgroundColor: "#f5f5f780",
                  marginLeft: 0,
                }}
              >
                <motion.div
                  className={`flex items-center justify-center cursor-pointer rounded-full relative min-w-[85px]`}
                  onClick={() => handleModel("pro")}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { delay: 1.25 },
                  }}
                  exit={{ opacity: 0 }}
                >
                  {model === "pro" && (
                    <motion.div
                      className="bottom-0 absolute bg-white w-full h-full rounded-full"
                      style={{ scale: 0.87 }}
                      layoutId="underline"
                    />
                  )}

                  <motion.span
                    key={model}
                    className="absolute left-4 z-[1]"
                    animate={{
                      color:
                        model === "pro"
                          ? ["#FFFFFF", "#000000"]
                          : ["#000000", "#FFFFFF"],
                      transition: { duration: 0.15, delay: 0.1 },
                    }}
                  >
                    15.5cm
                  </motion.span>
                </motion.div>
                <motion.div
                  className={`flex items-center justify-center cursor-pointer rounded-full absolute left-[75px] h-full min-w-[85px]`}
                  onClick={() => handleModel("pro-max")}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { delay: 1.25 },
                  }}
                  exit={{ opacity: 0 }}
                >
                  {model === "pro-max" && (
                    <motion.div
                      className="bottom-0 absolute bg-white w-full h-full rounded-full "
                      style={{ scale: 0.87 }}
                      layoutId="underline"
                    />
                  )}
                  <motion.span
                    className="absolute left-4"
                    animate={{
                      color:
                        model === "pro-max"
                          ? ["#FFFFFF", "#000000"]
                          : ["#000000", "#FFFFFF"],
                      transition: { duration: 0.15, delay: 0.1 },
                    }}
                  >
                    17.0cm
                  </motion.span>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </AnimatePresence>
    </div>
  );
}
