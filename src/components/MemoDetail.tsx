"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useMemoContext } from "@/lib/MemoContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface MemoDetailProps {
  id: string;
}

export default function MemoDetail({ id }: MemoDetailProps) {
  const { getMemoById, deleteMemo } = useMemoContext();
  const router = useRouter();
  const memo = getMemoById(id);

  if (!memo) {
    router.push("/memos");
    return null;
  }

  const handleDelete = () => {
    if (window.confirm("このメモを削除してもよろしいですか？")) {
      deleteMemo(id);
      toast.success("メモを削除しました");
      router.push("/memos");
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{memo.title}</h1>
          <div className="flex gap-4">
            <Link 
              href={`/memos/${memo.id}/edit`} 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium shadow-md hover:bg-blue-700 transition-colors"
            >
              編集
            </Link>
            <button 
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium shadow-md hover:bg-red-700 transition-colors"
            >
              削除
            </button>
            <Link 
              href="/memos" 
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              ← 戻る
            </Link>
          </div>
        </header>
        
        <div className="bg-white rounded-lg shadow-md p-6 border border-slate-200">
          <div className="text-slate-600 whitespace-pre-wrap mb-4">
            {memo.content}
          </div>
          <div className="text-xs text-slate-400">
            作成日: {memo.createdAt}
          </div>
        </div>
      </motion.div>
    </div>
  );
} 