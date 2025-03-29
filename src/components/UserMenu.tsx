"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function UserMenu() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm">
          {session.user?.name || session.user?.email}
        </span>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
        >
          ログアウト
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <Link
        href="/sign-in"
        className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded"
      >
        ログイン
      </Link>
      <Link
        href="/sign-up"
        className="px-4 py-2 text-sm border border-blue-500 text-blue-500 hover:bg-blue-50 rounded"
      >
        新規登録
      </Link>
    </div>
  );
} 