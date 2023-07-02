import React from 'react';
import {GetServerSideProps} from "next";
import apiClient from "@/lib/apiClient";
import {Post, Profile} from "@/types";

type ProfileProps = {
    profile: Profile;
    posts: Post[]
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const {userId} = context.query;

    try {
        // 複数リクエスト時はallを使う
        const profileReq = apiClient.get(`/users/profile/${userId}`)
        const postsReq = apiClient.get(`/posts/${userId}`)
        const [profile, posts] = await Promise.all([
            profileReq,
            postsReq
        ]);

        return {
            props: {
                profile: profile.data,
                posts: posts.data
            }
        }
    } catch (e) {
        return {
            notFound: true
        }
    }
}

const UserProfile = ({profile, posts}: ProfileProps) => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="w-full max-w-xl mx-auto">
                <div className="bg-white shadow-md rounded-lg p-6 mb-4">
                    <div className="flex items-center">
                        <img
                            className="w-20 h-20 rounded-full mr-4"
                            src={profile.profileImageUrl ?? "https://via.placeholder.com/150"}
                            alt="User Avatar"/>
                        <div>
                            <h2 className="text-2xl font-semibold mb-1">{profile.user.username}</h2>
                            <p className="text-gray-600">{profile.bio}</p>
                        </div>
                    </div>
                </div>
                {posts.map((post) => {
                    return (
                        <div className="bg-white shadow-md rounded p-4 mb-4" key={post.id}>
                            <div className="mb-4">
                                <div className="flex items-center mb-2">
                                    <img
                                        className="w-10 h-10 rounded-full mr-2"
                                        src={post.author.profile.profileImageUrl ?? "https://via.placeholder.com/150"}
                                        alt="User Avatar"/>
                                    <div>
                                        <h2 className="font-semibold text-md">{post.author.username}</h2>
                                        <p className="text-gray-500 text-sm">{new Date(post.createdAt).toLocaleString()}</p>
                                    </div>
                                </div>
                                <p className="text-gray-700">{post.content}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default UserProfile;