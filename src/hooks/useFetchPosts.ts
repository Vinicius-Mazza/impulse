import { useState, useEffect } from 'react';
import { Post } from '../interfaces';

interface UseFetchPostsResponse {
  posts: Post[];
  isLoading: boolean;
  error: Error | null;
}

export const useFetchPosts = (): UseFetchPostsResponse => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:3001/posts');
        const data: Post[] = await response.json();
        setPosts(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        } 
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return { posts, isLoading, error };
};