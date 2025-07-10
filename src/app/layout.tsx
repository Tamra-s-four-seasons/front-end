import type { Metadata } from "next";
import Pretendard from "@/styles/local-font";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import QueryClientProvider from "@/components/providers/query-client-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "탐라는사계절",
  description: "탐라는사계절",
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
