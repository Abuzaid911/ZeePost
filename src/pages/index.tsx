import { useEffect, useState } from 'react';
import { type NextPage } from 'next';
import { trpc } from '../utils/trpc';
import Nav from '../components/nav';
import NavTop from '../components/navtop';
import Footer from '../components/footer';

interface Activity {
  activity: string;
  type: string;
  participants: number;
}

const Home: NextPage = () => {
  const fetchPosts = trpc.example.getPosts.useQuery();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [darkMode, setDarkMode] = useState(() => typeof window !== 'undefined' && window.localStorage.getItem('darkMode') === 'true');

  const fetchActivity = () => {
    fetch('https://www.boredapi.com/api/activity')
      .then(response => response.json())
      .then((data: Activity) => setActivity(data))
      .catch(error => console.error('Error fetching activity:', error));
  };

  useEffect(() => {
    fetchActivity();
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? 'dark' : ''}>
        <NavTop />
      {/*<button onClick={toggleDarkMode} className="btn btn-ghost btn-circle">*/}
      {/*<label className="swap swap-rotate">*/}
      {/*  {darkMode ? (*/}
      {/*     <svg className="swap-on fill-current w-[24px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>*/}
      {/*  ) : (*/}
      {/*    <svg className="swap-off fill-current w-[24px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>*/}
      {/*  )}*/}
      {/*  </label>*/}
      {/*</button>*/}
      <div className="container mx-auto flex flex-row">
        <div className="flex-1 px-4">
          {fetchPosts.isLoading && (
            <div className="text-center text-xl font-bold bg-gradient-to-r from-green-400 to-slate-300 text-transparent bg-clip-text">
              Hold on while we teach the penguins how to dance..
            </div>
          )}
          {fetchPosts.data?.slice().reverse().map((post) => (
            <div key={post.id} className={`p-4 my-2 rounded-md shadow ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <p>{post.content}</p>
              <div className="flex items-center mt-4">
                <img className="h-10 w-10 rounded-full ring ring-green-200 ring-offset-base-100 ring-offset-3" src={post.user.image ?? "/default-avatar.png"} alt="" />
                <p className={`ml-2 font-bold ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{post.user.name}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-64 px-4">
          <div className={`sticky top-0 p-4 rounded-lg shadow ${darkMode ? 'bg-gray-900 text-white' : 'bg-white'}`}>
            <h3 className="text-lg font-bold mb-4">Feeling Bored?</h3>
            {activity ? (
              <div className="space-y-3">
                <p className="text-md font-semibold">{activity.activity}</p>
                <p><strong>Type:</strong> {activity.type}</p>
                <button
                  onClick={fetchActivity}
                  className={`btn btn-active ${darkMode ? 'btn-dark' : 'btn-accent'} hover:bg-green-200 transition duration-300`}
                >
                  Find another activity
                </button>
              </div>
            ) : (
              <p>Loading activity...</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <Nav active="home" />
    </div>
  );
};

export default Home;
