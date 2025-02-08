import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import NavTop from "../components/navtop";
import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // ✅ Import Framer Motion for animations

const Home: NextPage = () => {
  const { data: posts, isLoading, isError, refetch } = trpc.example.getPosts.useQuery();
  const [visiblePosts, setVisiblePosts] = useState(5);
  const [hasLoaded, setHasLoaded] = useState(false); // ✅ Prevent animation reloading

  useEffect(() => {
    setHasLoaded(true); // ✅ Set flag to trigger animations once
  }, []);

  return (
    <>
      <NavTop />
      <div className="container mx-auto px-6 py-12 pt-24 min-h-screen">
        
        {/* ✅ Loading State - Pulsing Animation */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-screen animate-fade-in">
            <div className="relative flex items-center justify-center">
              <span className="absolute animate-ping h-16 w-16 rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-block w-16 h-16 bg-teal-400 rounded-full"></span>
            </div>
            <p className="text-2xl font-semibold text-gray-800 mt-6 tracking-wide">
              Fetching fresh content...
            </p>
          </div>
        )}

        {/* ✅ Error State */}
        {isError && (
          <div className="text-center text-red-500 mt-12">
            <p className="text-xl font-semibold">Oops! Something went wrong.</p>
            <button 
              onClick={() => refetch()} 
              className="mt-4 px-8 py-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-all"
            >
              Try Again
            </button>
          </div>
        )}

        {/* ✅ Empty State */}
        {!isLoading && !isError && posts?.length === 0 && (
          <div className="text-center mt-12 animate-fade-in">
            <img
              src="/images/empty-state.png"
              alt="No posts available"
              className="mx-auto mb-6 w-52 opacity-80"
              loading="lazy"
            />
            <p className="text-xl text-gray-800 font-medium">
              Looks like no one has posted yet. Be the first!
            </p>
            <button 
              className="mt-6 px-8 py-3 bg-teal-400 text-white rounded-full shadow-lg hover:bg-green-600 transition-all"
            >
              Write Your First Post
            </button>
          </div>
        )}

        {/* ✅ Post Grid - Animated on Load */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: hasLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {posts?.slice().reverse().slice(0, visiblePosts).map((post, index) => (
            <motion.div
              key={post.id}
              className="relative group bg-white rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-2 border border-gray-300 p-6 
                        backdrop-blur-xl bg-opacity-80 hover:ring-2 hover:ring-teal-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }} // ✅ Staggered animation for posts
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-900 tracking-wide">
                {post.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {post.content}
              </p>

              {/* ✅ Author Info */}
              <div className="flex items-center mt-6">
                <div className="relative">
                  <img
                    className="w-14 h-14 rounded-full border-4 border-transparent group-hover:border-teal-400 transition-all duration-300"
                    src={post.user?.image ?? "/images/default-avatar.png"}
                    alt={`${post.user?.name}'s avatar`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 rounded-full border-2 border-teal-400 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-900 text-lg">
                    {post.user?.name}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ✅ Load More Button - Animated */}
        {posts && visiblePosts < posts.length && (
          <motion.button
            onClick={() => setVisiblePosts(visiblePosts + 5)}
            className="mt-12 px-10 py-3 bg-teal-400 text-white rounded-full shadow-lg hover:bg-green-600 transition-all text-lg tracking-wide animate-pulse hover:animate-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            Load More Posts
          </motion.button>
        )}
      </div>
    </>
  );
};

export default Home;