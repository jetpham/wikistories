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

export async function Story({
  stories,
}: {
  stories: { src: string; alt: string }[];
}) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent>
        {stories.map((img, index) => (
          <CarouselItem key={index}>
            <AspectRatio
              ratio={220 / 390}
              className="w-220 h-390 place-self-center"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={220}
                height={390}
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
