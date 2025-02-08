import React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { Send, Loader2 } from 'lucide-react';
import { trpc } from '../utils/trpc';
import NavTop from '../components/navtop';

const NewPost: NextPage = () => {
  const [formData, setFormData] = React.useState({
    title: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  
  const router = useRouter();
  const { status } = useSession();
  
  React.useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/api/auth/signin');
    }
  }, [status, router]);

  // Auto-resize textarea
  React.useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [formData.content]);

  const sendPost = trpc.example.addPost.useMutation({
    onError: () => {
      alert('Please login');
      router.push('/api/auth/signin');
    },
    onSuccess: () => {
      router.push('/');
    },
    onSettled: () => {
      setIsSubmitting(false);
    }
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'title' 
        ? value.charAt(0).toUpperCase() + value.slice(1)
        : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (formData.title.trim() === '') {
      alert('Please write a title before posting');
      return;
    }
    
    setIsSubmitting(true);
    sendPost.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavTop />
      
      <main className="container mx-auto px-4 pt-20 pb-24">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Create New Post
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4 rounded-lg bg-white p-6 shadow-sm border border-gray-200">
              {/* Title Input */}
              <div>
                <label 
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter your post title..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 
                    bg-white text-gray-900
                    placeholder-gray-500
                    focus:ring-2 focus:ring-teal-400 
                    focus:border-transparent outline-none transition-shadow"
                  maxLength={100}
                />
              </div>

              {/* Content Textarea */}
              <div>
                <label 
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  ref={textareaRef}
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Share your thoughts..."
                  rows={1}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 
                    bg-white text-gray-900
                    placeholder-gray-500
                    focus:ring-2 focus:ring-teal-400 
                    focus:border-transparent outline-none transition-shadow
                    font-mono resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 
                bg-teal-400 hover:bg-teal-500 active:bg-teal-600
                text-white font-medium rounded-lg transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Publish Post
                </>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default NewPost;