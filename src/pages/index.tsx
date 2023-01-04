import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import Link from "next/link";
import { useRouter } from "next/router";
import Nav from "../components/nav";
import NavTop from "../components/navtop";


const Home: NextPage = () => {
  const router = useRouter();
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
                      <img src={post.user.image!} />
                    </div>
                  </div>
                  <p className="font-bold">{post.user.name} </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Nav active="home" />
    </div>

  );
};

export default Home;
