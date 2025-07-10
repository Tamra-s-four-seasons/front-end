"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import SignIn1 from "@/assets/images/signin/signin-1.png";
import SignIn2 from "@/assets/images/signin/signin-2.png";
import SignIn3 from "@/assets/images/signin/signin-3.png";
import Link from "next/link";
import { Button } from "@vapor-ui/core";

const DESCRIPTIONS = [
  ["버그 투성이인", "AI가 생성한 코드에 지칠때"],
  ["커스텀하기 어려운", "라이브러리 의존성에 지칠때"],
  ["내가 생각해도 너~무 잘 짠", "내 코드로 부수익을 올리고 싶을때"],
];

const CAROUSEL_ITEMS = [SignIn1, SignIn2, SignIn3];

const SigninForm = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === CAROUSEL_ITEMS.length - 1 ? 0 : prev + 1
    );
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <main className="min-h-screen w-full bg-gray-50">
      {/* Hero Section */}
      <div className="w-full h-[40vh] bg-gradient-to-b from-[#24D05B]/80 to-[#24D05B]" />

      {/* Content Layout */}
      <div className="w-full -mt-[22vh] flex flex-col items-center">
        {/* Main Card */}
        <div className="w-[70%] sm:w-[45vw] h-[40vh] max-w-[1200px] bg-white rounded-t-[1rem] p-4 sm:p-6 md:p-8">
          <div className="flex flex-col items-center h-full">
            <Image
              src="/images/snippins_temp_logo.svg"
              alt="logo"
              width={195}
              height={100}
              className="w-20 sm:w-24 md:w-28 mb-4 sm:mb-6 md:mb-8"
            />

            {/* Carousel Section with aspect ratio container */}
            <div className="w-full flex-1 flex items-center justify-center">
              <div className="w-full max-w-[400px] aspect-[400/299]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className="h-full flex items-center justify-center"
                  >
                    <Image
                      src={CAROUSEL_ITEMS[currentIndex]}
                      alt={`signin${currentIndex + 1}`}
                      className="w-full h-full object-contain"
                      width={400}
                      height={299}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Copy Text Block */}
        <div className="w-[90%] sm:w-4/5 max-w-[800px] flex flex-col items-center bg-gray-50 pt-8">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center mb-[2vh] font-bold"
              style={{ fontSize: "clamp(0.875rem, 2vw, 1.125rem)" }}
            >
              {DESCRIPTIONS[currentIndex][0]} <br />
              {DESCRIPTIONS[currentIndex][1]}
            </motion.p>
          </AnimatePresence>

          {/* Paging Indicators */}
          <div className="flex justify-center gap-[0.5rem] mb-6 sm:mb-8">
            {CAROUSEL_ITEMS.map((_, index) => (
              <motion.div
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-[0.5rem] h-[0.5rem] rounded-full cursor-pointer ${
                  currentIndex === index ? "bg-[#24D05B]" : "bg-gray-300"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          {/* Login Buttons */}
          <div className="flex flex-col items-center w-full">
            <Link
              href="/home"
              className="w-full max-w-[280px] min-w-[85%] sm:min-w-[40vw]"
            >
              <Button className="w-full h-[clamp(64px,5vh,6.5vh)] rounded-[0.75rem] bg-gray-800 text-white mb-[calc(1vh)]">
                카카오로 시작하기
              </Button>
            </Link>
            <Button className="w-full max-w-[280px] min-w-[85%] sm:min-w-[40vw] h-[clamp(64px,5vh,6.5vh)] rounded-[0.75rem] bg-gray-800 text-white">
              구글로 시작하기
            </Button>
            <p
              className="text-neutral-600 mt-4"
              style={{ fontSize: "clamp(0.75rem, 1vw, 0.875rem)" }}
            >
              로그인함으로써{" "}
              <Link href="/terms" className="!underline">
                이용약관
              </Link>{" "}
              및{" "}
              <Link href="/privacy" className="!underline">
                개인정보처리방침
              </Link>
              에 동의합니다.
            </p>
          </div>
        </div>

        {/* Bottom Safe Area */}
        <div className="h-[8vh]" />
      </div>
    </main>
  );
};

export default SigninForm;
