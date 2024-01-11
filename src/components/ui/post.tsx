"use client";
import { Post as PostType } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import DropdownPost from "./dropdown-post";
import Like from "../svg/like";
import Comment from "../svg/comment";
import { formatCreatedAt } from "@/utils/format-date";

interface Props {
  post: PostType;
}

const Post: React.FC<Props> = ({ post }) => {
  const formattedDate = formatCreatedAt(post.createdAt);

  return (
    <div
      className="px-3 py-4"
    >
      <div className="flex gap-3">
        <Avatar>
          <AvatarFallback>{post.namePet.toUpperCase()}</AvatarFallback>
          {post.imageUrl && <AvatarImage src={post.imageUrl} />}
        </Avatar>

        <div className="flex flex-col">
          <p className="text-base font-medium">{post.namePet}</p>
          <p className="text-xs opacity-60">@{post.slug}</p>
        </div>

        <DropdownPost />
      </div>

      <div className="mt-3">
        <p className="text-sm">{post.text}</p>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <div className="flex items-center">
          <Like liked={true} />
          <p className="text-xs font-semibold">{post.likes}</p>
        </div>

        <div className="flex items-center">
          <Comment />
          <p className="text-xs font-semibold">0</p>
        </div>
      </div>

      <div className="mt-2">
        <p className="text-[#A09BA3] font-sm">{formattedDate}</p>
      </div>
    </div>
  );
};

export default Post;