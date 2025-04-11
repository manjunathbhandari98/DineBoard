import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center space-x-3">
      {/* Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        className="w-10 h-10"
        fill="none"
      >
        <circle
          cx="24"
          cy="24"
          r="4"
          fill="#2c3e70"
        />
        <path
          d="M24 10a14 14 0 0 1 0 28"
          stroke="#2c3e70"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M24 6a18 18 0 0 1 0 36"
          stroke="#2c3e70"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M24 14a10 10 0 0 1 0 20"
          stroke="#2c3e70"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {/* Text */}
      <span
        className="text-[28px] font-normal text-black"
        style={{
          fontFamily: "'Yeseva One', serif",
        }}
      >
        Dineboard
      </span>
    </div>
  );
};

export default Logo;
