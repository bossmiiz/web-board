import axios from "axios";

export interface CreatePostData {
  title: string;
  content: string;
  categoryId: number;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  categoryId: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: {
    username: string;
  };
  category: {
    name: string;
  };
}

export const createPost = async (postData: CreatePostData): Promise<Post> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/posts`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const getPosts = async (): Promise<Post[]> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/posts`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const deletePost = async (postId: string): Promise<void> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication token not found");
    }

    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

export const updatePost = async (
  postId: string,
  postData: CreatePostData
): Promise<Post> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication token not found");
    }

    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};
