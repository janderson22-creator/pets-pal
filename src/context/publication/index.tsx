"use client";

import { Post } from "@prisma/client";
import axios from "axios";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type ContextValue = {
  deletePublication: (
    id: string,
    isMyPost: boolean | undefined,
  ) => Promise<void>;
  postPublication: (data: Post) => Promise<void>;
  fetchPublications: () => Promise<void>;
  posts: Post[] | undefined;
};

export const PostContext = React.createContext<ContextValue | undefined>(
  undefined,
);

export const PostProvider: React.FC<ChildrenProps> = ({
  children,
  ...rest
}) => {
  const [posts, setPosts] = useState<Post[]>();
  const [loading, setLoading] = useState(false);

  const postPublication = useCallback(async (data: Post) => {
    try {
      const response = await axios.post(`/api/publication/post`, data);

      console.log(response);
      setPosts((prevPosts) => [
        ...(prevPosts || []),
        response.data.publication,
      ]);
    } catch (error) {
      console.error("Error to get post:", error);
    }
  }, []);

  const deletePublication = useCallback(
    async (id: string, isMyPost: boolean | undefined) => {
      if (!isMyPost) return;

      try {
        const response = await axios.delete(
          `/api/publication/delete?postId=${id}`,
        );

        console.log(response);
        const newPosts = posts?.filter((post) => post.id !== id);
        setPosts(newPosts);
      } catch (error) {
        console.error("Error to delete post:", error);
      }
    },
    [posts],
  );

  const fetchPublications = useCallback(async () => {
    try {
      const response = await axios.get(`/api/publication/get`);
      const data = response.data.posts;

      setPosts(data);
    } catch (error) {
      console.error("Error to get post:", error);
    }
  }, []);

  useEffect(() => {
    fetchPublications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({ postPublication, fetchPublications, posts, deletePublication }),
    [postPublication, fetchPublications, posts, deletePublication],
  );

  return (
    <PostContext.Provider value={value} {...rest}>
      {children}
    </PostContext.Provider>
  );
};

export const UsePost = (): ContextValue => {
  const context = useContext(PostContext);

  if (context === undefined) {
    throw new Error("usePost must be used");
  }

  return context;
};

//
// Utils
//

interface ChildrenProps {
  children: React.ReactNode;
}
