"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
// import {
//   KakaoLoginButton,
//   GoogleLoginButton,
// } from "@/components/common/social-login-btn";
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

  // Auto rotation
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000); // Change slide every 5 seconds

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
    <section className="@container/signin-form w-full flex flex-col mx-auto my-auto max-w-screen-xs">
      <Image
        src="/images/snippins_temp_logo.svg"
        alt="logo"
        width={195}
        height={100}
        className="w-1/3"
      />
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={CAROUSEL_ITEMS[currentIndex]}
              alt={`signin${currentIndex + 1}`}
              className="mx-auto w-2/3 @xs:w-full"
            />
          </motion.div>
        </AnimatePresence>
        <svg
          width="56"
          height="57"
          viewBox="0 0 56 57"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="size-12 @md:size-14 absolute right-0 top-2/3 @md:top-1/2 -translate-y-1/2 cursor-pointer hover:scale-105 transition-all"
          onClick={handleNext}
        >
          <circle
            cx="28.0006"
            cy="28.6458"
            r="23.3333"
            transform="rotate(90 28.0006 28.6458)"
            stroke="#7C01D3"
            strokeWidth="1.5"
          />
          <path
            d="M31.5007 22.8125C32.6806 23.9594 37.334 27.012 37.334 28.6458M31.5007 34.4792C32.6806 33.3323 37.334 30.2797 37.334 28.6458M37.334 28.6458L18.6673 28.6458"
            stroke="#7C01D3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="text-xl @xs:text-2xl @md:text-3xl font-bold leading-normal"
        >
          {DESCRIPTIONS[currentIndex][0]} <br />
          {DESCRIPTIONS[currentIndex][1]}
        </motion.p>
      </AnimatePresence>
      <div className="h-[16px] @md:h-[26px]" />
      <div className="flex gap-3">
        {CAROUSEL_ITEMS.map((_, index) => (
          <motion.div
            key={index}
            onClick={() => handleDotClick(index)}
            className={`size-4 rounded-full border-2 cursor-pointer ${
              currentIndex === index
                ? "border-primary bg-primary"
                : "border-gray-300 bg-transparent"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
      <div className="h-8 @md:h-10" />
      <p className="text-neutral-600 text-sm @md:text-lg">
        소셜 아이디로 3초만에 현업 코드 획득하기!
      </p>
      <div className="h-8 @md:h-2" />
      <Button className="bg-blue-500 rounded-sm text-white">
        카카오로 시작하기
      </Button>
      <div className="h-3 @md:h-5" />
      <Button className="bg-blue-500 rounded-sm text-white">
        구글로 시작하기
      </Button>
      <div className="h-4 @md:h-5" />
      <p className="text-neutral-600 text-xs @md:text-sm">
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
    </section>
  );
};

export default SigninForm;
