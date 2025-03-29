import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "../../../lib/auth-utils";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    // 必須フィールドの検証
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "すべてのフィールドが必要です" },
        { status: 400 }
      );
    }

    // メールアドレスの簡易検証
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "有効なメールアドレスを入力してください" },
        { status: 400 }
      );
    }

    // パスワードの簡易検証
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: "パスワードは6文字以上必要です" },
        { status: 400 }
      );
    }

    // ユーザー登録
    const result = registerUser(name, email, password);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, user: result.user },
      { status: 201 }
    );
  } catch (error) {
    console.error("登録エラー:", error);
    return NextResponse.json(
      { success: false, error: "ユーザー登録に失敗しました" },
      { status: 500 }
    );
  }
} 