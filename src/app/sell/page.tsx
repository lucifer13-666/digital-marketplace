import { TipTapEditor } from "@/components/Editor";
import SelectCategory from "@/components/SelectCategory";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export default function Sell() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-14">
      <Card>
        <form action="">
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
              <Input placeholder="Product name" />
            </div>

            {/* CATEGORY */}
            <div className="flex flex-col gap-y-2">
              <Label>Category</Label>
              <SelectCategory />
            </div>

            {/* PRICE */}
            <div className="flex flex-col gap-y-2">
              <Label>Price</Label>
              <Input placeholder="29$" type="number" />
            </div>

            {/* SMALL SUMMARY */}
            <div className="flex flex-col gap-y-2">
              <Label>Small Summary</Label>
              <Textarea placeholder="Short description of your product" />
            </div>

            {/* DESCRIPTION */}
            <div className="flex flex-col gap-y-2">
              <Label>Description</Label>
              <TipTapEditor />
            </div>
          </CardContent>
        </form>
      </Card>
    </section>
  );
}