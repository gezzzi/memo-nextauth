"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Memo {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface MemoContextType {
  memos: Memo[];
  addMemo: (memo: Omit<Memo, "id" | "createdAt">) => void;
  updateMemo: (id: string, memo: Omit<Memo, "id" | "createdAt">) => void;
  deleteMemo: (id: string) => void;
  getMemoById: (id: string) => Memo | undefined;
}

const MemoContext = createContext<MemoContextType | undefined>(undefined);

export function useMemoContext() {
  const context = useContext(MemoContext);
  if (context === undefined) {
    throw new Error("useMemoContext must be used within a MemoProvider");
  }
  return context;
}

export function MemoProvider({ children }: { children: React.ReactNode }) {
  const [memos, setMemos] = useState<Memo[]>([]);

  // 初期データをロード
  useEffect(() => {
    // アプリロード時にデフォルトのメモを設定
    const initialMemos = [
      { id: "1", title: "買い物リスト", content: "牛乳、卵、パン", createdAt: "2023-05-01" },
      { id: "2", title: "会議メモ", content: "プロジェクトの進捗確認", createdAt: "2023-05-02" },
      { id: "3", title: "アイデアメモ", content: "新しいアプリの機能案", createdAt: "2023-05-03" },
    ];
    setMemos(initialMemos);
  }, []);

  // メモを追加
  const addMemo = (memo: Omit<Memo, "id" | "createdAt">) => {
    const newMemo: Memo = {
      ...memo,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    };
    setMemos((prev) => [...prev, newMemo]);
  };

  // メモを更新
  const updateMemo = (id: string, memo: Omit<Memo, "id" | "createdAt">) => {
    setMemos((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, ...memo }
          : m
      )
    );
  };

  // メモを削除
  const deleteMemo = (id: string) => {
    setMemos((prev) => prev.filter((memo) => memo.id !== id));
  };

  // メモを取得
  const getMemoById = (id: string) => {
    return memos.find((memo) => memo.id === id);
  };

  return (
    <MemoContext.Provider
      value={{ memos, addMemo, updateMemo, deleteMemo, getMemoById }}
    >
      {children}
    </MemoContext.Provider>
  );
} 