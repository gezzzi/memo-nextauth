"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useMemoContext } from "@/lib/MemoContext";

interface User {
  firstName: string | null;
  username: string | null;
}

interface MemosListProps {
  user: User;
}

export default function MemosList({ user }: MemosListProps) {
  const { memos } = useMemoContext();

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">メモ一覧</h1>
          <p className="text-slate-500">{user.firstName || user.username}さんのメモ</p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link 
            href="/memos/new" 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium shadow-md hover:bg-blue-700 transition-colors"
          >
            新規メモ作成
          </Link>
        </motion.div>
      </header>

      {memos.length === 0 ? (
        <div className="text-center py-10 text-slate-500">
          メモがありません。新しいメモを作成してみましょう。
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {memos.map((memo) => (
            <motion.div
              key={memo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg shadow-md p-4 border border-slate-200"
            >
              <Link href={`/memos/${memo.id}`} className="block h-full">
                <h2 className="text-xl font-semibold mb-2 truncate">{memo.title}</h2>
                <p className="text-slate-600 mb-4 line-clamp-3">{memo.content}</p>
                <div className="text-xs text-slate-400">
                  {memo.createdAt}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
} 