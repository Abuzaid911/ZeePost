import { useState } from 'react';
import { type NextPage } from 'next';
import Head from 'next/head';
import { trpc } from '../utils/trpc';
import Nav from '../components/nav';
import NavTop from '../components/navtop';
import Footer from '../components/footer';
import Post, { PostType } from '../components/post';
import Spinner from '../components/Spinner';

interface Activity {
  activity: string;
  type: string;
  participants: number;
}

const Home: NextPage = () => {
  const { data, isLoading, error } = trpc.example.getPosts.useQuery();
  const [activity, setActivity] = useState<Activity | null>(null);

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
        <div className="w-full md:w-2/3 lg:w-1/2 px-4">
          {data?.length ? (
            data.slice().reverse().map((post: PostType) => (
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