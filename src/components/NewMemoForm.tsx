"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import MemoForm from "./MemoForm";

export default function NewMemoForm() {
  return (
    <div className="min-h-screen p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">新規メモ作成</h1>
          <Link 
            href="/memos" 
            className="text-slate-600 hover:text-slate-900 transition-colors"
          >
            ← 戻る
          </Link>
        </header>
        
        <MemoForm />
      </motion.div>
    </div>
  );
} 