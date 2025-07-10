"use client";

import React from "react";
import { Star } from "lucide-react";
import { LockIcon } from "@vapor-ui/icons";

interface CardComponentProps {
  trailName: string;
  location: string;
  distance: string;
  difficulty: number;
  tags: string[];
  imageUrl?: string | null;
  size?: "normal" | "small" | "xsmall";
  isLocked?: boolean;
}

const CardComponent: React.FC<CardComponentProps> = ({
  trailName,
  location,
  distance,
  difficulty,
  tags,
  imageUrl,
  size = "normal",
  isLocked = false,
}) => {
  if (isLocked) {
    return (
      <div className="pt-[18%] flex flex-col bg-[#CCCCCC] rounded-2xl p-4 border-4 border-[#ADADAD] h-full">
        <div className="relative w-full rounded-xl overflow-hidden mb-4 aspect-square flex items-center justify-center bg-[#CCCCCC]">
          <div className="w-[40%] h-[40%] flex items-center justify-center">
            <style jsx>{`
              :global(.vapor-lock-icon) {
                --vapor-icon-width: 100% !important;
                --vapor-icon-height: 100% !important;
                width: 100% !important;
                height: 100% !important;
              }
            `}</style>
            <LockIcon className="vapor-lock-icon text-[#707070]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white rounded-2xl p-4 h-full">
      {/* Image Area */}
      <div
        className={`relative w-full rounded-xl overflow-hidden mb-4 border-2 border-[#ADADAD] 
       aspect-square
          bg-gray-200`}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={trailName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="67"
              viewBox="0 0 50 77"
              fill="none"
            >
              <path
                d="M32.7888 50.7498V51.9261C32.7888 54.1947 31.8645 55.6231 28.8396 55.6231H19.597C16.4041 55.6231 15.3958 53.9427 15.3958 51.2539V49.4894C15.3958 44.7841 17.8325 40.1628 22.3698 35.7935C26.655 31.6763 32.3686 27.7272 32.3686 21.9296C32.3686 17.3083 29.0917 14.9556 24.4704 15.4597C20.6893 15.8799 17.1603 18.1485 17.1603 24.2822C17.1603 26.971 16.152 28.8195 13.0432 28.8195H4.89284C2.12005 28.8195 0.439574 27.3911 0.439574 24.1982C0.35555 6.72125 14.8077 -0.420775 29.5118 1.09166C41.9474 2.35201 49.6776 10.1662 49.6776 21.0893C49.6776 28.6515 45.2243 34.2811 39.6787 39.4906C35.5616 43.3557 32.7888 46.1284 32.7888 50.7498ZM33.545 65.2019V71.1676C33.545 75.2847 32.1166 76.9652 27.6633 76.9652H21.0254C16.5722 76.9652 15.1438 75.2847 15.1438 71.1676V65.2019C15.1438 61.0847 16.5722 59.4042 21.0254 59.4042H27.6633C32.1166 59.4042 33.545 61.0847 33.545 65.2019Z"
                fill="#707070"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1">
        {/* Title */}
        <div className="flex items-center justify-between">
          <h3 className="font-bold truncate text-m">{trailName}</h3>

          <div className="flex items-center ">
            {[...Array(3)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < difficulty
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300  fill-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Location & Distance */}
        <p className="text-xs text-gray-500 mt-1">
          {location} · {distance}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-[#EAFCF1] text-[#2DDE72] text-xs font-medium px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
