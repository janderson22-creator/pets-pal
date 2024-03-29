"use client";

import { UsePost } from "@/context/publication";
import Post from "./post";

const Publication = () => {
  const { posts } = UsePost();

  return (
    <div className="max-h-[calc(100vh-156px)] overflow-y-scroll">
      {!posts?.length ? (
        <div className="flex items-center justify-center mt-10">Não contém posts ainda!</div>
      ) : (
        posts?.map((post, key) => <Post key={key} post={post} />)
      )}
    </div>
  );
};

export default Publication;
