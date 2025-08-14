import { Link } from "react-router-dom";


const Post = ({ post, className }) => {
    return (
        <div className={className}>
            <h1>{post.title}</h1>
            <p>{post.description}</p>
            <br /><hr /><br />
            <Link to={`/blog/${post.slug}/`}>Read More</Link>
        </div>
    );
};

export default Post;