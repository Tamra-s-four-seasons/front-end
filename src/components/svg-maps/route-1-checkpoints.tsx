"use client";

import React, { useState } from "react";
import { CheckpointData } from "@/constants/mock-data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import ImageCarousel from "./image-carousel";

interface Route1CheckpointsProps {
  checkpoints: CheckpointData[];
}

const Route1Checkpoints = ({ checkpoints }: Route1CheckpointsProps) => {
  const isAllComplete = checkpoints.every(
    (checkpoint) => checkpoint.isComplete
  );
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<number | null>(
    null
  );

  const handleClickCheckpoint = (checkpoint: number) => {
    setSelectedCheckpoint(checkpoint);
    setIsOpen(true);
  };

  return (
    <>
      <div className="relative w-full aspect-[416/626] mx-auto">
        <Image
          src="/route-1-map.png"
          alt="route-1-map"
          width={416}
          height={626}
          className="absolute inset-0 w-full"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="416"
          height="626"
          viewBox="0 0 416 626"
          fill="none"
          className="absolute inset-0 w-full h-full"
        >
          <path
            d="M133 253C150.167 217.667 200.6 158.1 291 208.5"
            stroke="#C4C4C4"
            strokeWidth="4"
            className={cn(
              "transition-all duration-300",
              isAllComplete && "stroke-primary"
            )}
          />
          <path
            d="M263.5 430.5C295.167 398.333 349.3 320.8 308.5 246"
            stroke="#C4C4C4"
            strokeWidth="4"
            className={cn(
              "transition-all duration-300",
              isAllComplete && "stroke-primary"
            )}
          />
          <path
            d="M127 285.433C126.689 285.433 126.378 285.378 126.067 285.267C125.756 285.156 125.478 284.989 125.233 284.767C123.789 283.433 122.511 282.133 121.4 280.867C120.289 279.6 119.361 278.372 118.617 277.183C117.872 275.995 117.306 274.85 116.917 273.75C116.528 272.65 116.333 271.6 116.333 270.6C116.333 267.267 117.406 264.611 119.55 262.633C121.694 260.656 124.178 259.667 127 259.667C129.822 259.667 132.306 260.656 134.45 262.633C136.594 264.611 137.667 267.267 137.667 270.6C137.667 271.6 137.472 272.65 137.083 273.75C136.694 274.85 136.128 275.995 135.383 277.183C134.639 278.372 133.711 279.6 132.6 280.867C131.489 282.133 130.211 283.433 128.767 284.767C128.522 284.989 128.244 285.156 127.933 285.267C127.622 285.378 127.311 285.433 127 285.433ZM127 273C127.733 273 128.361 272.739 128.883 272.217C129.406 271.695 129.667 271.067 129.667 270.333C129.667 269.6 129.406 268.972 128.883 268.45C128.361 267.928 127.733 267.667 127 267.667C126.267 267.667 125.639 267.928 125.117 268.45C124.594 268.972 124.333 269.6 124.333 270.333C124.333 271.067 124.594 271.695 125.117 272.217C125.639 272.739 126.267 273 127 273Z"
            fill="#C4C4C4"
            onClick={() => handleClickCheckpoint(0)}
            className={cn(
              "transition-all duration-300",
              checkpoints[0].isComplete && "fill-primary",
              !checkpoints[0].isComplete && "animate-pulse"
            )}
          />
          <path
            d="M300 238.433C299.689 238.433 299.378 238.378 299.067 238.267C298.756 238.156 298.478 237.989 298.233 237.767C296.789 236.433 295.511 235.133 294.4 233.867C293.289 232.6 292.361 231.372 291.617 230.183C290.872 228.995 290.306 227.85 289.917 226.75C289.528 225.65 289.333 224.6 289.333 223.6C289.333 220.267 290.406 217.611 292.55 215.633C294.694 213.656 297.178 212.667 300 212.667C302.822 212.667 305.306 213.656 307.45 215.633C309.594 217.611 310.667 220.267 310.667 223.6C310.667 224.6 310.472 225.65 310.083 226.75C309.694 227.85 309.128 228.995 308.383 230.183C307.639 231.372 306.711 232.6 305.6 233.867C304.489 235.133 303.211 236.433 301.767 237.767C301.522 237.989 301.244 238.156 300.933 238.267C300.622 238.378 300.311 238.433 300 238.433ZM300 226C300.733 226 301.361 225.739 301.883 225.217C302.406 224.695 302.667 224.067 302.667 223.333C302.667 222.6 302.406 221.972 301.883 221.45C301.361 220.928 300.733 220.667 300 220.667C299.267 220.667 298.639 220.928 298.117 221.45C297.594 221.972 297.333 222.6 297.333 223.333C297.333 224.067 297.594 224.695 298.117 225.217C298.639 225.739 299.267 226 300 226Z"
            fill="#C4C4C4"
            onClick={() => handleClickCheckpoint(1)}
            className={cn(
              "transition-all duration-300",
              checkpoints[1].isComplete && "fill-primary",
              !checkpoints[1].isComplete && "animate-pulse"
            )}
          />
          <path
            d="M244 450.433C243.689 450.433 243.378 450.378 243.067 450.267C242.756 450.156 242.478 449.989 242.233 449.767C240.789 448.433 239.511 447.133 238.4 445.867C237.289 444.6 236.361 443.372 235.617 442.183C234.872 440.995 234.306 439.85 233.917 438.75C233.528 437.65 233.333 436.6 233.333 435.6C233.333 432.267 234.406 429.611 236.55 427.633C238.694 425.656 241.178 424.667 244 424.667C246.822 424.667 249.306 425.656 251.45 427.633C253.594 429.611 254.667 432.267 254.667 435.6C254.667 436.6 254.472 437.65 254.083 438.75C253.694 439.85 253.128 440.995 252.383 442.183C251.639 443.372 250.711 444.6 249.6 445.867C248.489 447.133 247.211 448.433 245.767 449.767C245.522 449.989 245.244 450.156 244.933 450.267C244.622 450.378 244.311 450.433 244 450.433ZM244 438C244.733 438 245.361 437.739 245.883 437.217C246.406 436.695 246.667 436.067 246.667 435.333C246.667 434.6 246.406 433.972 245.883 433.45C245.361 432.928 244.733 432.667 244 432.667C243.267 432.667 242.639 432.928 242.117 433.45C241.594 433.972 241.333 434.6 241.333 435.333C241.333 436.067 241.594 436.695 242.117 437.217C242.639 437.739 243.267 438 244 438Z"
            fill="#C4C4C4"
            onClick={() => handleClickCheckpoint(2)}
            className={cn(
              "transition-all duration-300",
              checkpoints[2].isComplete && "fill-primary",
              !checkpoints[2].isComplete && "animate-pulse"
            )}
          />
          <path
            d="M129 295.5C124.333 335.167 137.1 417.6 225.5 430"
            stroke="#C4C4C4"
            strokeWidth="4"
            className={cn(
              "transition-all duration-300",
              isAllComplete && "stroke-primary"
            )}
          />
        </svg>
      </div>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        {selectedCheckpoint !== null && (
          <DrawerContent className="max-w-[440px] mx-auto !rounded-t-[30px] !border-t-[0px] bg-white px-5">
            <div className="h-8" />
            <ImageCarousel
              imageUrls={checkpoints[selectedCheckpoint].imgUrls}
            />
            <DrawerHeader>
              <DrawerTitle>{checkpoints[selectedCheckpoint].name}</DrawerTitle>
              <DrawerDescription>
                {checkpoints[selectedCheckpoint].description}
              </DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        )}
      </Drawer>
    </>
  );
};

export default Route1Checkpoints;
