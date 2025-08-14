import { useState, useEffect } from "react";
import axios from "axios";

import styles from "./Blog.module.css";
import Post from "../../components/Post";


const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [inputText, setInputText] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPosts = async (page) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/posts/?page=${page}`);
            setPosts(response.data.results);
            setNextPage(response.data.next);
            setPrevPage(response.data.previous);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const inputHandler = (e) => {
        const lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    const filteredPosts = posts.filter((el) => {
        if (inputText === '') {
            return el;
        } else {
            return el.title && el.title.toLowerCase().includes(inputText)
        }
    });

    useEffect(() => { 
        fetchPosts(currentPage);
    }, [currentPage]);

    if (loading) return <div className={styles.loading}>Loading posts...</div>;

    if (error) return <div className={styles.error}>{error}</div>

    if (posts.length === 0) return <div className={styles.no__posts}>There are no posts at the moment</div>;

    return (
        <>
            <h2 className={styles.title}>Blog Posts</h2>

            <br />
            <br />
            
            <input 
                type="text" 
                name="search" 
                className={styles.search__input} 
                placeholder="Search in posts"
                onChange={inputHandler}
            />

            <br />
            <br />

            <div className={styles.container}>
                {filteredPosts.map((post) => (
                    <Post 
                        key={post.id} 
                        post={post} 
                        className={styles.card} 
                    />
                ))}
            </div>

            <div className={styles.pagination}>
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={!prevPage}>
                    Previous
                </button>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={!nextPage}>
                    Next
                </button>
            </div>
        </>
    );
};

export default Blog;