import React from "react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      <h1>홈페이지</h1>
      <Link href="/new">새 미션</Link>
    </div>
  );
};

export default HomePage;
