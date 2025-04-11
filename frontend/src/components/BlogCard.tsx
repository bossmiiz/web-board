import Image from "next/image";
import Link from "next/link";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";

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
}

const BlogCard = ({
  id,
  title,
  excerpt,
  author,
  category,
  commentCount,
  authorImage,
  isFirst = false,
  isLast = false,
}: BlogCardProps) => {
  const getRoundedClasses = () => {
    if (isFirst) return 'rounded-t-lg';
    if (isLast) return 'rounded-b-lg';
    return '';
  };

  return (
    <Link href={`/posts/${id}`}>
      <div className={`bg-white p-6 ${getRoundedClasses()} border-b border-gray-200 hover:shadow-md transition-shadow cursor-pointer`}>
        <div className="flex items-center space-x-3 mb-4">
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
        <div className="mb-2">
          <span className="inline-block px-4 py-1 rounded-full bg-[#F3F3F3] text-sm text-gray-500">{category}</span>
        </div>
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{excerpt}</p>
        <div className="flex items-center text-gray-500">
          <ChatBubbleLeftIcon className="h-5 w-5 mr-1" />
          <span>{commentCount} Comments</span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
