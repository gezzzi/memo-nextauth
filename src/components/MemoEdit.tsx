"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import MemoForm from "./MemoForm";
import { useMemoContext } from "../lib/MemoContext";
import { useRouter } from "next/navigation";

interface MemoEditProps {
  id: string;
}

export default function MemoEdit({ id }: MemoEditProps) {
  const { getMemoById } = useMemoContext();
  const router = useRouter();
  const memo = getMemoById(id);

  if (!memo) {
    router.push("/memos");
    return null;
  }

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">メモ編集</h1>
          <Link 
            href={`/memos/${id}`} 
            className="text-slate-600 hover:text-slate-900 transition-colors"
          >
            ← 戻る
          </Link>
        </header>
        
        <MemoForm initialData={{
          id: memo.id,
          title: memo.title,
          content: memo.content
        }} />
      </motion.div>
    </div>
  );
} 