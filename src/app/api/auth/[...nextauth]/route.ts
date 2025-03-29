import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";

// サンプルユーザー（メモリ内ストレージ - サーバー再起動時にリセットされます）
const users = [
  {
    id: "1",
    name: "テストユーザー",
    email: "test@example.com",
    password: "password123",
  },
];

// 新規ユーザー登録関数（メモリ内配列に追加するだけ）
export const registerUser = (name: string, email: string, password: string) => {
  // メールアドレスが既に使用されているかチェック
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return { success: false, error: "このメールアドレスは既に使用されています" };
  }

  // 新しいユーザーを追加
  const newUser = {
    id: (users.length + 1).toString(),
    name,
    email,
    password,
  };
  
  users.push(newUser);
  
  return { success: true, user: { id: newUser.id, name: newUser.name, email: newUser.email } };
};

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "メールアドレスとパスワード",
      credentials: {
        email: { label: "メールアドレス", type: "email" },
        password: { label: "パスワード", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          console.error("認証情報が提供されていません");
          return null;
        }

        const { email, password } = credentials;

        if (!email || !password) {
          console.error("メールアドレスまたはパスワードが提供されていません");
          return null;
        }

        try {
          const user = users.find(user => user.email === email);

          if (!user) {
            console.error(`メールアドレス ${email} のユーザーが見つかりません`);
            return null;
          }

          const isPasswordValid = user.password === password;
          if (!isPasswordValid) {
            console.error("パスワードが一致しません");
            return null;
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          console.error("認証処理中にエラーが発生しました:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 