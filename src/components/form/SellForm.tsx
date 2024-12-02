"use client";

import { TipTapEditor } from "@/components/Editor";
import SelectCategory from "@/components/SelectCategory";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UploadDropzone } from "@/lib/uploadthing";
import React, { useEffect, useState } from "react";
import { JSONContent } from "@tiptap/react";
import { SellProduct, State } from "@/app/actions";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import SubmitButtons from "@/components/SubmitButtons";
import { redirect } from "next/navigation";

export default function SellForm() {
  const initalState: State = { message: "", status: undefined };
  const [state, formAction] = useFormState(SellProduct, initalState);

  const [json, setJson] = useState<null | JSONContent>(null);
  const [images, setImages] = useState<null | string[]>(null);
  const [productFile, SetProductFile] = useState<null | string>(null);

  useEffect(() => {
    if (state?.status === "success") {
      toast.success(state?.message);
      redirect("/");
    } else if (state?.status === "error") {
      toast.error(state?.message);
    }
  }, [state]);
  return (
    <form action={formAction}>
      {/* Header */}
      <CardHeader>
        <CardTitle>Sell your product with ease</CardTitle>
        <CardDescription>
          Please describe your product here in detail so that it can be sold
        </CardDescription>
      </CardHeader>

      {/* Content */}
      <CardContent className="flex flex-col gap-y-10">
        {/* NAME */}
        <div className="flex flex-col gap-y-2">
          <Label>Name</Label>
          <Input
            placeholder="Product name"
            name="name"
            type="text"
            required
            minLength={3}
          />
          {state?.errors?.["name"]?.[0] && (
            <p className="text-destructive">{state?.errors?.["name"]?.[0]}</p>
          )}
        </div>

        {/* CATEGORY */}
        <div className="flex flex-col gap-y-2">
          <Label>Category</Label>
          <SelectCategory />
          {state?.errors?.["category"]?.[0] && (
            <p className="text-destructive">
              {state?.errors?.["category"]?.[0]}
            </p>
          )}
        </div>

        {/* PRICE */}
        <div className="flex flex-col gap-y-2">
          <Label>Price</Label>
          <Input
            placeholder="29$"
            type="number"
            name="price"
            required
            min={1}
          />
          {state?.errors?.["price"]?.[0] && (
            <p className="text-destructive">{state?.errors?.["price"]?.[0]}</p>
          )}
        </div>

        {/* SMALL SUMMARY */}
        <div className="flex flex-col gap-y-2">
          <Label>Small Summary</Label>
          <Textarea
            placeholder="Short description of your product"
            name="smallDescription"
            required
            minLength={10}
          />
          {state?.errors?.["smallDescription"]?.[0] && (
            <p className="text-destructive">
              {state?.errors?.["smallDescription"]?.[0]}
            </p>
          )}
        </div>

        {/* DESCRIPTION */}
        <div className="flex flex-col gap-y-2">
          <input
            type="hidden"
            name="description"
            value={JSON.stringify(json)}
          />
          <Label>Description</Label>
          <TipTapEditor json={json} setJson={setJson} />
          {state?.errors?.["description"]?.[0] && (
            <p className="text-destructive">
              {state?.errors?.["description"]?.[0]}
            </p>
          )}
        </div>

        {/* IMAGES */}
        <div className="flex flex-col gap-y-2">
          <input type="hidden" name="images" value={JSON.stringify(images)} />
          <Label>Product Images</Label>
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImages(res.map((file) => file.url));
              toast.success("Successfully uploaded images");
            }}
            onUploadError={(error: Error) => {
              toast.error(`Upload error: ${error}`);
            }}
          />
          {state?.errors?.["images"]?.[0] && (
            <p className="text-destructive">{state?.errors?.["images"]?.[0]}</p>
          )}
        </div>

        {/* FILE */}
        <div className="flex flex-col gap-y-2">
          <input type="hidden" name="productFile" value={productFile ?? ""} />
          <Label>Product File</Label>
          <UploadDropzone
            endpoint="productFileUploader"
            onClientUploadComplete={(res) => {
              SetProductFile(res[0].url);
              toast.success("Successfully uploaded files");
            }}
            onUploadError={(error: Error) => {
              toast.error(`Upload error: ${error}`);
            }}
          />
          {state?.errors?.["productFile"]?.[0] && (
            <p className="text-destructive">
              {state?.errors?.["productFile"]?.[0]}
            </p>
          )}
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="mt-5">
        <SubmitButtons title="Create Product" />
      </CardFooter>
    </form>
  );
}
