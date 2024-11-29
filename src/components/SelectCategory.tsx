"use client";
import { Card, CardHeader } from "@/components/ui/card";
import { categoryItems } from "@/lib/categoryItems";
import React, { useState } from "react";

export default function SelectCategory() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      <input type="hidden" name="category" value={selectedCategory || ""} />
      {categoryItems.map((item) => (
        <div className="cursor-pointer" key={item.id}>
          <Card
            className={
              selectedCategory === item.name
                ? "border-2 border-primary"
                : "border-2 border-primary/10"
            }
            onClick={() => setSelectedCategory(item.name)}
          >
            <CardHeader>
              {item.image}
              <h3 className="font-medium">{item.title}</h3>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
}
