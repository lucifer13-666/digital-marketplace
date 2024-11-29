import ProductCard from "@/components/ProductCard";
import prisma from "@/lib/db";
import Link from "next/link";
import React from "react";

async function getData() {
  const data = await prisma.product.findMany({
    select: {
      id: true,
      price: true,
      smallDescription: true,
      category: true,
      name: true,
      images: true,
    },
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function NewestProducts() {
  const data = await getData();

  return (
    <section className="mt-12">
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-extrabold tracking-tighter">
          Newest Products
        </h2>

        <Link
          href={"#"}
          className="text-sm hidden font-medium text-primary hover:text-primary/90 md:block"
        >
          All Products <span>&rarr;</span>
        </Link>
      </div>

      {/* products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-4">
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
