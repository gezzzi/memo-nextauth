"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SignInPage() {
  const { status } = useSession();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/memos";
  
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      console.log("ログイン試行:", { email, callbackUrl });
      
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      console.log("ログイン結果:", result);

      if (result?.error) {
        setError(`ログインに失敗しました: ${result.error}`);
      } else if (result?.url) {
        // 直接URLに遷移する
        window.location.replace(result.url);
      } else {
        // URLがない場合はデフォルトのコールバックURLへ
        window.location.replace(callbackUrl);
      }
    } catch (err) {
      console.error("ログイン例外:", err);
      setError("予期せぬエラーが発生しました。");
    } finally {
      setIsLoading(false);
    }
  };

  // すでにログイン済みの場合はボタンを表示
  if (status === "authenticated") {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold mb-4">ログインしました</h2>
        <p className="mb-4">既にログイン済みです。メモページに移動してください。</p>
        <Link 
          href="/memos" 
          className="inline-block px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          メモページへ移動
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">ログイン</h1>
          <p className="mt-2 text-slate-500">アカウントにログインしてメモを管理しましょう</p>
          <p className="mt-2 text-blue-500">
            テスト用アカウント: test@example.com / password123
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded text-sm">
              {error}
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              メールアドレス
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              パスワード
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded flex justify-center items-center"
          >
            {isLoading ? "ログイン中..." : "ログイン"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            アカウントをお持ちでないですか？{" "}
            <a href="/sign-up" className="text-blue-600 hover:underline">
              新規登録
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
} 