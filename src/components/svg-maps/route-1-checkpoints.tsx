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
import { setGoormComplete } from "@/lib/localStorage";
import { toast } from "sonner";

const MODELS = [
  [
    "https://cdn.advirtual.com/3d-viewer/jungbre-crested-gecko.glb",
    "https://cdn.advirtual.com/3d-viewer/jungbre-crested-gecko.usdz",
  ],
  [
    "https://cdn.advirtual.com/3d-viewer/KMU_Hechi.glb",
    "https://cdn.advirtual.com/3d-viewer/KMU_Hechi.usdz",
  ],
  [
    "https://cdn.advirtual.com/3d-viewer/jungbre-chameleon.glb",
    "https://cdn.advirtual.com/3d-viewer/jungbre-chameleon.usdz",
  ],
];

// const NAVIGATION_URLS = [
//   "https://map.naver.com/p/directions/-/14128516.4288837,3955185.878391,%EC%A0%9C%EC%A3%BC%20%EC%84%9C%EA%B7%80%ED%8F%AC%EC%8B%9C%20%EB%8F%99%EB%A5%98%EC%95%94%EB%A1%9C%2020,,SIMPLE_POI/-/transit?c=18.00,0,0,0,dh",
// ];

interface Route1CheckpointsProps {
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

const Route1Checkpoints = ({ checkpoints }: Route1CheckpointsProps) => {
  const [localCheckpoints, setLocalCheckpoints] =
    useState<CheckpointData[]>(checkpoints);
  const isAllComplete = localCheckpoints.every(
    (checkpoint) => checkpoint.isComplete
  );
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<number | null>(
    null
  );

  const location = useLocation();
  const router = useRouter();

  useEffect(() => {
    if (isAllComplete) {
      toast.success("지도가 완성되었어요!", {
        action: {
          label: "확인하기",
          onClick: () => {
            router.push("/collection");
          },
        },
        duration: 50000,
        position: "top-center",
      });
    }
  }, [isAllComplete, router]);

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
      30 // 30미터 범위
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
          src="/route-map-1.svg"
          alt="route-1-map"
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
            d="M112.013 567.488L189.546 343.843"
            stroke="rgba(0,0,0,0)"
            strokeWidth="3"
            strokeLinecap="round"
            className={cn(
              "transition-all duration-300",
              isAllComplete && "stroke-[#FD7563]"
            )}
          />
          <path
            d="M112.305 567.488L362.694 512.89"
            stroke="rgba(0,0,0,0)"
            strokeWidth="3"
            strokeLinecap="round"
            className={cn(
              "transition-all duration-300",
              isAllComplete && "stroke-[#FD7563]"
            )}
          />
          <path
            d="M189.547 343.844L362.596 512.858"
            stroke="rgba(0,0,0,0)"
            strokeWidth="3"
            strokeLinecap="round"
            className={cn(
              "transition-all duration-300",
              isAllComplete && "stroke-[#FD7563]"
            )}
          />
          <circle
            cx="110.705"
            cy="569.745"
            r="25.4368"
            fill="white"
            stroke="#6E6E6E"
            strokeWidth="3"
            onClick={() => handleClickCheckpoint(0)}
            className={cn(
              "transition-all duration-300",
              localCheckpoints[0].isComplete && "stroke-[#FD7563]",
              !localCheckpoints[0].isComplete &&
                "stroke-[#6E6E6E] animate-pulse"
            )}
          />
          <path
            d="M110.705 583.344C110.365 583.344 110.025 583.283 109.684 583.162C109.344 583.04 109.04 582.858 108.773 582.615C107.193 581.157 105.795 579.735 104.58 578.349C103.365 576.964 102.35 575.621 101.536 574.321C100.722 573.02 100.102 571.769 99.6764 570.566C99.2511 569.362 99.0384 568.214 99.0384 567.12C99.0384 563.474 100.211 560.57 102.557 558.407C104.902 556.243 107.618 555.162 110.705 555.162C113.792 555.162 116.508 556.243 118.853 558.407C121.199 560.57 122.372 563.474 122.372 567.12C122.372 568.214 122.159 569.362 121.734 570.566C121.308 571.769 120.689 573.02 119.874 574.321C119.06 575.621 118.045 576.964 116.83 578.349C115.615 579.735 114.217 581.157 112.637 582.615C112.37 582.858 112.066 583.04 111.726 583.162C111.386 583.283 111.045 583.344 110.705 583.344ZM110.705 569.745C111.507 569.745 112.194 569.46 112.765 568.888C113.336 568.317 113.622 567.631 113.622 566.829C113.622 566.026 113.336 565.34 112.765 564.769C112.194 564.197 111.507 563.912 110.705 563.912C109.903 563.912 109.216 564.197 108.645 564.769C108.074 565.34 107.788 566.026 107.788 566.829C107.788 567.631 108.074 568.317 108.645 568.888C109.216 569.46 109.903 569.745 110.705 569.745Z"
            fill="#6E6E6E"
            onClick={() => handleClickCheckpoint(0)}
            className={cn(
              "transition-all duration-300",
              localCheckpoints[0].isComplete && "fill-[#FD7563]",
              !localCheckpoints[0].isComplete && "fill-[#6E6E6E] animate-pulse"
            )}
          />
          <circle
            cx="188.238"
            cy="346.227"
            r="25.4368"
            fill="white"
            stroke="#6E6E6E"
            strokeWidth="3"
            onClick={() => handleClickCheckpoint(1)}
            className={cn(
              "transition-all duration-300",
              localCheckpoints[1].isComplete && "stroke-[#FD7563]",
              !localCheckpoints[1].isComplete &&
                "stroke-[#6E6E6E] animate-pulse"
            )}
          />
          <path
            d="M188.237 359.826C187.897 359.826 187.557 359.765 187.216 359.644C186.876 359.522 186.572 359.34 186.305 359.097C184.725 357.639 183.328 356.217 182.112 354.831C180.897 353.446 179.882 352.103 179.068 350.803C178.254 349.502 177.634 348.251 177.209 347.047C176.783 345.844 176.571 344.696 176.571 343.602C176.571 339.956 177.743 337.052 180.089 334.889C182.434 332.725 185.15 331.644 188.237 331.644C191.324 331.644 194.04 332.725 196.386 334.889C198.731 337.052 199.904 339.956 199.904 343.602C199.904 344.696 199.691 345.844 199.266 347.047C198.841 348.251 198.221 349.502 197.407 350.803C196.592 352.103 195.578 353.446 194.362 354.831C193.147 356.217 191.749 357.639 190.17 359.097C189.902 359.34 189.598 359.522 189.258 359.644C188.918 359.765 188.578 359.826 188.237 359.826ZM188.237 346.227C189.039 346.227 189.726 345.942 190.297 345.37C190.868 344.799 191.154 344.113 191.154 343.31C191.154 342.508 190.868 341.822 190.297 341.251C189.726 340.679 189.039 340.394 188.237 340.394C187.435 340.394 186.749 340.679 186.177 341.251C185.606 341.822 185.321 342.508 185.321 343.31C185.321 344.113 185.606 344.799 186.177 345.37C186.749 345.942 187.435 346.227 188.237 346.227Z"
            fill="#6E6E6E"
            onClick={() => handleClickCheckpoint(1)}
            className={cn(
              "transition-all duration-300",
              localCheckpoints[1].isComplete && "fill-[#FD7563]",
              !localCheckpoints[1].isComplete && "fill-[#6E6E6E] animate-pulse"
            )}
          />
          <circle
            cx="361.625"
            cy="515.872"
            r="25.4368"
            fill="white"
            stroke="#6E6E6E"
            strokeWidth="3"
            onClick={() => handleClickCheckpoint(2)}
            className={cn(
              "transition-all duration-300",
              localCheckpoints[2].isComplete && "stroke-[#FD7563]",
              !localCheckpoints[2].isComplete &&
                "stroke-[#6E6E6E] animate-pulse"
            )}
          />
          <path
            d="M361.625 529.471C361.284 529.471 360.944 529.41 360.604 529.288C360.263 529.167 359.96 528.985 359.692 528.741C358.112 527.283 356.715 525.861 355.5 524.476C354.284 523.09 353.269 521.748 352.455 520.447C351.641 519.147 351.021 517.895 350.596 516.692C350.171 515.489 349.958 514.34 349.958 513.247C349.958 509.601 351.131 506.696 353.476 504.533C355.822 502.37 358.538 501.288 361.625 501.288C364.711 501.288 367.427 502.37 369.773 504.533C372.118 506.696 373.291 509.601 373.291 513.247C373.291 514.34 373.079 515.489 372.653 516.692C372.228 517.895 371.608 519.147 370.794 520.447C369.98 521.748 368.965 523.09 367.75 524.476C366.534 525.861 365.137 527.283 363.557 528.741C363.289 528.985 362.986 529.167 362.645 529.288C362.305 529.41 361.965 529.471 361.625 529.471ZM361.625 515.872C362.427 515.872 363.113 515.586 363.684 515.015C364.256 514.444 364.541 513.757 364.541 512.955C364.541 512.153 364.256 511.466 363.684 510.895C363.113 510.324 362.427 510.038 361.625 510.038C360.822 510.038 360.136 510.324 359.565 510.895C358.993 511.466 358.708 512.153 358.708 512.955C358.708 513.757 358.993 514.444 359.565 515.015C360.136 515.586 360.822 515.872 361.625 515.872Z"
            fill="#6E6E6E"
            onClick={() => handleClickCheckpoint(2)}
            className={cn(
              "transition-all duration-300",
              localCheckpoints[2].isComplete && "fill-[#FD7563]",
              !localCheckpoints[2].isComplete && "fill-[#6E6E6E] animate-pulse"
            )}
          />
        </svg>
      </div>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        {selectedCheckpoint !== null && (
          <DrawerContent className="max-w-[440px] mx-auto !rounded-t-[30px] !border-t-[0px] bg-white px-5">
            <div className="h-8" />
            <ImageCarousel
              imageUrls={localCheckpoints[selectedCheckpoint].imgUrls}
            />
            <div className="h-4" />
            <DrawerHeader className="flex flex-col gap-1 items-start p-0">
              <DrawerTitle className="font-semibold text-[22px] leading-[28px]">
                {localCheckpoints[selectedCheckpoint].name}
              </DrawerTitle>
              <DrawerDescription className="text-[18px] text-[#919191]">
                {localCheckpoints[selectedCheckpoint].address}
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter className="p-0 flex flex-row justify-between py-4">
              {!checkLocation(selectedCheckpoint) ? (
                <>
                  <Button
                    onClick={() => {
                      router.push(
                        "https://map.naver.com/p/directions/-/14128516.4288837,3955185.878391,%EC%A0%9C%EC%A3%BC%20%EC%84%9C%EA%B7%80%ED%8F%AC%EC%8B%9C%20%EB%8F%99%EB%A5%98%EC%95%94%EB%A1%9C%2020,,SIMPLE_POI/-/transit?c=18.00,0,0,0,dh"
                      );
                    }}
                    className="flex-1 w-full border-2 border-primary bg-white text-primary text-[22px] font-semibold rounded-[20px] h-[68px]"
                  >
                    길찾기
                  </Button>
                  <Button
                    className="flex-2 w-full bg-primary text-white text-[22px] font-semibold rounded-[20px] h-[68px] !disabled:bg-[#F6F6F6] !disabled:text-[#707070] ![data-state=disabled]:bg-[#F6F6F6] ![data-state=disabled]:text-[#707070]"
                    disabled
                  >
                    미션완료하기
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      router.push(
                        "https://map.naver.com/p/directions/-/14128516.4288837,3955185.878391,%EC%A0%9C%EC%A3%BC%20%EC%84%9C%EA%B7%80%ED%8F%AC%EC%8B%9C%20%EB%8F%99%EB%A5%98%EC%95%94%EB%A1%9C%2020,,SIMPLE_POI/-/transit?c=18.00,0,0,0,dh"
                      );
                    }}
                    className="flex-1 border-2 border-primary bg-white text-primary text-[22px] font-semibold rounded-[20px] h-[68px]"
                  >
                    길찾기
                  </Button>
                  <div className="model-viewer h-[68px] w-full mx-auto flex-2">
                    <model-viewer
                      className="h-full w-full"
                      alt="3D Model"
                      // src={
                      //   "https://cdn.advirtual.com/3d-viewer/jungbre-crested-gecko.glb"
                      // }
                      src={MODELS[selectedCheckpoint][0]}
                      ios-src={MODELS[selectedCheckpoint][1]}
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
                          setLocalCheckpoints((prev) =>
                            prev.map((checkpoint, index) =>
                              index === selectedCheckpoint
                                ? { ...checkpoint, isComplete: true }
                                : checkpoint
                            )
                          );
                          setGoormComplete();
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

export default Route1Checkpoints;
