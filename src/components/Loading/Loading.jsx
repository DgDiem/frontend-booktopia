// LoadingSpinner.js
import React, { useEffect, useState } from "react";
import { RotatingSquare } from "react-loader-spinner";

const Loading = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <RotatingSquare
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="bars-loading"
        visible={true}
      />
    </div>
  );
};

export default Loading;
