import type { Metadata } from "next";
import Pretendard from "@/styles/local-font";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

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
    <html lang="ko">
      <body className={cn(Pretendard.className, "antialiased")}>
        <div className="max-w-[440px] mx-auto">
          <h1>Global Layout</h1>
          {children}
        </div>
      </body>
    </html>
  );
}
