import React, { useEffect } from "react";
import clsx from "clsx";

type Size = "sm" | "md" | "lg" | "xl";

interface ModalProps {
  opened: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: Size;
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
}

const sizeMap: Record<Size, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
};

const Modal: React.FC<ModalProps> = ({
  opened,
  onClose,
  title,
  children,
  size = "md",
  closeOnOutsideClick = true,
  closeOnEsc = true,
}) => {
  useEffect(() => {
    if (!closeOnEsc) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );
    return () =>
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [closeOnEsc, onClose]);

  if (!opened) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
        onClick={() =>
          closeOnOutsideClick && onClose()
        }
      />

      {/* Modal */}
      <div
        className={clsx(
          "relative z-50 w-full bg-white rounded-lg shadow-lg p-6 mx-4",
          sizeMap[size]
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          {title && (
            <h2 className="text-lg font-semibold">
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-black text-xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
