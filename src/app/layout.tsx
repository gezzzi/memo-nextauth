import { type Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from "sonner";
import { MemoProvider } from '@/lib/MemoContext';
import { SessionProvider } from '@/components/SessionProvider';
import { getServerSession } from 'next-auth';
import UserMenu from '@/components/UserMenu';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'メモアプリ',
  description: 'Next.jsとNext-authを使用したメモアプリ',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession();

  return (
    <SessionProvider session={session}>
      <html lang="ja">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <header className="flex justify-end items-center p-4 gap-4 h-16">
            <UserMenu />
          </header>
          <MemoProvider>
            {children}
          </MemoProvider>
          <Toaster position="bottom-right" />
        </body>
      </html>
    </SessionProvider>
  )
}
