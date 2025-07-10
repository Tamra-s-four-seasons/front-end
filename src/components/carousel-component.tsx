"use client";

import React, { useState, useEffect, useCallback } from "react";
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
}

const mockTrails: TrailData[] = [
  {
    trailName: "구름 올레",
    location: "서귀포시 성산읍",
    distance: "140m",
    difficulty: 2,
    tags: ["낭만적", "일출"],
    imageUrl: null,
  },
  {
    trailName: "바람 올레",
    location: "제주시 한림읍",
    distance: "2.5km",
    difficulty: 3,
    tags: ["상쾌함", "바다"],
    imageUrl: null,
  },
  {
    trailName: "숲길 올레",
    location: "제주시 조천읍",
    distance: "5km",
    difficulty: 1,
    tags: ["힐링", "자연"],
    imageUrl: null,
  },
  {
    trailName: "오름 올레",
    location: "서귀포시 안덕면",
    distance: "3.2km",
    difficulty: 3,
    tags: ["도전", "경치"],
    imageUrl: null,
  },
  {
    trailName: "해안 올레",
    location: "제주시 애월읍",
    distance: "7km",
    difficulty: 2,
    tags: ["시원함", "노을"],
    imageUrl: null,
  },
];

const CarouselComponent: React.FC = () => {
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

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
        <div className="w-full overflow-hidden pl-[14.5%]" ref={emblaRef}>
          <div className="flex -ml-4">
            {mockTrails.map((trail, index) => (
              <div key={index} className="flex-none w-[71%] pl-4">
                <CardComponent {...trail} />
              </div>
            ))}
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
