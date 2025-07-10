import React from "react";
import Link from "next/link";
import Script from "next/script";

const HomePage = () => {
  return (
    <>
      <h1 className="text-accent">홈페이지</h1>
      <Link href="/new">새 미션</Link>
      <Script
        type="module"
        src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js"
      ></Script>
      <div className="model-viewer">
        <model-viewer
          src={"/dol.glb"}
          ios-src={"/dol.usdz"}
          alt={"model-viewer"}
          ar
          ar-modes="webxr scene-viewer quick-look"
          ar-scale="auto"
          environment-image="neutral"
          camera-controls
        >
          <button slot="ar-button" id="ar-button">
            View in AR
          </button>
        </model-viewer>
      </div>
    </>
  );
};

export default HomePage;
