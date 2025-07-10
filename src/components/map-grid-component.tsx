"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 타입 정의
interface MapTile {
  id: number;
  status: "inactive" | "active" | "completed";
  title?: string;
  description?: string;
}

// 기본 정적 데이터
const tiles: MapTile[] = [
  { id: 1, status: "inactive", title: "준비중" },
  { id: 2, status: "active", title: "" },
  { id: 3, status: "completed", title: "스탬프" },
  { id: 4, status: "inactive", title: "준비중" },
  { id: 5, status: "active", title: "" },
  { id: 6, status: "completed", title: "스탬프" },
];

const MapGridComponent = () => {
  const [showDetail, setShowDetail] = useState(false);

  const handleTileClick = (tile: MapTile) => {
    if (tile.status === "completed") {
      setShowDetail(true);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gray-50">
      <AnimatePresence>
        {showDetail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center z-40"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            onClick={() => setShowDetail(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-1/2 h-1/3 flex items-center justify-center text-3xl font-extrabold text-gray-700 relative z-50"
              onClick={(e) => e.stopPropagation()}
            >
              완료 지도
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full">
        <motion.div
          key="grid-view"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="flex flex-wrap gap-y-8 gap-x-0 justify-center"
        >
          {tiles.map((tile) => (
            <div
              key={tile.id}
              className="basis-1/3 max-w-[33.3333%] flex justify-center px-2 mb-8"
            >
              <div
                className={`
                  w-full aspect-square max-w-48 rounded-full flex flex-col items-center justify-center text-center text-white font-semibold text-lg shadow-md
                  ${
                    tile.status === "inactive"
                      ? "bg-[#d1d5db] text-gray-700"
                      : ""
                  }
                  ${
                    tile.status === "active" ? "bg-[#5eead4] text-gray-800" : ""
                  }
                  ${
                    tile.status === "completed"
                      ? "bg-[#f9a8d4] text-gray-800 cursor-pointer hover:scale-105 transition-transform duration-200"
                      : ""
                  }
                `}
                onClick={() => handleTileClick(tile)}
              >
                {tile.title || (
                  <>
                    {tile.status === "inactive" && "준비중"}
                    {tile.status === "active" && ""}
                    {tile.status === "completed" && "스탬프"}
                  </>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MapGridComponent;
