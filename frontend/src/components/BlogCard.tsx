import Image from "next/image";
import Link from "next/link";
import {
  ChatBubbleLeftIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { memo } from "react";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  commentCount: number;
  authorImage: string;
  isFirst?: boolean;
  isLast?: boolean;
  showActions?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const AuthorInfo = memo(
  ({ author, authorImage }: { author: string; authorImage: string }) => (
    <div className="flex items-center space-x-3">
      <div className="relative w-8 h-8">
        <Image
          src={authorImage}
          alt={author}
          fill
          className="rounded-full object-cover"
        />
      </div>
      <span className="text-gray-700">{author}</span>
    </div>
  )
);

AuthorInfo.displayName = "AuthorInfo";

const ActionButtons = memo(
  ({
    id,
    onEdit,
    onDelete,
  }: {
    id: string;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
  }) => (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onEdit?.(id)}
        className="p-2 text-gray-500 hover:text-custom_green-500 transition-colors"
        aria-label="Edit post"
      >
        <PencilSquareIcon className="h-5 w-5" />
      </button>
      <button
        onClick={() => onDelete?.(id)}
        className="p-2 text-gray-500 hover:text-red-500 transition-colors"
        aria-label="Delete post"
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </div>
  )
);

ActionButtons.displayName = "ActionButtons";

const BlogCard = memo(
  ({
    id,
    title,
    excerpt,
    author,
    category,
    commentCount,
    authorImage,
    isFirst = false,
    isLast = false,
    showActions = false,
    onEdit,
    onDelete,
  }: BlogCardProps) => {
    const roundedClasses = isFirst
      ? "rounded-t-lg"
      : isLast
      ? "rounded-b-lg"
      : "";

    return (
      <article
        className={`bg-white p-6 ${roundedClasses} border-b border-gray-200 hover:shadow-md transition-shadow`}
      >
        <div className="flex justify-between items-start mb-4">
          <AuthorInfo author={author} authorImage={authorImage} />
          {showActions && (
            <ActionButtons id={id} onEdit={onEdit} onDelete={onDelete} />
          )}
        </div>
        <div className="mb-2">
          <span className="inline-block px-4 py-1 rounded-full bg-[#F3F3F3] text-sm text-gray-500">
            {category}
          </span>
        </div>
        <Link href={`/posts/${id}`} className="block">
          <div className="cursor-pointer group">
            <h2 className="text-xl font-semibold mb-2 group-hover:text-custom_green-500 transition-colors">
              {title}
            </h2>
            <p className="text-gray-600 mb-4">{excerpt}</p>
            <div className="flex items-center text-gray-500">
              <ChatBubbleLeftIcon className="h-5 w-5 mr-1" />
              <span>{commentCount} Comments</span>
            </div>
          </div>
        </Link>
      </article>
    );
  }
);

BlogCard.displayName = "BlogCard";

export default BlogCard;
