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
    <>
      <NavTop />

      <div className="container mx-auto flex flex-row ">
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
    </>
  );
};

export default Home;
