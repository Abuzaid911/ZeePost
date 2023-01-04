/* eslint-disable @next/next/no-img-element */
import { type NextPage } from "next";
import { trpc } from "../utils/trpc";
import Nav from "../components/nav";
import NavTop from "../components/navtop";
import Footer from "../components/footer";


const Home: NextPage = () => {
  const fetchPosts = trpc.example.getPosts.useQuery();
  console.log(fetchPosts.data);
  return (

    <div>
      <NavTop />
      {/* ------ POSTS SECTION ------ */}
      <div className="container px-10 flex flex-col items-center mx-auto">
        {fetchPosts.data?.map(function (post, index) {
          return (
            <div className="card w-11/12 lg:w-7/12 bg-base-100 my-4 border-primary-content border-2 " key={index}>
              <div className="card-body ">
                <h2 className="card-title">{post.title}</h2>
                <p className="font-mono ">{post.content}</p>
                <div className="flex flex-col mt-4">
                  <div className="avatar">
                    <div className="rw-24 w-14 rounded-full ring ring-pink-200 ring-offset-base-100 ring-offset-2">
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
        <Footer/>
      <Nav active="home" />
    </div>

  );
};

export default Home;
