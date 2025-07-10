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

interface Route3CheckpointsProps {
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

const Route3Checkpoints = ({ checkpoints }: Route3CheckpointsProps) => {
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
          src="/route-map-3.svg"
          alt="route-3-map"
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
            d="M147.739 330.09L146.245 329.954L146.245 329.954L147.739 330.09ZM214.25 274.659L214.386 273.165L214.386 273.165L214.25 274.659ZM269.681 341.17L271.175 341.306L271.175 341.306L269.681 341.17ZM259.285 370.15L258.047 369.304L257.042 370.772L258.659 371.514L259.285 370.15ZM327.75 498.981L329.244 499.117L329.244 499.117L327.75 498.981ZM202.403 616.131L202.267 617.625L202.267 617.625L202.403 616.131ZM100.224 478.308L98.7303 478.172L100.224 478.308ZM162.409 375.683L163.17 376.975L164.72 376.062L163.543 374.701L162.409 375.683ZM147.739 330.09L149.233 330.226C152.218 297.378 181.267 273.168 214.115 276.153L214.25 274.659L214.386 273.165C179.888 270.031 149.38 295.456 146.245 329.954L147.739 330.09ZM214.25 274.659L214.115 276.153C246.963 279.138 271.172 308.186 268.187 341.034L269.681 341.17L271.175 341.306C274.309 306.808 248.884 276.3 214.386 273.165L214.25 274.659ZM269.681 341.17L268.187 341.034C267.232 351.547 263.608 361.171 258.047 369.304L259.285 370.15L260.523 370.997C266.366 362.453 270.172 352.342 271.175 341.306L269.681 341.17ZM259.285 370.15L258.659 371.514C302.632 391.694 331.388 442.372 326.257 498.846L327.75 498.981L329.244 499.117C334.478 441.521 305.165 389.556 259.91 368.787L259.285 370.15ZM327.75 498.981L326.257 498.846C319.919 568.594 264.388 620.257 202.539 614.637L202.403 616.131L202.267 617.625C266.077 623.423 322.787 570.187 329.244 499.117L327.75 498.981ZM202.403 616.131L202.539 614.637C140.69 609.017 95.3803 548.191 101.718 478.443L100.224 478.308L98.7303 478.172C92.2726 549.241 138.457 611.826 202.267 617.625L202.403 616.131ZM100.224 478.308L101.718 478.443C105.774 433.802 130.016 396.516 163.17 376.975L162.409 375.683L161.647 374.39C127.618 394.447 102.869 432.62 98.7303 478.172L100.224 478.308ZM162.409 375.683L163.543 374.701C153.304 362.862 147.705 347.043 149.233 330.226L147.739 330.09L146.245 329.954C144.64 347.616 150.524 364.234 161.274 376.664L162.409 375.683Z"
            fill="rgba(0,0,0,0)"
            className={cn(
              "transition-all duration-300",
              isAllComplete && "fill-[#FD7563]"
            )}
          />
          <circle
            cx="259.863"
            cy="368.567"
            r="25.4368"
            fill="white"
            stroke="#6E6E6E"
            strokeWidth="3"
            onClick={() => handleClickCheckpoint(0)}
            className={cn(
              "transition-all duration-300",
              checkpoints[0].isComplete && "stroke-[#FD7563]",
              !checkpoints[0].isComplete && "stroke-[#6E6E6E] animate-pulse"
            )}
          />
          <path
            d="M259.862 382.166C259.522 382.166 259.182 382.105 258.842 381.984C258.501 381.862 258.198 381.68 257.93 381.437C256.35 379.979 254.953 378.557 253.737 377.171C252.522 375.786 251.507 374.443 250.693 373.143C249.879 371.842 249.259 370.591 248.834 369.388C248.408 368.184 248.196 367.036 248.196 365.942C248.196 362.296 249.369 359.392 251.714 357.229C254.06 355.065 256.776 353.984 259.862 353.984C262.949 353.984 265.665 355.065 268.011 357.229C270.356 359.392 271.529 362.296 271.529 365.942C271.529 367.036 271.316 368.184 270.891 369.388C270.466 370.591 269.846 371.842 269.032 373.143C268.218 374.443 267.203 375.786 265.987 377.171C264.772 378.557 263.375 379.979 261.795 381.437C261.527 381.68 261.224 381.862 260.883 381.984C260.543 382.105 260.203 382.166 259.862 382.166ZM259.862 368.567C260.665 368.567 261.351 368.282 261.922 367.71C262.494 367.139 262.779 366.453 262.779 365.651C262.779 364.848 262.494 364.162 261.922 363.591C261.351 363.019 260.665 362.734 259.862 362.734C259.06 362.734 258.374 363.019 257.803 363.591C257.231 364.162 256.946 364.848 256.946 365.651C256.946 366.453 257.231 367.139 257.803 367.71C258.374 368.282 259.06 368.567 259.862 368.567Z"
            fill="#6E6E6E"
            onClick={() => handleClickCheckpoint(0)}
            className={cn(
              "transition-all duration-300",
              checkpoints[0].isComplete && "fill-[#FD7563]",
              !checkpoints[0].isComplete && "fill-[#6E6E6E] animate-pulse"
            )}
          />
          <circle
            cx="240.156"
            cy="614.064"
            r="25.4368"
            fill="white"
            stroke="#6E6E6E"
            strokeWidth="3"
            onClick={() => handleClickCheckpoint(1)}
            className={cn(
              "transition-all duration-300",
              checkpoints[1].isComplete && "stroke-[#FD7563]",
              !checkpoints[1].isComplete && "stroke-[#6E6E6E] animate-pulse"
            )}
          />
          <path
            d="M240.156 627.663C239.816 627.663 239.476 627.602 239.136 627.48C238.795 627.359 238.491 627.177 238.224 626.934C236.644 625.475 235.247 624.053 234.031 622.668C232.816 621.283 231.801 619.94 230.987 618.639C230.173 617.339 229.553 616.087 229.128 614.884C228.702 613.681 228.49 612.533 228.49 611.439C228.49 607.793 229.662 604.888 232.008 602.725C234.353 600.562 237.07 599.48 240.156 599.48C243.243 599.48 245.959 600.562 248.305 602.725C250.65 604.888 251.823 607.793 251.823 611.439C251.823 612.533 251.61 613.681 251.185 614.884C250.76 616.087 250.14 617.339 249.326 618.639C248.511 619.94 247.497 621.283 246.281 622.668C245.066 624.053 243.669 625.475 242.089 626.934C241.821 627.177 241.518 627.359 241.177 627.48C240.837 627.602 240.497 627.663 240.156 627.663ZM240.156 614.064C240.958 614.064 241.645 613.778 242.216 613.207C242.787 612.636 243.073 611.949 243.073 611.147C243.073 610.345 242.787 609.658 242.216 609.087C241.645 608.516 240.958 608.23 240.156 608.23C239.354 608.23 238.668 608.516 238.097 609.087C237.525 609.658 237.24 610.345 237.24 611.147C237.24 611.949 237.525 612.636 238.097 613.207C238.668 613.778 239.354 614.064 240.156 614.064Z"
            fill="#6E6E6E"
            onClick={() => handleClickCheckpoint(1)}
            className={cn(
              "transition-all duration-300",
              checkpoints[1].isComplete && "fill-[#FD7563]",
              !checkpoints[1].isComplete && "fill-[#6E6E6E] animate-pulse"
            )}
          />
          <circle
            cx="314.913"
            cy="539.111"
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
            d="M314.913 552.71C314.572 552.71 314.232 552.649 313.892 552.527C313.552 552.406 313.248 552.224 312.98 551.98C311.401 550.522 310.003 549.1 308.788 547.715C307.572 546.329 306.558 544.987 305.743 543.686C304.929 542.386 304.309 541.134 303.884 539.931C303.459 538.728 303.246 537.579 303.246 536.486C303.246 532.84 304.419 529.935 306.764 527.772C309.11 525.609 311.826 524.527 314.913 524.527C318 524.527 320.716 525.609 323.061 527.772C325.407 529.935 326.579 532.84 326.579 536.486C326.579 537.579 326.367 538.728 325.941 539.931C325.516 541.134 324.896 542.386 324.082 543.686C323.268 544.987 322.253 546.329 321.038 547.715C319.822 549.1 318.425 550.522 316.845 551.98C316.578 552.224 316.274 552.406 315.934 552.527C315.593 552.649 315.253 552.71 314.913 552.71ZM314.913 539.111C315.715 539.111 316.401 538.825 316.973 538.254C317.544 537.683 317.829 536.996 317.829 536.194C317.829 535.392 317.544 534.705 316.973 534.134C316.401 533.563 315.715 533.277 314.913 533.277C314.111 533.277 313.424 533.563 312.853 534.134C312.282 534.705 311.996 535.392 311.996 536.194C311.996 536.996 312.282 537.683 312.853 538.254C313.424 538.825 314.111 539.111 314.913 539.111Z"
            fill="#6E6E6E"
            onClick={() => handleClickCheckpoint(2)}
            className={cn(
              "transition-all duration-300",
              checkpoints[2].isComplete && "fill-[#FD7563]",
              !checkpoints[2].isComplete && "fill-[#6E6E6E] animate-pulse"
            )}
          />
          <circle
            cx="117.76"
            cy="556.611"
            r="25.4368"
            fill="white"
            stroke="#6E6E6E"
            strokeWidth="3"
            onClick={() => handleClickCheckpoint(3)}
            className={cn(
              "transition-all duration-300",
              checkpoints[3].isComplete && "stroke-[#FD7563]",
              !checkpoints[3].isComplete && "stroke-[#6E6E6E] animate-pulse"
            )}
          />
          <path
            d="M117.76 570.21C117.42 570.21 117.079 570.149 116.739 570.027C116.399 569.906 116.095 569.724 115.828 569.48C114.248 568.022 112.85 566.6 111.635 565.215C110.42 563.829 109.405 562.487 108.591 561.186C107.776 559.886 107.157 558.634 106.731 557.431C106.306 556.228 106.093 555.079 106.093 553.986C106.093 550.34 107.266 547.435 109.611 545.272C111.957 543.109 114.673 542.027 117.76 542.027C120.847 542.027 123.563 543.109 125.908 545.272C128.254 547.435 129.427 550.34 129.427 553.986C129.427 555.079 129.214 556.228 128.789 557.431C128.363 558.634 127.743 559.886 126.929 561.186C126.115 562.487 125.1 563.829 123.885 565.215C122.67 566.6 121.272 568.022 119.692 569.48C119.425 569.724 119.121 569.906 118.781 570.027C118.44 570.149 118.1 570.21 117.76 570.21ZM117.76 556.611C118.562 556.611 119.249 556.325 119.82 555.754C120.391 555.183 120.677 554.496 120.677 553.694C120.677 552.892 120.391 552.205 119.82 551.634C119.249 551.063 118.562 550.777 117.76 550.777C116.958 550.777 116.271 551.063 115.7 551.634C115.129 552.205 114.843 552.892 114.843 553.694C114.843 554.496 115.129 555.183 115.7 555.754C116.271 556.325 116.958 556.611 117.76 556.611Z"
            fill="#6E6E6E"
            onClick={() => handleClickCheckpoint(3)}
            className={cn(
              "transition-all duration-300",
              checkpoints[3].isComplete && "fill-[#FD7563]",
              !checkpoints[3].isComplete && "fill-[#6E6E6E] animate-pulse"
            )}
          />
          <circle
            cx="182.183"
            cy="283.808"
            r="25.4368"
            fill="white"
            stroke="#6E6E6E"
            strokeWidth="3"
            onClick={() => handleClickCheckpoint(4)}
            className={cn(
              "transition-all duration-300",
              checkpoints[4].isComplete && "stroke-[#FD7563]",
              !checkpoints[4].isComplete && "stroke-[#6E6E6E] animate-pulse"
            )}
          />
          <path
            d="M182.183 297.407C181.843 297.407 181.502 297.346 181.162 297.224C180.822 297.103 180.518 296.921 180.25 296.677C178.671 295.219 177.273 293.797 176.058 292.412C174.843 291.026 173.828 289.684 173.014 288.383C172.199 287.083 171.579 285.831 171.154 284.628C170.729 283.425 170.516 282.276 170.516 281.183C170.516 277.537 171.689 274.632 174.034 272.469C176.38 270.306 179.096 269.224 182.183 269.224C185.27 269.224 187.986 270.306 190.331 272.469C192.677 274.632 193.849 277.537 193.849 281.183C193.849 282.276 193.637 283.425 193.211 284.628C192.786 285.831 192.166 287.083 191.352 288.383C190.538 289.684 189.523 291.026 188.308 292.412C187.093 293.797 185.695 295.219 184.115 296.677C183.848 296.921 183.544 297.103 183.204 297.224C182.863 297.346 182.523 297.407 182.183 297.407ZM182.183 283.808C182.985 283.808 183.671 283.522 184.243 282.951C184.814 282.38 185.099 281.693 185.099 280.891C185.099 280.089 184.814 279.402 184.243 278.831C183.671 278.26 182.985 277.974 182.183 277.974C181.381 277.974 180.694 278.26 180.123 278.831C179.552 279.402 179.266 280.089 179.266 280.891C179.266 281.693 179.552 282.38 180.123 282.951C180.694 283.522 181.381 283.808 182.183 283.808Z"
            fill="#6E6E6E"
            onClick={() => handleClickCheckpoint(4)}
            className={cn(
              "transition-all duration-300",
              checkpoints[4].isComplete && "fill-[#FD7563]",
              !checkpoints[4].isComplete && "fill-[#6E6E6E] animate-pulse"
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

export default Route3Checkpoints;
