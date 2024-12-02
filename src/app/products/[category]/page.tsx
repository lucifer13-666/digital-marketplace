import ProductCard from "@/components/ProductCard";
import prisma from "@/lib/db";
import { CategoryTypes } from "@prisma/client";
import { notFound } from "next/navigation";
import React from "react";

async function getData(category: string) {
  let input;

  switch (category) {
    case "template":
      input = "template";
      break;
    case "uikit":
      input = "uikit";
      break;
    case "icon":
      input = "icon";
      break;
    case "all":
      input = undefined;
      break;

    default:
      return notFound();
  }

  const data = await prisma.product.findMany({
    where: {
      category: input as CategoryTypes,
    },
    select: {
      id: true,
      price: true,
      smallDescription: true,
      category: true,
      name: true,
      images: true,
    },
  });

  return data;
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const data = await getData(params.category);
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-4">
        {data.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            images={product.images}
            name={product.name}
            price={product.price}
            smallDescription={product.smallDescription}
          />
        ))}
      </div>
    </section>
  );
}
