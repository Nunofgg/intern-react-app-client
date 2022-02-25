import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { LoggedUserConsumer } from "../../context/loggedUser";
import PostCard from "../postCard/PostCard";
import './styledListPosts.css';

function ListPosts({loggedInUser}){
    // const [posts, setPosts] = useState([]);

    // useEffect(() => {
    //     async function getPosts(){
    //         const response = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/posts`);
    //         console.log(response.data);
    //         setPosts(response.data.posts);
    //     }
    //     getPosts();
    // }, []);


    return(
        <div className='posts-container' >
            {loggedInUser.posts?.map((post, index) => {
            return(
                <PostCard key={index} userPost={post} />
            );
        })}
        </div>
    );
}

export default ListPosts;