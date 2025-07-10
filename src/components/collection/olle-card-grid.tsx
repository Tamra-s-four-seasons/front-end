"use client";

import React from "react";
import { LockIcon } from "@vapor-ui/icons";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@vapor-ui/core";
// locked: true = 비활성+자물쇠, locked: false = 활성, locked: null = 비활성+자물쇠 없음
const CARD_DATA = [
  { id: 1, locked: true }, // 비활성+자물쇠
  { id: 2, locked: false }, // 활성
  { id: 3, locked: true }, // 비활성+자물쇠
  { id: 4, locked: null }, // 비활성+자물쇠 없음
  { id: 5, locked: false }, // 활성
  { id: 6, locked: true }, // 비활성+자물쇠
];

export default function OlleCardGrid() {
  return (
    <div className=" flex flex-col items-center  bg-[#F6F6F6]  p-[20px] mt-[20px] rounded-2xl ">
      <div className="grid grid-cols-2 grid-rows-3 gap-5 max-w-[440px] w-full px-2">
        {CARD_DATA.map((card) => {
          // 카드 상태별 스타일
          const isActive = card.locked === false;
          const isInactiveWithLock = card.locked === true;
          const isInactiveNoLock = card.locked === null;

          // 활성 카드만 Dialog로 감싸기
          if (isActive) {
            return (
              <Dialog.Root key={card.id}>
                <DialogTrigger asChild>
                  <div className="bg-white rounded-2xl flex flex-col items-center py-6  cursor-pointer">
                    <div className="w-24 h-24 rounded-full flex items-center justify-center mb-3 bg-[#EAFCF1]">
                      {/* 활성카드는 아이콘 없음 */}
                    </div>
                    <span className="text-sm text-[#515151] text-center">
                      구름 올레
                    </span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>구름 올레</DialogTitle>
                  <DialogDescription>
                    활성 카드의 상세 정보 또는 안내 문구를 여기에 넣으세요.
                  </DialogDescription>
                  <DialogClose asChild>
                    <button className="mt-4 px-4 py-2 bg-[#EAFCF1] rounded-xl text-[#222]">
                      닫기
                    </button>
                  </DialogClose>
                </DialogContent>
              </Dialog.Root>
            );
          }
          // 비활성 카드(자물쇠/없음)는 기존대로 렌더링
          return (
            <div
              key={card.id}
              className="bg-white rounded-2xl flex flex-col items-center py-6 "
            >
              <div
                className={`w-24 h-24 rounded-full flex items-center justify-center mb-3 ${
                  isInactiveWithLock || isInactiveNoLock ? "bg-[#CFCFCF]" : ""
                }`}
              >
                {isInactiveWithLock && <LockIcon size={40} color="#515151" />}
              </div>
              <span className="text-sm text-[#515151] text-center">
                구름 올레
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
