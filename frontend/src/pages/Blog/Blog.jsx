import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import styles from "./Blog.module.css";

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/posts/');
            setPosts(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    if (loading) return <div className={styles.loading}>Loading posts...</div>;

    if (error) return <div className={styles.error}>{error}</div>

    if (posts.length === 0) return <div className={styles.no__posts}>There are no posts at the moment</div>;

    return (
        <>
            <h2 className={styles.title}>Blog Posts</h2>

            <br />
            <br />

            <div className={styles.container}>
                {posts.map((post) => (
                    <div key={post.id} className={styles.card}>
                        <h1>{post.title}</h1>
                        <p>{post.description}</p>
                        <br /><hr /><br />
                        <Link to={`/blog/${post.slug}/`}>Read More</Link>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Blog;