
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface BlogPost {
  id: number;
  title: string;
  body: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  tags: string[];
}

export interface CreatePostData {
  title: string;
  body: string;
  published: boolean;
  tags: string[];
}

export interface UpdatePostData extends CreatePostData {
  id: number;
}

// Mock API functions
const API_BASE = 'https://jsonplaceholder.typicode.com';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchPosts = async (): Promise<BlogPost[]> => {
  await delay(500); // Simulate network delay
  const response = await fetch(`${API_BASE}/posts`);
  const posts = await response.json();
  
  // Enhance the posts with additional fields for our dashboard
  return posts.slice(0, 10).map((post: any, index: number) => ({
    ...post,
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    published: Math.random() > 0.3,
    tags: ['react', 'typescript', 'dashboard'].slice(0, Math.floor(Math.random() * 3) + 1)
  }));
};

export const fetchPost = async (id: number): Promise<BlogPost> => {
  await delay(300);
  const response = await fetch(`${API_BASE}/posts/${id}`);
  const post = await response.json();
  
  return {
    ...post,
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    published: true,
    tags: ['react', 'typescript', 'dashboard']
  };
};

export const createPost = async (data: CreatePostData): Promise<BlogPost> => {
  await delay(800);
  // Simulate API response
  return {
    id: Date.now(),
    title: data.title,
    body: data.body,
    userId: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    published: data.published,
    tags: data.tags
  };
};

export const updatePost = async (data: UpdatePostData): Promise<BlogPost> => {
  await delay(600);
  return {
    id: data.id,
    title: data.title,
    body: data.body,
    userId: 1,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
    published: data.published,
    tags: data.tags
  };
};

export const deletePost = async (id: number): Promise<void> => {
  await delay(400);
  console.log(`Post ${id} deleted`);
};

// React Query hooks
export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const usePost = (id: number) => {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: () => fetchPost(id),
    enabled: !!id,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
