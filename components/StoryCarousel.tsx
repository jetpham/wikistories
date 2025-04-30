import { getStoriesForUser } from "@/app/api/getStoriesForUser";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

interface StorySlide {
  src: string;
  alt: string;
}

export async function Story({ stories }: { stories: StorySlide[] }) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent>
        {stories.map((img, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <AspectRatio ratio={220 / 390}>
              <Image
                src={img.src}
                alt={img.alt}
                width={50}
                height={50}
                unoptimized={true}
              ></Image>
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
