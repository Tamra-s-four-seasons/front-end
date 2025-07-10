// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       "model-viewer": React.DetailedHTMLProps<ModelViewerProps, HTMLElement>;
//     }
//   }
// }

// interface ModelViewerProps {
//   src?: string;
//   "ios-src"?: string;
//   alt?: string;
//   ar?: boolean;
//   "ar-modes"?: string;
//   "camera-controls"?: boolean;
//   "auto-rotate"?: boolean;
//   "auto-rotate-delay"?: number;
//   "rotation-per-second"?: string;
//   poster?: string;
//   "reveal-when-loaded"?: boolean;
//   loading?: "auto" | "lazy" | "eager";
//   "camera-orbit"?: string;
//   "camera-target"?: string;
//   "field-of-view"?: string;
//   "min-camera-orbit"?: string;
//   "max-camera-orbit"?: string;
//   "min-field-of-view"?: string;
//   "max-field-of-view"?: string;
//   "interaction-prompt"?: "auto" | "when-focused" | "none";
//   "interaction-prompt-style"?: "wiggle" | "basic";
//   "interaction-prompt-threshold"?: number;
//   "quick-look-browsers"?: string;
//   style?: React.CSSProperties;
//   className?: string;
//   id?: string;
//   // 기타 HTML 속성들
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   [key: string]: any;
// }

// export {};

import React from "react";
import { ModelViewerAttributes } from "@google/model-viewer";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & ModelViewerAttributes,
        HTMLElement
      >;
    }
  }
}
