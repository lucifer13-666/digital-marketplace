import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface iAppProps {
  id: string;
  images: string[];
  name: string;
  price: number;
  smallDescription: string;
}

export default function ProductCard({
  id,
  name,
  price,
  smallDescription,
  images,
}: iAppProps) {
  return (
    <div className="rounded-lg">
      {/* images */}
      <Carousel className="w-full mx-auto">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[230px]">
                <Image
                  alt="Product image"
                  src={image}
                  fill
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
      </Carousel>

      <div className="flex justify-between items-center mt-2">
        <h1 className="font-semibold text-xl">{name}</h1>
        <h3 className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/10">
          ${price}
        </h3>
      </div>

      <p className="text-gray-600 line-clamp-2 text-sm mt-2">
        {smallDescription}
      </p>

      <Button className="w-full mt-5" asChild>
        <Link href={`/product/${id}`}>Learn More!</Link>
      </Button>
    </div>
  );
}