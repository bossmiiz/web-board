import React from "react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px] max-w-[90%]">
        <h2 className="text-xl font-semibold text-center mb-2">
          Please confirm if you wish to <br /> delete the post
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Are you sure you want to delete the post?
          <br />
          Once deleted, it cannot be recovered.
        </p>
        <div className="flex flex-col md:flex-row justify-center md:justify-between p-4 md:p-0 space-y-4 md:space-y-0 mb-4 md:mb-0">
          <button
            onClick={onClose}
            className="w-full md:w-[160px] order-2 md:order-1 px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="w-full md:w-[160px] order-1 md:order-2 px-6 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
