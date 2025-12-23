import React from "react";

function Loader({ size }) {
  return (
    <div
    style={{ "--size": `${size}px` }}
    className="w-(--size) h-(--size) aspect-square rounded-full animate-spin
      border-2 border-gray-200 border-t-gray-600/40"
    />
  );
}

export default Loader;
