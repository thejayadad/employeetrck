"use client";
import React, { ReactNode } from "react";

interface ModalProps {
  title: string;
  description: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
  title,
  description,
  children,
  isOpen,
  onClose,
}) => {
  return (
    <>
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <div
            className={`fixed inset-0 flex items-center justify-center z-50`}
          >
            <div
              className={`bg-white rounded-lg shadow-lg p-6 max-w-lg w-full transform transition-all duration-300 ${
                isOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-10"
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{title}</h2>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={onClose}
                >
                  ✕
                </button>
              </div>
              <p className="text-gray-600 mb-4">{description}</p>
              <div>{children}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Modal;
