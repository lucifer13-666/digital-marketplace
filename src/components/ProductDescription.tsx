"use client";

import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";

export default function ProductDescription({
  content,
}: {
  content: JSONContent;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Đảm bảo chỉ chạy trên client
  }, []);

  const editor = useEditor({
    editable: false,
    extensions: [StarterKit],
    content: content,
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose-base",
      },
    },
    immediatelyRender: false, // Ngăn SSR render ngay lập tức
  });

  if (!editor || !isClient) {
    return null;
  }

  return (
    <>
      <EditorContent editor={editor} />
    </>
  );
}
