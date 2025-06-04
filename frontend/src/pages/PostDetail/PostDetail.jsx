import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import styles from "./PostDetail.module.css";

const PostDetail = () => {
    const { slug } = useParams();
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPost = async (slug) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/posts/${slug}/`);
            setPost(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPost(slug);
    }, [slug]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleString(undefined, options);
    };

    if (loading) return <div className={styles.loading}>Loading post...</div>;

    if (error) return <div className={styles.error}>{error}</div>;

    return (
        <>
            <h3 className={styles.title}>{post.title}</h3>
            <div className={styles.timeContainer}>
                <h3>
                    Created at: <span className={styles.time}>{formatDate(post.created_at)}</span>
                </h3>
                <h3>
                    Updated at: <span className={styles.time}>{formatDate(post.updated_at)}</span>
                </h3>
            </div>

            <hr /><br />

            <div dangerouslySetInnerHTML={{ __html: post.body }}></div>

            <br /><hr /><br />

            <h4 className="center"><i>this.is.armin.emami@gmail.com</i></h4>
        </>
    );
};

export default PostDetail;