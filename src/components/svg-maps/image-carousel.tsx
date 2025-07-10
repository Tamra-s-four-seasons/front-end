import React, { useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Text } from "@vapor-ui/core";
import "./embla.css";
import Image from "next/image";

interface ImageCarouselProps {
  imageUrls: string[];
  options?: EmblaOptionsType;
}

const ImageCarousel = (props: ImageCarouselProps) => {
  const { imageUrls, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (emblaApi) {
      const onSelect = () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      };

      emblaApi.on("select", onSelect);
      onSelect(); // 초기값 설정

      return () => {
        emblaApi.off("select", onSelect);
      };
    }
  }, [emblaApi]);

  return (
    <section className="embla relative">
      <div className="z-50 absolute text-center top-3 right-3 bg-black opacity-70 flex rounded-full w-[38px] h-[20px] text-sm items-center justify-center">
        <Text className="text-white" typography="subtitle2">
          {selectedIndex + 1}/{imageUrls.length}
        </Text>
      </div>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {imageUrls.map((imageUrl) => (
            <div className="embla__slide" key={imageUrl}>
              <Image src={imageUrl} alt="image" fill />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageCarousel;
