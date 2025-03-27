"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-8 text-center"
      >
        <h1 className="text-5xl font-bold">メモアプリへようこそ</h1>
        <p className="text-xl text-slate-500 max-w-md">
          シンプルで使いやすいメモアプリです。ログインまたは登録して始めましょう。
        </p>
        
        <div className="flex gap-4 mt-6">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link 
              href="/sign-in" 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium shadow-md hover:bg-blue-700 transition-colors"
            >
              ログイン
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link 
              href="/sign-up" 
              className="px-6 py-3 bg-slate-100 text-slate-800 rounded-lg font-medium shadow-md hover:bg-slate-200 transition-colors"
            >
              アカウント登録
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
