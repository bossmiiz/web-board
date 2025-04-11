import { XMarkIcon } from "@heroicons/react/24/outline";

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  commentText: string;
  onCommentChange: (text: string) => void;
  onSubmit: () => void;
}

export default function CommentModal({
  isOpen,
  onClose,
  commentText,
  onCommentChange,
  onSubmit,
}: CommentModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex items-center justify-center p-4">
      {/* Blurred backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-sm bg-black/30"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative w-full max-w-[400px] bg-white rounded-[20px] overflow-hidden">
        <div className="px-4 pt-4 pb-3 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-[17px] font-medium text-[#191919]">
              Add Comments
            </h2>
            <button
              onClick={onClose}
              className="w-6 h-6 flex items-center justify-center"
            >
              <XMarkIcon className="h-5 w-5 text-[#939494]" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <textarea
            value={commentText}
            onChange={(e) => onCommentChange(e.target.value)}
            placeholder="What's on your mind..."
            className="w-full p-3 border border-gray-200 rounded-lg text-sm placeholder:text-[#939494] mb-4 min-h-[120px] focus:outline-none focus:ring-1 focus:ring-custom_success resize-none"
          />

          <div className="flex flex-col gap-3">
            <button
              onClick={onClose}
              className="w-full py-[10px] text-sm font-medium bg-white border border-custom_success text-custom_success hover:text-[#2b5f44] rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              className="w-full py-[10px] bg-custom_success text-white text-sm font-medium rounded-lg hover:bg-[#2b5f44] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!commentText.trim()}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
