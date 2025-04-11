"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { use } from "react";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    isOnline: boolean;
  };
  timestamp: string;
  category: string;
  comments: Comment[];
}

export default function PostDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const resolvedParams = use(params);

  const post: Post = {
    id: resolvedParams.id,
    title: "The Big Short War",
    content:
      "Tall, athletic, handsome with cerulean eyes, he was the kind of hyper-ambitious kid other kids loved to hate and just the type to make a big wager with no margin for error. But on the night before the S.A.T., his father took pity on him and canceled the bet. 'I would've lost it,' Ackman concedes. He got a 780 on the verbal and a 750 on the math. 'One wrong on the verbal, three wrong on the math,' he muses. 'I'm still convinced some of the questions were wrong.'",
    author: {
      name: "Zach",
      avatar: "/avatars/zach.jpg",
      isOnline: true,
    },
    timestamp: "5mo. ago",
    category: "History",
    comments: [
      {
        id: "1",
        author: "Wittawat98",
        content:
          "Lorem ipsum dolor sit amet consectetur. Purus cursus vel est a pretium quam imperdiet. Tristique auctor sed semper nibh odio iaculis sed aliquet. Amet mollis eget morbi feugiat mi risus eu. Tortor sed sagittis convallis auctor.",
        timestamp: "12h ago",
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
      <div className="flex flex-1">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="flex-1 bg-white min-h-[calc(100vh-64px)]">
          <div className="max-w-4xl mx-auto px-6 py-8">
            {/* Back Button */}
            <Link
              href="/"
              className="inline-flex items-center justify-center w-[44px] h-[44px] rounded-full bg-[#E8F3F0] hover:bg-[#E8F3F0]/80 transition-colors mb-8"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </Link>

            {/* Author Info */}
            <div className="flex items-start mb-6">
              <div className="relative w-12 h-12">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="rounded-full object-cover"
                />
                {post.author.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#49A569] rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="ml-3">
                <div className="flex items-center">
                  <h3 className="text-[#191919] text-base">
                    {post.author.name}
                  </h3>
                  <span className="ml-2 text-sm text-[#939494]">
                    {post.timestamp}
                  </span>
                </div>
                <div className="text-sm text-[#939494] mt-1">
                  {post.category}
                </div>
              </div>
            </div>

            {/* Post Content */}
            <article className="mb-8">
              <h1 className="text-[28px] font-semibold text-[#191919] mb-4">
                {post.title}
              </h1>
              <p className="text-[#191919] leading-relaxed">{post.content}</p>
            </article>

            {/* Comments Section */}
            <div className="mt-8">
              <div className="flex items-center mb-4">
                <ChatBubbleLeftIcon className="h-5 w-5 text-[#939494]" />
                <span className="ml-2 text-[#939494]">
                  {post.comments.length} Comments
                </span>
              </div>

              <button className="mb-8 bg-white border border-custom_success text-custom_success px-4 py-2 rounded-lg hover:bg-[#2b5f44] transition-colors">
                Add Comments
              </button>

              {/* Comments List */}
              <div className="space-y-6">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-[#F3F3F3] rounded-full flex items-center justify-center">
                        <span className="text-[#939494] text-sm">
                          {comment.author.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <h3 className="font-medium text-[#191919] text-sm">
                          {comment.author}
                        </h3>
                        <span className="ml-2 text-xs text-[#939494]">
                          {comment.timestamp}
                        </span>
                      </div>
                      <p className="text-[#191919] text-sm leading-relaxed">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
