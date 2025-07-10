"use client";

import React, { useState, useEffect } from "react";
import { LockIcon } from "@vapor-ui/icons";
import { X } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@vapor-ui/core";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import CardComponent from "../card-component";
import Image from "next/image";
import { isGoormComplete, setGoormComplete } from "@/lib/localStorage";

// Mock data for modal cards
const MODAL_CARD_DATA = [
  {
    trailName: "구름 올레",
    location: "서귀포시 성산읍",
    distance: "140m",
    difficulty: 1,
    tags: ["해커톤", "열정"],
    imageUrl: "/images/a1.png",
    backgroundImage: "/images/a1.png",
  },
  {
    trailName: "바람 올레",
    location: "제주시 한림읍",
    distance: "3km",
    difficulty: 2,
    tags: ["해안도로", "경치"],
    imageUrl: "/images/a2.png",
    backgroundImage: "/images/a2.png",
  },
  {
    trailName: "땅콩 올레",
    location: "제주시 우도면",
    distance: "14.24km",
    difficulty: 3,
    tags: ["낭만", "일출"],
    imageUrl: "/images/a3.png",
    backgroundImage: "/images/a3.png",
  },
  {
    id: 4,
    trailName: "구름올레",
    location: "제주도 서귀포시",
    distance: "7.4km",
    difficulty: 0,
    tags: ["초급", "계곡", "숲길"],
    imageUrl: "/images/a2.png",
    backgroundImage: "/images/a3.png",
  },
  {
    id: 5,
    trailName: "한라봉올레",
    location: "제주도 서귀포시",
    distance: "8.2km",
    difficulty: 0,
    tags: ["중급", "오름", "해안길"],
    imageUrl: "/images/a2.png",
    backgroundImage: "/images/a1.png",
  },
  {
    id: 6,
    trailName: "땅콩올레",
    location: "제주도 서귀포시",
    distance: "9.1km",
    difficulty: 0,
    tags: ["상급", "산길", "절경"],
    imageUrl: "/images/a1.png",
    backgroundImage: "/images/a1.png",
  },
];

interface CardData {
  id: number;
  name: string;
  stamp: string;
  alternateStamp?: string;
  locked: boolean;
  difficulty: number;
}

const CARD_DATA: CardData[] = [
  {
    id: 1,
    name: "구름올레",
    stamp: "/images/g1.png",
    alternateStamp: "/images/signin/stamp1.svg",
    locked: false,
    difficulty: 1,
  },
  {
    id: 2,
    name: "한라봉올레",
    stamp: "/images/g2.png",
    locked: false,
    difficulty: 2,
  },
  {
    id: 3,
    name: "땅콩올레",
    stamp: "/images/signin/stamp3.svg",
    locked: false,
    difficulty: 3,
  },
  {
    id: 4,
    name: "구름올레",
    stamp: "/images/signin/stamp1.svg",
    locked: true,
    difficulty: 0,
  },
  {
    id: 5,
    name: "한라봉올레",
    stamp: "/images/signin/stamp2.svg",
    locked: true,
    difficulty: 0,
  },
  {
    id: 6,
    name: "땅콩올레",
    stamp: "/images/signin/stamp3.svg",
    locked: true,
    difficulty: 0,
  },
];

export default function StampTile() {
  const [stampData, setStampData] = useState<CardData[]>(CARD_DATA);

  useEffect(() => {
    // 초기 상태 설정
    if (isGoormComplete()) {
      setStampData((prevData) =>
        prevData.map((card) =>
          card.id === 1 && card.alternateStamp
            ? { ...card, stamp: card.alternateStamp }
            : card
        )
      );
    }

    // 로컬스토리지 변경 감지 함수
    const handleStorageChange = (e: StorageEvent) => {
      // goorm 관련 키가 변경되었을 때만 처리
      if (e.key && e.key.includes("goorm")) {
        if (isGoormComplete()) {
          setStampData((prevData) =>
            prevData.map((card) =>
              card.id === 1 && card.alternateStamp
                ? { ...card, stamp: card.alternateStamp }
                : card
            )
          );
        }
      }
    };

    // 이벤트 리스너 등록
    window.addEventListener("storage", handleStorageChange);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // 타일을 두 개씩 그룹화
  const groupedCards = stampData.reduce((acc, curr, i) => {
    if (i % 2 === 0) {
      acc.push([curr]);
    } else {
      acc[acc.length - 1].push(curr);
    }
    return acc;
  }, [] as CardData[][]);

  const getStampColor = (locked: boolean | null) => {
    if (locked === false) return "#EAFCF1"; // 성공 - 초록색 배경
    return "#CFCFCF"; // 비활성 또는 시도 안한 경우 - 회색
  };

  return (
    <div className="flex flex-col items-center bg-[#F6F6F6] p-[5%] mt-[20px] rounded-2xl">
      {/* Add development button - you can remove this in production */}

      <div className="flex flex-col w-full max-w-[400px] h-auto min-h-[581px]">
        {groupedCards.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex justify-center gap-[6%] mb-[15px] last:mb-0"
          >
            {row.map((card) => {
              const isActive = card.locked === false;
              const isInactiveWithLock = card.locked === true;
              const isInactiveNoLock = card.locked === null;

              if (isActive) {
                return (
                  <Dialog.Root key={card.id}>
                    <DialogTrigger asChild>
                      <div className="bg-white rounded-2xl flex flex-col items-center py-4 cursor-pointer w-[48%] min-h-[10rem] h-auto relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10"></div>
                        <div className="w-[70%] aspect-square rounded-full flex items-center justify-center mb-3">
                          <Image
                            src={card.stamp}
                            alt={card.name}
                            width={100}
                            height={100}
                            className="w-full h-full"
                          />
                        </div>
                        <span className="text-sm text-[#515151] text-center">
                          {card.name}
                        </span>
                      </div>
                    </DialogTrigger>
                    <Dialog.Portal>
                      <Dialog.Overlay className="fixed inset-0 bg-[#4A4A4A]/50 backdrop-blur-[20px]" />
                      <div className="fixed inset-0 flex items-center justify-center">
                        <div>
                          <div className="flex justify-center mt-8">
                            <DialogContent className="!border-none !rounded-none !bg-transparent !flex-row !items-center !shadow-none flex justify-center w-[85vw] max-w-md">
                              <div className="w-full p-3">
                                <VisuallyHidden>
                                  <DialogTitle>{card.name}</DialogTitle>
                                </VisuallyHidden>
                                <CardComponent
                                  trailName={
                                    MODAL_CARD_DATA[card.id - 1].trailName
                                  }
                                  location={
                                    MODAL_CARD_DATA[card.id - 1].location
                                  }
                                  distance={
                                    MODAL_CARD_DATA[card.id - 1].distance
                                  }
                                  difficulty={
                                    MODAL_CARD_DATA[card.id - 1].difficulty
                                  }
                                  tags={MODAL_CARD_DATA[card.id - 1].tags}
                                  imageUrl={
                                    MODAL_CARD_DATA[card.id - 1].imageUrl
                                  }
                                  size="small"
                                />
                              </div>
                            </DialogContent>
                            <Dialog.Close asChild>
                              <button
                                className="mt-[60vh] w-12 h-12 sm:w-16 sm:h-16 bg-[#4A4A4A] rounded-full flex items-center justify-center hover:bg-[#3A3A3A] transition-colors cursor-pointer"
                                aria-label="닫기"
                              >
                                <X
                                  className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                                  strokeWidth={2}
                                />
                              </button>
                            </Dialog.Close>
                          </div>
                        </div>
                      </div>
                    </Dialog.Portal>
                  </Dialog.Root>
                );
              }
              console.log(card.stamp);
              return (
                <div
                  key={card.id}
                  className="bg-white rounded-2xl flex flex-col items-center py-4 w-[48%] min-h-[10rem] h-auto"
                >
                  <div
                    className={`w-[70%] aspect-square rounded-full flex items-center justify-center mb-3`}
                    style={{ backgroundColor: getStampColor(card.locked) }}
                  >
                    {isInactiveWithLock ? (
                      <LockIcon size={40} color="#515151" />
                    ) : (
                      <Image
                        src={card.stamp}
                        alt={card.name}
                        width={100}
                        height={100}
                        className="w-full h-full opacity-50"
                      />
                    )}
                  </div>
                  <span className="text-sm text-[#515151] text-center">
                    {card.name}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
