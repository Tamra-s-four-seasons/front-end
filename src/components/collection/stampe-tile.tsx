"use client";

import React from "react";
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

// Mock data for modal card
const MODAL_CARD_DATA = {
  trailName: "구름 올레",
  location: "제주도 서귀포시",
  distance: "7.4km",
  difficulty: 3,
  tags: ["중급", "계곡", "숲길"],
  imageUrl: "/images/asset-0.png",
  backgroundImage: "/images/asset-0.png",
};

// locked: true = 비활성+자물쇠, locked: false = 활성, locked: null = 비활성+자물쇠 없음
const CARD_DATA = [
  {
    id: 1,
    name: "구름올레",
    stamp: "/images/signin/stamp1.svg",
    locked: false,
  },
  {
    id: 2,
    name: "한라봉올레",
    stamp: "/images/signin/stamp2.svg",
    locked: true,
  },
  { id: 3, name: "땅콩올레", stamp: "/images/signin/stamp3.svg", locked: null },
  { id: 4, name: "구름올레", stamp: "/images/signin/stamp1.svg", locked: true },
  {
    id: 5,
    name: "한라봉올레",
    stamp: "/images/signin/stamp2.svg",
    locked: false,
  },
  { id: 6, name: "땅콩올레", stamp: "/images/signin/stamp3.svg", locked: true },
];

export default function StampTile() {
  // 타일을 두 개씩 그룹화
  const groupedCards = CARD_DATA.reduce((acc, curr, i) => {
    if (i % 2 === 0) {
      acc.push([curr]);
    } else {
      acc[acc.length - 1].push(curr);
    }
    return acc;
  }, [] as Array<typeof CARD_DATA>);

  const getStampColor = (locked: boolean | null) => {
    if (locked === false) return "#EAFCF1"; // 성공 - 초록색 배경
    return "#CFCFCF"; // 비활성 또는 시도 안한 경우 - 회색
  };

  return (
    <div className="flex flex-col items-center bg-[#F6F6F6] p-[5%] mt-[20px] rounded-2xl">
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
                        <div className="absolute inset-0 opacity-10">
                          <Image
                            src="/images/asset-0.png"
                            alt="Route Map"
                            layout="fill"
                            objectFit="cover"
                            priority
                          />
                        </div>
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
                                  trailName={MODAL_CARD_DATA.trailName}
                                  location={MODAL_CARD_DATA.location}
                                  distance={MODAL_CARD_DATA.distance}
                                  difficulty={MODAL_CARD_DATA.difficulty}
                                  tags={MODAL_CARD_DATA.tags}
                                  imageUrl={MODAL_CARD_DATA.imageUrl}
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
