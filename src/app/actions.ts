"use server";

import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { CategoryTypes } from "@prisma/client";
import { z } from "zod";

export type State = {
  status: "success" | "error" | undefined;
  errors?: {
    [key: string]: string[];
  };
  message?: string | null;
};

const productSchema = z.object({
  name: z
    .string()
    .min(3, { message: "The name has to be a min charackter length of 5" }),

  category: z.string().min(1, { message: "Category is required" }),

  price: z.number().min(1, { message: "The Price has to be bigger then 1" }),

  smallDescription: z
    .string()
    .min(10, { message: "Please summerize your product more" }),

  description: z.string().min(10, { message: "Description is required" }),

  images: z.array(z.string(), { message: "Images are required" }),

  productFile: z
    .string()
    .min(1, { message: "Pleaes upload a zip of your product" }),
});

export async function SellProduct(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const validateFields = productSchema.safeParse({
    name: formData.get("name"),
    category: formData.get("category"),
    price: Number(formData.get("price")),
    smallDescription: formData.get("smallDescription"),
    description: formData.get("description"),
    images: JSON.parse(formData.get("images") as string),
    productFile: formData.get("productFile"),
  });

  if (!validateFields.success) {
    const state: State = {
      status: "error",
      errors: validateFields.error.flatten().fieldErrors,
      message: "Oops, I think there is a mistake with your inputs.",
    };

    return state;
  }

  const data = await prisma.product.create({
    data: {
      name: validateFields.data.name,
      category: validateFields.data.category as CategoryTypes,
      smallDescription: validateFields.data.smallDescription,
      price: validateFields.data.price,
      images: validateFields.data.images,
      productFile: validateFields.data.productFile,
      userId: user.id,
      description: JSON.parse(validateFields.data.description),
    },
  });

  const state: State = {
    status: "success",
    message: "Successfully added your product",
  };

  return state;

  //   return redirect(`/product/${data.id}`);
}