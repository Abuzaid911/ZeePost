import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import Nav from "../components/nav";
import NavTop from "../components/navtop";
import Footer from "../components/footer";
import { useState } from "react";

const Home: NextPage = () => {
  const { data: posts, isLoading, isError, refetch } = trpc.example.getPosts.useQuery();
  const [visiblePosts, setVisiblePosts] = useState(5);

  return (
    <>
      <NavTop />
      <div className="container mx-auto px-6 py-12 pt-24"> {/* ✅ Added `pt-24` to fix navbar overlap */}
        
        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-screen animate-fade-in">
            <div className="relative flex items-center justify-center">
              <span className="absolute animate-ping h-12 w-12 rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-block w-12 h-12 bg-green-500 rounded-full"></span>
            </div>
            <p className="text-2xl font-semibold text-gray-800 dark:text-gray-300 mt-6 tracking-wide">
              Loading the latest posts...
            </p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center text-red-500 mt-12">
            <p className="text-xl font-semibold">Something went wrong.</p>
            <button 
              onClick={() => refetch()} 
              className="mt-4 px-8 py-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-all"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && posts?.length === 0 && (
          <div className="text-center mt-12 animate-fade-in">
            <img
              src="/images/empty-state.png"
              alt="No posts available"
              className="mx-auto mb-6 w-52 opacity-80"
              loading="lazy"
            />
            <p className="text-xl text-gray-800 dark:text-gray-300 font-medium">
              Be the first to post something amazing!
            </p>
            <button className="mt-6 px-8 py-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all">
              Create Your First Post
            </button>
          </div>
        )}

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts?.slice().reverse().slice(0, visiblePosts).map((post) => (
            <div
              key={post.id}
              className="relative group bg-white dark:bg-gray-900 rounded-2xl shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-300 dark:border-gray-700 p-6 
                         backdrop-blur-xl bg-opacity-80 dark:bg-opacity-80"
            >
              <h2 className="text-2xl font-extrabold mb-4 text-gray-900 dark:text-gray-100 tracking-wide">
                {post.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {post.content}
              </p>

              {/* Author Info */}
              <div className="flex items-center mt-6">
                <div className="relative">
                  <img
                    className="w-14 h-14 rounded-full border-4 border-transparent group-hover:border-green-400 transition-all duration-300"
                    src={post.user?.image ?? "/images/default-avatar.png"}
                    alt={`${post.user?.name}'s avatar`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
                    {post.user?.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {posts && visiblePosts < posts.length && (
          <button
            onClick={() => setVisiblePosts(visiblePosts + 5)}
            className="mt-12 px-10 py-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all text-lg tracking-wide"
          >
            Load More Posts
          </button>
        )}
      </div>
      <Footer />
      <Nav active="home" />
    </>
  );
};

export default Home;