import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full mb-6 relative">
                    <div className="rounded-2xl overflow-hidden shadow-xl">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                    {isAuthor && (
                        <div className="absolute right-4 top-4">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500 hover:bg-green-400" className="mr-3 rounded-xl">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500 hover:bg-red-400" className="rounded-xl" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-4">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">{post.title}</h1>
                </div>
                <div className="prose max-w-none">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}