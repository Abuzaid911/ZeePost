/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextPage } from "next";
import { trpc } from "../utils/trpc";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Nav from "../components/nav";
import NavTop from "../components/navtop";
import { useSession } from "next-auth/react";

const NewPost: NextPage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const router = useRouter();
    const session = useSession();

    // Redirect unauthenticated users
    useEffect(() => {
        if (session.status === "unauthenticated") {
            router.replace("/api/auth/signin"); // ✅ Prevents extra history entry
        }
    }, [session.status, router]);

    // Create new post mutation
    const sendPost = trpc.example.addPost.useMutation({
        onError: () => {
            alert("Please login");
            router.push("/api/auth/signin");
        },
        onSuccess: () => {
            router.push("/");
        },
    });

    // Handle post submission
    const handleNewPost = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (title.trim() === "") {
            alert("Please write something before posting");
            return;
        }
        sendPost.mutate({ title, content });
    };

    // Handle title change
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = event.target.value;
        setTitle(newTitle.charAt(0).toLocaleUpperCase() + newTitle.slice(1));
    };

    // Handle content change
    const handleMChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };

    return (
        <div>
            <NavTop />
            <form className="container flex flex-col justify-center items-center mx-auto" onSubmit={handleNewPost}>
                <div className="card w-11/12 lg:w-7/12 bg-base-100 my-4 border-primary-content border-2">
                    <div className="card-body">
                        <input
                            value={title}
                            onChange={handleChange}
                            className="card-title border border-gray-300 p-2 rounded-md w-full"
                            placeholder="Title"
                        />
                        <textarea
                            rows={8}
                            value={content}
                            onChange={handleMChange}
                            className="font-mono border border-gray-300 p-2 rounded-md w-full"
                            placeholder="Free your mind here .."
                        />
                    </div>
                </div>
                <button className={`btn btn-active btn-primary ${sendPost.isLoading ? "loading" : ""}`} disabled={sendPost.isLoading}>
                    {sendPost.isLoading ? "Posting..." : "Post"}
                </button>
            </form>
            <Nav active="add" />
        </div>
    );
};

export default NewPost;