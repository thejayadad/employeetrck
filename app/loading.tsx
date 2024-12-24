import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col h-full justify-center items-center bg-gray-50">
      {/* Spinner */}
      <div className="flex items-center justify-center space-x-2">
        <div className="w-12 h-12 border-4 border-purple-500 border-dashed rounded-full animate-spin"></div>
      </div>
      {/* Loading Text */}
      <p className="mt-4 text-xl font-semibold text-gray-700 animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default Loading;
