"use client";

import CartIcon from "@/public/assets/icons/cart.svg";
import Logo from "@/public/assets/icons/logo.svg";
import MenuIcon from "@/public/assets/icons/menu.svg";
import SearchIcon from "@/public/assets/icons/search.svg";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";

export default function Header() {
  const SubMenuNames = [
    "스토어",
    "Mac",
    "iPad",
    "Watch",
    "AirPods",
    "TV 및 홈",
    "엔터테인먼트",
    "악세서리",
    "고객지원",
  ];
  const [menuIdx, setMenuIdx] = useState<number | null>(null);

  const menuControl = useAnimationControls();
  const backdropControl = useAnimationControls();
  const flotingNavControl = useAnimationControls();

  const openMenuAnimation = () => {
    menuControl.start({ opacity: 1, height: "auto" });
    backdropControl.start({ backdropFilter: "blur(8px)", height: "100%" });
  };

  const closeMenuAnimation = () => {
    menuControl.start({ opacity: 0, height: 0 });
    backdropControl.start({ backdropFilter: "none", height: "0" });
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0 },
  };

  const renderSubMenu = () => {
    switch (menuIdx) {
      case 0:
        return (
          <div className="flex gap-14" key={menuIdx}>
            <div className="flex flex-col gap-3">
              <h2 className="text-[#86868b] text-xs">쇼핑하기</h2>
              <motion.ul
                className="flex flex-col gap-2 text-2xl font-semibold text-[#e8e8ed]"
                variants={listVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.li variants={itemVariants}>
                  최신 제품 쇼핑하기
                </motion.li>
                <motion.li variants={itemVariants}>Mac</motion.li>
                <motion.li variants={itemVariants}>iPad</motion.li>
                <motion.li variants={itemVariants}>iPhone</motion.li>
                <motion.li variants={itemVariants}>Apple Watch</motion.li>
                <motion.li variants={itemVariants}>액세서리</motion.li>
              </motion.ul>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-[#86868b] text-xs">빠른 링크</h2>
              <ul className="flex flex-col gap-2 font-semibold text-[#e8e8ed]">
                <li>매장 찾기</li>
                <li>주문 상태</li>
                <li>Apple Trade In</li>
                <li>할부 방식</li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-[#86868b] text-xs">특별 할인 쇼핑하기</h2>
              <ul className="flex flex-col gap-2 font-semibold text-[#e8e8ed]">
                <li>인증 리퍼비쉬 제품</li>
                <li>교육</li>
                <li>비즈니스</li>
              </ul>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="flex gap-14" key={menuIdx}>
            <div className="flex flex-col gap-3">
              <h2 className="text-[#86868b] text-xs">Mac 살펴보기</h2>
              <motion.ul
                className="flex flex-col gap-2 text-2xl font-semibold text-[#e8e8ed]"
                variants={listVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.li variants={itemVariants}>Mac 모두 살펴보기</motion.li>
                <motion.li variants={itemVariants}>MacBook Air</motion.li>
                <motion.li variants={itemVariants}>MacBook Pro</motion.li>
                <motion.li variants={itemVariants}>iMac</motion.li>
                <motion.li variants={itemVariants}>mac Mini</motion.li>
                <motion.li variants={itemVariants}>mac Studio</motion.li>
                <motion.li variants={itemVariants}>mac 비교하기</motion.li>
              </motion.ul>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-[#86868b] text-xs">Mac 쇼핑하기</h2>
              <ul className="flex flex-col gap-2 font-semibold text-[#e8e8ed]">
                <li>Mac 쇼핑하기</li>
                <li>Mac 액세서리</li>
                <li>Apple Trade In</li>
                <li>할부 방식</li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-[#86868b] text-xs">특별 할인 쇼핑하기</h2>
              <ul className="flex flex-col gap-2 font-semibold text-[#e8e8ed]">
                <li>인증 리퍼비쉬 제품</li>
                <li>교육</li>
                <li>비즈니스</li>
              </ul>
            </div>
          </div>
        );

      default:
        return <div className="text-2xl">Coming soon</div>;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      flotingNavControl.start({ y: scrollTop > 392 ? 0 : "-100%" });
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
      <div
        className="flex justify-center bg-black text-white px-1.5"
        onMouseLeave={closeMenuAnimation}
      >
        <nav className="z-20 h-11 flex flex-1">
          <div className="flex flex-1 max-w-screen-lg mx-auto px-8">
            <ul className="flex flex-1 items-center justify-between text-xs gap-8 min-[835px]:gap-0">
              <div className="group cursor-pointer">
                <Logo className="group-hover:flex hidden" color="white" />
                <Logo className="group-hover:hidden flex" color="#cccccc" />
              </div>
              {SubMenuNames.map((item, idx) => (
                <li
                  key={idx}
                  className="hidden min-[835px]:flex text-[#cccccc] hover:text-white font-light cursor-pointer"
                  onMouseEnter={() => {
                    setMenuIdx(idx);
                    openMenuAnimation();
                  }}
                >
                  {item}
                </li>
              ))}
              <div className="flex flex-1 min-[835px]:hidden" />
              <div className="group cursor-pointer">
                <SearchIcon className="group-hover:flex hidden" color="white" />
                <SearchIcon
                  className="group-hover:hidden flex"
                  color="#cccccc"
                />
              </div>
              <div className="group cursor-pointer">
                <CartIcon className="group-hover:flex hidden" color="white" />
                <CartIcon className="group-hover:hidden flex" color="#cccccc" />
              </div>
              <div className="flex min-[835px]:hidden cursor-pointer">
                <MenuIcon />
              </div>
            </ul>
          </div>
        </nav>
        <motion.div
          className="bg-[#1d1d1f] absolute w-full overflow-hidden left-0 top-0 z-10"
          initial={{ opacity: 0, height: 0 }}
          animate={menuControl}
          transition={{ duration: 0.4 }}
        >
          <div className="max-w-screen-lg mx-auto mt-11 px-4 pt-10 pb-[84px]">
            <div>{renderSubMenu()}</div>
          </div>
        </motion.div>
      </div>
      <motion.div
        className="fixed top-0 w-full left-0 z-[1]"
        initial={{ backdropFilter: "none", height: 0 }}
        animate={backdropControl}
        transition={{ duration: 0.2 }}
      />

      <motion.div
        className="flex items-center h-[52px] text-white fixed w-full top-0 z-30 border-b-2 border-[#424245]"
        style={{ backdropFilter: "saturate(180%) blur(20px)" }}
        initial={{ y: "-100%" }}
        animate={flotingNavControl}
      >
        <div className="max-w-screen-lg w-full mx-auto px-4 flex items-center gap-5 text-[10px] font-semibold">
          <a href="#" className="mr-auto">
            <h1 className="text-xl font-semibold">iPhone 15 Pro</h1>
          </a>
          <a href="#" className="opacity-50 hidden min-[835px]:block">
            개요
          </a>
          <a href="#" className="hidden min-[835px]:block hover:text-[#0077ed]">
            안드로이드에서 갈아타기
          </a>
          <a href="#" className="hidden min-[835px]:block hover:text-[#0077ed]">
            제품 사양
          </a>
          <a
            href="#"
            type="button"
            className="bg-[#0071e3] hover:bg-[#0077ed] py-1 px-3 text-center rounded-full"
          >
            구입하기
          </a>
        </div>
      </motion.div>
    </div>
  );
}
