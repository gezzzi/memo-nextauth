import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";

// サンプルユーザー（実際の実装では、データベースに接続する必要があります）
const users = [
  {
    id: "1",
    name: "テストユーザー",
    email: "test@example.com",
    password: "password123",
  },
];

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