"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CardComponent from "./card-component";

interface TrailData {
  trailName: string;
  location: string;
  distance: string;
  difficulty: number;
  tags: string[];
  imageUrl?: string | null;
  isLocked?: boolean;
}

const mockTrails: TrailData[] = [
  {
    trailName: "구름 올레",
    location: "서귀포시 성산읍",
    distance: "140m",
    difficulty: 1,
    tags: ["해커톤", "열정"],
    imageUrl: null,
  },
  {
    trailName: "바람 올레",
    location: "제주시 한림읍",
    distance: "3km",
    difficulty: 2,
    tags: ["해안도로", "경치"],
    imageUrl: null,
  },
  {
    trailName: "땅콩 올레",
    location: "제주시 우도면",
    distance: "14.24km",
    difficulty: 3,
    tags: ["낭만", "일출"],
    imageUrl: null,
  },
  // 잠금 카드 추가
  {
    trailName: "",
    location: "",
    distance: "",
    difficulty: 0,
    tags: [],
    isLocked: true,
  },
];

const CarouselComponent: React.FC = () => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    containScroll: "keepSnaps",
    dragFree: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const currentIndex = emblaApi.selectedScrollSnap();
    setSelectedIndex(currentIndex);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || !containerRef.current) return;

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    const container = containerRef.current;

    const preventDefaultTouch = (e: TouchEvent) => {
      if (selectedIndex === 3) {
        const touch = e.touches[0];
        const currentX = touch.clientX;

        if (!isDragging) {
          setStartX(currentX);
          setIsDragging(true);
        } else {
          const diff = currentX - startX;
          // 오른쪽으로 스와이프 시도할 때만 preventDefault
          if (diff < -5) {
            e.preventDefault();
            emblaApi.scrollTo(3);
          }
        }
      }
    };

    const touchEnd = () => {
      setIsDragging(false);
    };

    container.addEventListener("touchmove", preventDefaultTouch, {
      passive: false,
    });
    container.addEventListener("touchend", touchEnd);
    container.addEventListener("touchcancel", touchEnd);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
      container.removeEventListener("touchmove", preventDefaultTouch);
      container.removeEventListener("touchend", touchEnd);
      container.removeEventListener("touchcancel", touchEnd);
    };
  }, [emblaApi, onSelect, selectedIndex, isDragging, startX]);

  return (
    <div className="flex flex-col min-h-screen bg-[#EAFCF1]">
      <div className="flex top-8 left-4 z-10 mt-[5%]">
        <button onClick={() => router.back()} className="p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            viewBox="0 0 35 35"
            fill="none"
          >
            <path
              d="M22.3388 10.7396C22.8941 10.1843 22.8941 9.28402 22.3388 8.72874C21.7836 8.17347 20.8833 8.17347 20.328 8.72874L12.7314 16.3254C12.0827 16.974 12.0827 18.0257 12.7314 18.6744L20.328 26.271C20.8833 26.8263 21.7836 26.8263 22.3389 26.271C22.8941 25.7158 22.8941 24.8155 22.3388 24.2602L15.5785 17.4999L22.3388 10.7396Z"
              fill="#515151"
            />
          </svg>
        </button>
      </div>

      <h1 className="text-m font-bold text-center text-gray-800 w-[64%] mx-auto">
        지금, 이 순간 당신에게 <br /> 가장 어울리는 길은 어디일까요?
      </h1>

      <div className="flex justify-center mt-[5%]">
        <div ref={containerRef} className="w-full overflow-hidden">
          <div
            ref={emblaRef}
            className={`${selectedIndex === 3 ? "touch-pan-y" : ""}`}
          >
            <style jsx>{`
              .touch-pan-y {
                touch-action: pan-y !important;
                -ms-touch-action: pan-y !important;
                -webkit-touch-action: pan-y !important;
              }
            `}</style>
            <div className="flex">
              {mockTrails.map((trail, index) => (
                <div
                  key={index}
                  className={`flex-none w-[84%] px-2`}
                  style={{
                    marginLeft: index === 0 ? "8%" : "0",
                    marginRight: index === mockTrails.length - 1 ? "8%" : "0",
                  }}
                >
                  <CardComponent {...trail} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8 mb-12">
        {mockTrails.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-2.5 w-2.5 mx-1.5 rounded-full transition-colors duration-300 ${
              selectedIndex === index ? "bg-[#2DDE72]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      <div className="flex justify-center px-4">
        <Link href="#" className="w-[76%] max-w-md">
          <button className="w-full bg-[#2DDE72] text-white text-m font-bold py-4 px-8 rounded-[22px] hover:bg-green-500 transition-colors duration-300">
            지도 생성하기
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CarouselComponent;
