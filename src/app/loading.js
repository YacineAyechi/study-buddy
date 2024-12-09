import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center py-4 h-screen items-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-[--poppy] border-t-transparent" />
    </div>
  );
};

export default Loading;
