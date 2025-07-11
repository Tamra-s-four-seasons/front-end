import type { Metadata } from "next";
import Pretendard from "@/styles/local-font";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import QueryClientProvider from "@/components/providers/query-client-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "고블락",
  description: "제주도 곳곳에 숨은 캐릭터를 찾아 여행하세요!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={cn(Pretendard.className, "antialiased")}>
        <QueryClientProvider>
          <div className="max-w-[440px] mx-auto">{children}</div>
          <Toaster />
        </QueryClientProvider>
      </body>
    </html>
  );
}
