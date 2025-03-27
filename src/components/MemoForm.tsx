"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useMemoContext } from "@/lib/MemoContext";

interface MemoFormProps {
  initialData?: {
    id?: string;
    title: string;
    content: string;
  };
}

export default function MemoForm({ initialData }: MemoFormProps) {
  const router = useRouter();
  const { addMemo, updateMemo } = useMemoContext();
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error("タイトルを入力してください");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (initialData?.id) {
        // 既存のメモを更新
        updateMemo(initialData.id, { title, content });
        toast.success("メモを更新しました");
      } else {
        // 新しいメモを作成
        addMemo({ title, content });
        toast.success("メモを作成しました");
      }
      
      router.push("/memos");
    } catch (error) {
      toast.error("エラーが発生しました");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          タイトル
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="タイトルを入力"
          disabled={isSubmitting}
        />
      </div>
      
      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-1">
          内容
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[200px]"
          placeholder="メモの内容を入力"
          disabled={isSubmitting}
        />
      </div>
      
      <div className="flex justify-end">
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium shadow-md hover:bg-blue-700 transition-colors disabled:opacity-70"
        >
          {isSubmitting ? "保存中..." : initialData ? "更新する" : "保存する"}
        </motion.button>
      </div>
    </form>
  );
} 