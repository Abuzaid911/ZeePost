/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import { useEffect, useState } from 'react';
import Router, { useRouter } from "next/router";
import Nav from "../components/nav";
import NavTop from "../components/navtop";
import { useSession } from "next-auth/react";
const NewPost: NextPage = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();
    const sendPost = trpc.example.addPost.useMutation({
        onError: () => {
            alert('Please login');
            router.push('/api/auth/signin')
        },
        onSuccess: function (data) {
            router.push('/');
        }
    });
    const session = useSession();
    useEffect(()=>{
        if (session.status=="unauthenticated")
        {
            alert('May you login please?')
            router.push('/api/auth/signin') 
        }

    }, [session.status])

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
        const newTitle: string = event.target.value;

        const firstLetter = newTitle.charAt(0).toLocaleUpperCase();

        const remainingLetters = newTitle.slice(1)

        setTitle(firstLetter + remainingLetters);

        // update the content in the component's state when the input field changes
    }
    function handleMChange(event: any) {
        setContent(event.target.value); // update the content in the component's state when the input field changes
    }

    return (

        <div>
            <NavTop />

            <form className="container flex flex-col justify-center items-center mx-auto" onSubmit={handleNewPost}>
                <div className="card w-11/12 lg:w-7/12 bg-base-100 my-4 border-primary-content border-2 ">
                    <div className="card-body ">
                        <input value={title} onChange={handleChange} className="card-title" placeholder="Title" />
                        <textarea rows={8} value={content} onChange={handleMChange} className="font-mono" placeholder="Free your mind here .." />
                    </div>
                </div>
                <button className={`btn btn-active btn-accent ${sendPost.isLoading?'loading':''}`} disabled={sendPost.isLoading} >
                    Post
                </button>
            </form>

            <Nav active="add" />
        </div>
    )
}

export default NewPost;
