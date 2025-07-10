"use client";

import React, { useState, useEffect } from "react";
import { CheckpointData } from "@/constants/mock-data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Script from "next/script";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import ImageCarousel from "./image-carousel";
import { Button } from "@vapor-ui/core";
import { ChevronLeftOutlineIcon } from "@vapor-ui/icons";
import { useRouter } from "next/navigation";

interface Route2CheckpointsProps {
  checkpoints: CheckpointData[];
}

// 위치 정보를 가져오는 훅
const useLocation = () => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    loading: true,
    error: null as string | null,
  });

  useEffect(() => {
    console.log(location);
  }, [location]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation((prev) => ({
        ...prev,
        loading: false,
        error: "Geolocation is not supported by this browser.",
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          loading: false,
          error: null,
        });
      },
      (error) => {
        setLocation((prev) => ({
          ...prev,
          loading: false,
          error: error.message,
        }));
      }
    );
  }, []);

  return location;
};

// Haversine 공식을 사용한 거리 계산 함수 (미터 단위)
const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371000; // 지구의 반지름 (미터)
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
};

// 10m 범위 내에 있는지 확인하는 함수
const isWithinRange = (
  userLat: number,
  userLon: number,
  targetLat: number,
  targetLon: number,
  rangeInMeters: number = 10
): boolean => {
  const distance = calculateDistance(userLat, userLon, targetLat, targetLon);
  return distance <= rangeInMeters;
};

const Route2Checkpoints = ({ checkpoints }: Route2CheckpointsProps) => {
  const isAllComplete = checkpoints.every(
    (checkpoint) => checkpoint.isComplete
  );
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<number | null>(
    null
  );
  const location = useLocation();
  const router = useRouter();

  const handleClickCheckpoint = (checkpoint: number) => {
    setSelectedCheckpoint(checkpoint);
    setIsOpen(true);
  };

  const checkLocation = (checkpoint: number) => {
    const { latitude, longitude } = checkpoints[checkpoint];

    if (location.loading) {
      console.log("위치 정보를 가져오는 중...");
      return false;
    }

    if (location.error) {
      console.error("위치 정보 오류:", location.error);
      return false;
    }

    const isNearby = isWithinRange(
      location.latitude,
      location.longitude,
      latitude,
      longitude,
      15 // 15미터 범위
    );

    const distance = calculateDistance(
      location.latitude,
      location.longitude,
      latitude,
      longitude
    );

    console.log(`거리: ${distance.toFixed(2)}m, 범위 내: ${isNearby}`);

    return isNearby;
  };

  return (
    <>
      <Script
        type="module"
        src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js"
      ></Script>
      <div className="relative w-full aspect-[440/956] mx-auto">
        <ChevronLeftOutlineIcon
          className="absolute top-4 left-4 z-20"
          size={35}
          onClick={() => {
            router.back();
          }}
        />
        <Image
          src="/route-map-2.svg"
          alt="route-2-map"
          fill
          className="absolute inset-0 w-full h-full"
        />
        {/** absolute inset-0 w-full h-full */}
        {/** isAllComplete && stroke-accent */}
        {/**            onClick={() => handleClickCheckpoint(0)}
            className={cn(
              "transition-all duration-300",
              checkpoints[0].isComplete && "fill-primary",
              !checkpoints[0].isComplete && "animate-pulse"
            )} */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="440"
          height="956"
          viewBox="0 0 440 956"
          fill="none"
          className="absolute inset-0 w-full h-full"
        >
          <path
            d="M206.562 352.656L206.268 351.185L206.268 351.185L206.562 352.656ZM351.608 438.004L353.078 437.71L353.078 437.71L351.608 438.004ZM336.573 514.994L335.305 514.193L334.915 514.81L335.16 515.498L336.573 514.994ZM334.164 564.116L335.528 564.742L335.528 564.742L334.164 564.116ZM252.515 596.822L251.889 598.186L251.889 598.186L252.515 596.822ZM227.717 575.189L228.981 574.381L228.52 573.661L227.665 573.69L227.717 575.189ZM105.446 487.186L103.975 487.479L103.975 487.479L105.446 487.186ZM206.562 352.656L206.856 354.127C274.179 340.676 338.198 378.545 350.137 438.298L351.608 438.004L353.078 437.71C340.755 376.029 274.895 337.474 206.268 351.185L206.562 352.656ZM351.608 438.004L350.137 438.298C355.475 465.02 349.53 491.667 335.305 514.193L336.573 514.994L337.842 515.795C352.438 492.681 358.582 465.257 353.078 437.71L351.608 438.004ZM336.573 514.994L335.16 515.498C340.458 530.364 340.097 547.582 332.801 563.491L334.164 564.116L335.528 564.742C343.154 548.113 343.543 530.085 337.986 514.491L336.573 514.994ZM334.164 564.116L332.801 563.491C318.434 594.816 282.734 609.032 253.14 595.459L252.515 596.822L251.889 598.186C283.119 612.509 320.531 597.439 335.528 564.742L334.164 564.116ZM252.515 596.822L253.14 595.459C242.904 590.764 234.721 583.358 228.981 574.381L227.717 575.189L226.453 575.998C232.49 585.438 241.107 593.24 251.889 598.186L252.515 596.822ZM227.717 575.189L227.665 573.69C169.105 575.701 117.513 539.923 106.917 486.892L105.446 487.186L103.975 487.479C114.91 542.209 168.019 578.74 227.768 576.689L227.717 575.189ZM105.446 487.186L106.917 486.892C94.979 427.139 139.532 367.578 206.856 354.127L206.562 352.656L206.268 351.185C137.641 364.897 91.6519 425.798 103.975 487.479L105.446 487.186Z"
            fill="rgba(0,0,0,0)"
            className={cn(
              "transition-all duration-300",
              isAllComplete && "fill-[#FD7563]"
            )}
          />
          <path
            d="M288.341 568.228C272.76 580.633 250.946 614.793 288.341 652.189C302.665 638.014 322.719 601.376 288.341 568.228Z"
            stroke="rgba(0,0,0,0)"
            strokeWidth="3"
            className={cn(
              "transition-all duration-300",
              isAllComplete && "stroke-[#FD7563]"
            )}
          />
          <circle
            cx="135.195"
            cy="393.426"
            r="25.4368"
            fill="white"
            stroke="#6E6E6E"
            onClick={() => handleClickCheckpoint(0)}
            strokeWidth="3"
            className={cn(
              "transition-all duration-300",
              checkpoints[0].isComplete && "stroke-[#FD7563]",
              !checkpoints[0].isComplete && "stroke-[#6E6E6E] animate-pulse"
            )}
          />
          <path
            d="M135.195 407.025C134.855 407.025 134.514 406.964 134.174 406.842C133.834 406.721 133.53 406.538 133.263 406.295C131.683 404.837 130.285 403.415 129.07 402.03C127.855 400.644 126.84 399.301 126.026 398.001C125.211 396.701 124.592 395.449 124.166 394.246C123.741 393.043 123.528 391.894 123.528 390.801C123.528 387.155 124.701 384.25 127.047 382.087C129.392 379.924 132.108 378.842 135.195 378.842C138.282 378.842 140.998 379.924 143.343 382.087C145.689 384.25 146.862 387.155 146.862 390.801C146.862 391.894 146.649 393.043 146.224 394.246C145.798 395.449 145.178 396.701 144.364 398.001C143.55 399.301 142.535 400.644 141.32 402.03C140.105 403.415 138.707 404.837 137.127 406.295C136.86 406.538 136.556 406.721 136.216 406.842C135.876 406.964 135.535 407.025 135.195 407.025ZM135.195 393.426C135.997 393.426 136.684 393.14 137.255 392.569C137.826 391.998 138.112 391.311 138.112 390.509C138.112 389.707 137.826 389.02 137.255 388.449C136.684 387.878 135.997 387.592 135.195 387.592C134.393 387.592 133.706 387.878 133.135 388.449C132.564 389.02 132.278 389.707 132.278 390.509C132.278 391.311 132.564 391.998 133.135 392.569C133.706 393.14 134.393 393.426 135.195 393.426Z"
            fill="#6E6E6E"
            onClick={() => handleClickCheckpoint(0)}
            className={cn(
              "transition-all duration-300",
              checkpoints[0].isComplete && "fill-[#FD7563]",
              !checkpoints[0].isComplete && "fill-[#6E6E6E] animate-pulse"
            )}
          />
          <circle
            cx="219.507"
            cy="575.165"
            r="25.4368"
            fill="white"
            stroke="#6E6E6E"
            strokeWidth="3"
            onClick={() => handleClickCheckpoint(1)}
            className={cn(
              "transition-all duration-300",
              checkpoints[0].isComplete && "stroke-[#FD7563]",
              !checkpoints[0].isComplete && "stroke-[#6E6E6E] animate-pulse"
            )}
          />
          <path
            d="M219.507 588.764C219.167 588.764 218.826 588.703 218.486 588.582C218.146 588.46 217.842 588.278 217.575 588.035C215.995 586.576 214.597 585.154 213.382 583.769C212.167 582.384 211.152 581.041 210.338 579.74C209.523 578.44 208.904 577.188 208.478 575.985C208.053 574.782 207.84 573.634 207.84 572.54C207.84 568.894 209.013 565.99 211.359 563.826C213.704 561.663 216.42 560.582 219.507 560.582C222.594 560.582 225.31 561.663 227.655 563.826C230.001 565.99 231.174 568.894 231.174 572.54C231.174 573.634 230.961 574.782 230.536 575.985C230.11 577.188 229.491 578.44 228.676 579.74C227.862 581.041 226.847 582.384 225.632 583.769C224.417 585.154 223.019 586.576 221.439 588.035C221.172 588.278 220.868 588.46 220.528 588.582C220.188 588.703 219.847 588.764 219.507 588.764ZM219.507 575.165C220.309 575.165 220.996 574.879 221.567 574.308C222.138 573.737 222.424 573.05 222.424 572.248C222.424 571.446 222.138 570.759 221.567 570.188C220.996 569.617 220.309 569.332 219.507 569.332C218.705 569.332 218.018 569.617 217.447 570.188C216.876 570.759 216.59 571.446 216.59 572.248C216.59 573.05 216.876 573.737 217.447 574.308C218.018 574.879 218.705 575.165 219.507 575.165Z"
            fill="#6E6E6E"
            onClick={() => handleClickCheckpoint(1)}
            className={cn(
              "transition-all duration-300",
              checkpoints[1].isComplete && "fill-[#FD7563]",
              !checkpoints[1].isComplete && "fill-[#6E6E6E] animate-pulse"
            )}
          />
          <circle
            cx="287.508"
            cy="587.519"
            r="25.4368"
            fill="white"
            stroke="#6E6E6E"
            strokeWidth="3"
            onClick={() => handleClickCheckpoint(2)}
            className={cn(
              "transition-all duration-300",
              checkpoints[2].isComplete && "stroke-[#FD7563]",
              !checkpoints[2].isComplete && "stroke-[#6E6E6E] animate-pulse"
            )}
          />
          <path
            d="M287.508 601.117C287.168 601.117 286.827 601.057 286.487 600.935C286.147 600.814 285.843 600.631 285.576 600.388C283.996 598.93 282.598 597.508 281.383 596.123C280.168 594.737 279.153 593.394 278.339 592.094C277.524 590.794 276.905 589.542 276.479 588.339C276.054 587.136 275.841 585.987 275.841 584.893C275.841 581.248 277.014 578.343 279.359 576.18C281.705 574.017 284.421 572.935 287.508 572.935C290.595 572.935 293.311 574.017 295.656 576.18C298.002 578.343 299.175 581.248 299.175 584.893C299.175 585.987 298.962 587.136 298.537 588.339C298.111 589.542 297.491 590.794 296.677 592.094C295.863 593.394 294.848 594.737 293.633 596.123C292.418 597.508 291.02 598.93 289.44 600.388C289.173 600.631 288.869 600.814 288.529 600.935C288.188 601.057 287.848 601.117 287.508 601.117ZM287.508 587.518C288.31 587.518 288.997 587.233 289.568 586.662C290.139 586.09 290.425 585.404 290.425 584.602C290.425 583.8 290.139 583.113 289.568 582.542C288.997 581.971 288.31 581.685 287.508 581.685C286.706 581.685 286.019 581.971 285.448 582.542C284.877 583.113 284.591 583.8 284.591 584.602C284.591 585.404 284.877 586.09 285.448 586.662C286.019 587.233 286.706 587.518 287.508 587.518Z"
            fill="#6E6E6E"
            onClick={() => handleClickCheckpoint(2)}
            className={cn(
              "transition-all duration-300",
              checkpoints[2].isComplete && "fill-[#FD7563]",
              !checkpoints[2].isComplete && "fill-[#6E6E6E] animate-pulse"
            )}
          />
          <circle
            cx="350.188"
            cy="402.863"
            r="25.4368"
            fill="white"
            stroke="#6E6E6E"
            strokeWidth="3"
            onClick={() => handleClickCheckpoint(3)}
            className={cn(
              "transition-all duration-300",
              checkpoints[2].isComplete && "stroke-[#FD7563]",
              !checkpoints[2].isComplete && "stroke-[#6E6E6E] animate-pulse"
            )}
          />
          <path
            d="M350.188 416.462C349.847 416.462 349.507 416.401 349.167 416.28C348.826 416.158 348.523 415.976 348.255 415.733C346.675 414.275 345.278 412.853 344.063 411.467C342.847 410.082 341.833 408.739 341.018 407.439C340.204 406.138 339.584 404.887 339.159 403.683C338.734 402.48 338.521 401.332 338.521 400.238C338.521 396.592 339.694 393.688 342.039 391.525C344.385 389.361 347.101 388.28 350.188 388.28C353.274 388.28 355.99 389.361 358.336 391.525C360.681 393.688 361.854 396.592 361.854 400.238C361.854 401.332 361.642 402.48 361.216 403.683C360.791 404.887 360.171 406.138 359.357 407.439C358.543 408.739 357.528 410.082 356.313 411.467C355.097 412.853 353.7 414.275 352.12 415.733C351.852 415.976 351.549 416.158 351.208 416.28C350.868 416.401 350.528 416.462 350.188 416.462ZM350.188 402.863C350.99 402.863 351.676 402.578 352.247 402.006C352.819 401.435 353.104 400.749 353.104 399.946C353.104 399.144 352.819 398.458 352.247 397.887C351.676 397.315 350.99 397.03 350.188 397.03C349.385 397.03 348.699 397.315 348.128 397.887C347.556 398.458 347.271 399.144 347.271 399.946C347.271 400.749 347.556 401.435 348.128 402.006C348.699 402.578 349.385 402.863 350.188 402.863Z"
            fill="#6E6E6E"
            onClick={() => handleClickCheckpoint(3)}
            className={cn(
              "transition-all duration-300",
              checkpoints[3].isComplete && "fill-[#FD7563]",
              !checkpoints[3].isComplete && "fill-[#6E6E6E] animate-pulse"
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
            <div className="h-4" />
            <DrawerHeader className="flex flex-col gap-1 items-start p-0">
              <DrawerTitle className="font-semibold text-[22px] leading-[28px]">
                {checkpoints[selectedCheckpoint].name}
              </DrawerTitle>
              <DrawerDescription className="text-[18px] text-[#919191]">
                {checkpoints[selectedCheckpoint].address}
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter className="p-0 flex flex-row justify-between py-4">
              {!checkLocation(selectedCheckpoint) ? (
                <>
                  <Button className="w-full border-2 border-primary bg-white text-primary text-[22px] font-semibold rounded-[20px] h-[68px]">
                    길찾기
                  </Button>
                  <Button
                    className="w-full bg-primary text-white text-[22px] font-semibold rounded-[20px] h-[68px] !disabled:bg-[#F6F6F6] !disabled:text-[#707070] ![data-state=disabled]:bg-[#F6F6F6] ![data-state=disabled]:text-[#707070]"
                    disabled
                  >
                    더가까이가세요
                  </Button>
                </>
              ) : (
                <>
                  <Button className="flex-1 border-2 border-primary bg-white text-primary text-[22px] font-semibold rounded-[20px] h-[68px]">
                    길찾기
                  </Button>
                  <div className="model-viewer h-[68px] w-full mx-auto flex-2">
                    <model-viewer
                      className="h-full w-full"
                      alt="3D Model"
                      src={
                        "https://cdn.advirtual.com/3d-viewer/jungbre-crested-gecko.glb"
                      }
                      ios-src={
                        "https://cdn.advirtual.com/3d-viewer/jungbre-crested-gecko.usdz"
                      }
                      ar
                      ar-scale="auto"
                      environment-image="neutral"
                      // tone-mapping="neutral"
                      // shadow-intensity="1"
                      camera-controls
                      autoplay
                      scale="0"
                      ar-modes="scene-viewer quick-look"
                      touch-action="pan-y"
                      id="my-model-viewer"
                    >
                      <button
                        slot="ar-button"
                        id="ar-button"
                        onClick={(e) => {
                          e.preventDefault();
                          alert("미션완료!");
                        }}
                        className="w-full bg-primary text-white text-[22px] font-semibold rounded-[20px] h-full"
                      >
                        미션완료하기
                      </button>
                    </model-viewer>
                  </div>
                </>
              )}
            </DrawerFooter>
          </DrawerContent>
        )}
      </Drawer>
    </>
  );
};

export default Route2Checkpoints;
