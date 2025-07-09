import localFont from "next/font/local";

const Pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/PretendardVariable.woff2",
    },
  ],
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export default Pretendard;
