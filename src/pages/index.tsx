import { type NextPage } from "next";
import { trpc } from "../utils/trpc";
import Nav from "../components/nav";
import NavTop from "../components/navtop";
import Footer from "../components/footer";
import { useState } from "react";

const Home: NextPage = () => {
  const [nightMode, setNightMode] = useState(false);

  const toggleNightMode = () => {
    setNightMode(!nightMode);
  }

  const fetchPosts = trpc.example.getPosts.useQuery();
  console.log(fetchPosts.data);

  return (

    <div className={nightMode ? "night-mode" : ""}>
      <NavTop />
      {/* ------ POSTS SECTION ------ */}
      <div className="container px-10 flex flex-col items-center mx-auto">
        <button onClick={toggleNightMode}>Sleep</button>
        {fetchPosts.isLoading && (
          <div className="flex items-center justify-center space-x-2">
           <div className="text-center text-2xl font-bold font-sans bg-gradient-to-r from-green-400 to-slate-300 text-transparent bg-clip-text">Hold on while we teach the penguins how to dance..</div>
          </div>
        )}
        {fetchPosts.data?.reverse().map(function (post, index) {
          return (
            <div className="card w-11/12 lg:w-7/12 bg-base-100 my-4 border-primary-content border-2 " key={index}>
              <div className="card-body ">
                <h2 className="card-title">{post.title}</h2>
                <p className="font-mono ">{post.content}</p>
                <div className="flex flex-col gap-2 mt-8">
                  <div className="avatar">
                    
                    <div className="rw-24 w-14 rounded-full ring ring-green-200 ring-offset-base-100 ring-offset-2">
                      <img src={post.user.image ?? ""} alt="" />
                    </div>
                  </div>
                  <p className="font-bold">{post.user.name} </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
      <Nav active="home" />
    </div>

  );
};

export default Home;
