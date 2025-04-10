// src/components/Logo.tsx
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center space-x-3 group cursor-pointer">
      {" "}
      {/* Added group and cursor-pointer for potential hover effects */}
      {/* Icon Section (Slightly Enhanced Plate/Bowl) */}
      <svg
        className="w-9 h-9 text-amber-600 group-hover:text-amber-700 transition-colors duration-200" // Slightly larger, warmer color, hover effect
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5" // Slightly thinner stroke for refinement
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Outer rim of the plate/bowl */}
        <circle
          cx="12"
          cy="12"
          r="10"
          className="stroke-current opacity-80"
        />
        {/* Inner base circle */}
        <circle
          cx="12"
          cy="12"
          r="6"
          className="stroke-current opacity-50"
        />
        {/* Subtle representation of perhaps steam or a simple garnish */}
        <path
          d="M12 8 Q 13 6, 14 8"
          className="stroke-current opacity-70"
        />
        <path
          d="M10 9 Q 11 7, 12 9"
          className="stroke-current opacity-60"
        />
      </svg>
      {/* DineBoard Text Section */}
      <span
        // Apply the custom font class here (e.g., font-poppins)
        // Make sure 'Poppins' is imported in your project (see notes below)
        className="font-poppins text-3xl font-semibold text-gray-800 group-hover:text-gray-900 tracking-tight transition-colors duration-200"
      >
        <span className="font-bold text-amber-700">
          Dine
        </span>
        Board
      </span>
    </div>
  );
};

export default Logo;
