import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import likeButton from '../../assets/like-button.png';
import './styledPostCard.css';


function PostCard({ userPost }) {
    const [haveLike, setHaveLike] = useState(false);
    const navigate = useNavigate();

    const deletePost = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_SERVER_HOSTNAME}/post/${userPost._id}`, {withCredentials: true});
            navigate("/");
            toast.success("Post Deleted");
        } catch (e) {
            toast.error("Ups! There is a problem!");
        }
    };

    const handleLikeButton = async (e) => {
        e.preventDefault();
        if(userPost.like === false) {
            setHaveLike(true)
        } else {
            setHaveLike(false);
        }
        const body = {
            imageUrl: userPost.imageUrl,
            quote: userPost.quote,
            like: haveLike,
        };
        try {
            await axios.put(
                `${process.env.REACT_APP_SERVER_HOSTNAME}/post/${userPost._id}`,
                body,
                { withCredentials: true }
            );
        } catch (e) {
            toast.error("Ups! There is a problem!");
        }
    };

    return (
        <div className="post-card">
            <div className="post-card-top">
                <Link className="third-button" to="/post-edit">Edit Post</Link>
                <button className="primary-button" onClick={deletePost}>Delete</button>
            </div>
            <img src={userPost.imageUrl} alt="User Post" />
            <div className="post-card-bottom">
                <p>{userPost.quote}</p>
                <img width="20px" src={likeButton} alt="Like Icon" onClick={handleLikeButton} />
            </div>
        </div>
    );
}

export default PostCard;