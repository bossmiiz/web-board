import Image from "next/image";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";

interface BlogCardProps {
  title: string;
  excerpt: string;
  author: string;
  category: string;
  commentCount: number;
  authorImage: string;
}

const BlogCard = ({
  title,
  excerpt,
  author,
  category,
  commentCount,
  authorImage,
}: BlogCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
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
        <span className="text-sm text-gray-500">{category}</span>
      </div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{excerpt}</p>
      <div className="flex items-center text-gray-500">
        <ChatBubbleLeftIcon className="h-5 w-5 mr-1" />
        <span>{commentCount} Comments</span>
      </div>
    </div>
  );
};

export default BlogCard;
