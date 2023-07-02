import React, {useEffect, useState} from 'react';
import Post from "@/components/Post";
import apiClient from "@/lib/apiClient";
import {Post as PostType} from "@/types";

const Timeline = () => {
    //  state
    const [postText, setPostText] = useState<string>("")
    const [latestPost, setLatestPost] = useState<PostType[]>([])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(postText)
        try {
            const res = await apiClient.post("/posts/post", {
                content: postText,
            })
            setLatestPost((prev) => [res.data, ...prev]);
            res.status === 201 ? setPostText(() => "") : console.log("error")
        } catch (error: any) {
            const errMsg = error.message
            alert(errMsg)
            console.error(error)
        } finally {

        }
    }

    useEffect(() => {
        const fetchLatestPost = async () => {
            try {
                const res = await apiClient.get("/posts/get_latest_post")
                setLatestPost(res.data)
            } catch (err) {
                console.error(err)
            }
        };
        fetchLatestPost()
    }, [])

    return (
        <div className="min-h-screen bg-gray-100">
            <main className="container mx-auto py-4">
                <div className="bg-white shadow-md rounded p-4 mb-4">
                    <form onSubmit={handleSubmit}>
        <textarea
            className="w-full h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={postText}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPostText(e.target.value)}
            placeholder="What's on your mind?"
        ></textarea>
                        <button
                            type="submit"
                            className="mt-2 bg-gray-700 hover:bg-green-700 duration-200 text-white font-semibold py-2 px-4 rounded"
                        >
                            投稿
                        </button>
                    </form>
                </div>
                {latestPost.map((post: PostType) => (
                    <Post key={post.id} post={post}/>
                ))}
            </main>
        </div>
    );
}

export default Timeline