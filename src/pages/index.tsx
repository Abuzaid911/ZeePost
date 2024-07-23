import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { trpc } from '../utils/trpc';
import Nav from '../components/nav';
import NavTop from '../components/navtop';
import Footer from '../components/footer';
import Post from '../components/post';
import Spinner from '../components/Spinner';

const Home: NextPage = () => {
  const { data, isLoading, error, refetch } = trpc.example.getPosts.useQuery();
  const deleteOldPosts = trpc.example.deleteOldPosts.useMutation();
  const [date, setDate] = useState('');

  const handleDelete = async () => {
    try {
      await deleteOldPosts.mutateAsync({ beforeDate: date });
      alert('Old posts deleted successfully');
      refetch(); // Refetch posts after deletion
    } catch (error) {
      alert('Failed to delete old posts');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-xl font-bold text-red-500">
        Error fetching posts: {error.message}
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Home | My App</title>
        <meta name="description" content="Home page of My App" />
      </Head>
      <NavTop />
      <div className="container mx-auto flex flex-col items-center">
        <div className="w-full md:w-2/3 lg:w-1/2 px-4 mb-4">
          {/* <div className="flex items-center">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border p-2 rounded"
            />
            <button
              onClick={handleDelete}
              className="ml-2 px-4 py-2 bg-red-600 text-white rounded"
            >
              Delete Old Posts
            </button>
          </div> */}
        </div>
        <div className="w-full md:w-2/3 lg:w-1/2 px-4">
          {data?.length ? (
            data.slice().reverse().map((post) => (
              <Post key={post.id} post={post} />
            ))
          ) : (
            <div className="text-center text-xl font-bold text-red-500">
              No posts available.
            </div>
          )}
        </div>
      </div>
      <Footer />
      <Nav active="home" />
    </>
  );
};

export default Home;