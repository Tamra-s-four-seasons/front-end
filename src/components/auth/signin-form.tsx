"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import SignIn1 from "@/assets/images/signin/signin-1.png";
import SignIn2 from "@/assets/images/signin/signin-2.png";
import SignIn3 from "@/assets/images/signin/signin-3.png";
import Link from "next/link";
import { Button } from "@vapor-ui/core";
import { setAuthUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

const DESCRIPTIONS = [
  [["버튼 하나로 ", "탐험을 시작", "해요"], "숨은 제주가 열립니다"],
  [["거리와 난이도로 ", "루트 추천", ""], "코스를 따라 걸어보세요"],
  [["핀을 눌러 ", "장소를 확인", "해요"], "숨겨진 포인트를 발견해요"],
];

const CAROUSEL_ITEMS = [SignIn1, SignIn2, SignIn3];

const SigninForm = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      if (!showLoginForm) {
        handleNext();
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, showLoginForm]);

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === CAROUSEL_ITEMS.length - 1 ? 0 : prev + 1
    );
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // 테스트용 간단한 로그인 처리
    if (loginData.username && loginData.password) {
      setAuthUser({
        id: Date.now().toString(), // 임시 ID 생성
        username: loginData.username,
      });
      router.push("/");
    }
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
              {!showLoginForm ? (
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
              ) : (
                <motion.form
                  onSubmit={handleLogin}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full max-w-[400px] flex flex-col gap-4"
                >
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      name="username"
                      placeholder="아이디"
                      value={loginData.username}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#24D05B] focus:border-transparent"
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="비밀번호"
                      value={loginData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#24D05B] focus:border-transparent"
                    />
                  </div>
                </motion.form>
              )}
            </div>
          </div>
        </div>

        {/* Copy Text Block */}
        <div className="w-[90%] sm:w-4/5 max-w-[800px] flex flex-col items-center bg-gray-50 pt-8">
          {!showLoginForm && (
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
                {DESCRIPTIONS[currentIndex][0][0]}
                <span className="text-[#2DDE72]">
                  {DESCRIPTIONS[currentIndex][0][1]}
                </span>
                {DESCRIPTIONS[currentIndex][0][2]} <br />
                {DESCRIPTIONS[currentIndex][1]}
              </motion.p>
            </AnimatePresence>
          )}

          {/* Paging Indicators */}
          {!showLoginForm && (
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
          )}

          {/* Login Buttons */}
          <div className="flex flex-col items-center w-full">
            {!showLoginForm ? (
              <Button
                onClick={() => setShowLoginForm(true)}
                className="w-full max-w-[280px] min-w-[85%] sm:min-w-[40vw] h-[clamp(64px,5vh,6.5vh)] rounded-[0.75rem] bg-gray-800 text-white mb-[calc(1vh)]"
              >
                시작하기
              </Button>
            ) : (
              <Button
                onClick={handleLogin}
                className="w-full max-w-[280px] min-w-[85%] sm:min-w-[40vw] h-[clamp(64px,5vh,6.5vh)] rounded-[0.75rem] bg-gray-800 text-white mb-[calc(1vh)]"
              >
                로그인하기
              </Button>
            )}

            <p
              className="text-neutral-600 mt-4"
              style={{ fontSize: "clamp(0.75rem, 1vw, 0.875rem)" }}
            >
              {showLoginForm ? (
                <span
                  className="cursor-pointer underline"
                  onClick={() => setShowLoginForm(false)}
                >
                  뒤로가기
                </span>
              ) : (
                <>
                  로그인함으로써{" "}
                  <Link href="/terms" className="!underline">
                    이용약관
                  </Link>{" "}
                  및{" "}
                  <Link href="/" className="!underline">
                    개인정보처리방침
                  </Link>
                  에 동의합니다.
                </>
              )}
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
