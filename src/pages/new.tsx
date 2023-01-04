import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import Nav from "../components/nav";
import NavTop from "../components/navtop";
const NewPost: NextPage = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();
    const sendPost = trpc.example.addPost.useMutation({
        onError: (e) => {
            alert('Please login');
            router.push('/api/auth/signin')
        },
        onSuccess: function (data) {
            console.log(data);
        }
    });

    const handleNewPost = (event: any) => {
        event.preventDefault(); // prevent the form from refreshing the page
        if (title.trim() === '') {
            // don't allow empty posts
            alert('Please write something before posting');
            return;
        }

        sendPost.mutate({ title, content })

    }

    function handleChange(event: any) {
        setTitle(event.target.value); // update the content in the component's state when the input field changes
    }
    function handleMChange(event: any) {
        setContent(event.target.value); // update the content in the component's state when the input field changes
    }

    return (

        <div>
            <NavTop />

            <div className="container mx-auto py-10 ">
                <h1 className="text-3xl font-bold mb-4 mx-auto bg-gradient-to-r from-green-400 to-slate-300 text-transparent bg-clip-text">Create a new post</h1>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleNewPost}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title:
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Type a wacky title here" id="title" type="text" value={title} onChange={handleChange} />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="text">
                            Free your mind:
                        </label>
                        <textarea className="shadow appearance-none border rounded w-full py-2 px-3 
           text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Don't hold back – let your wackiest ideas flow onto the page!" id="text" rows={8} value={content} onChange={handleMChange}/>
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="btn btn-active btn-accent" >
                            Post
                        </button>
                    </div>
                </form>
            </div>

            <Nav active="add" />

        </div>

    )
}

export default NewPost;
