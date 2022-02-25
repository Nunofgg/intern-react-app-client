import axios from "axios";
import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddPosts({ loggedInUser }){
  const [imageUrl, setImageUrl] = useState("");
  const [quote, setQuote] = useState("");

  const navigate = useNavigate();
//   const loggedInUser = useContext(LoggedUserConsumer);


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const body = {
      imageUrl,
      quote,
      like: false,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/post`,
        body,
        { withCredentials: true }
      );
      if(response.data){
          navigate("/posts");
          toast.success("Post Created!");
      }
    } catch (e) {
      toast.error("Ups! There is a problem!");
    }
  };

  return (
    <div className="auth-container">
        <h2 className="page-title">Create Post</h2>
        <form className="input-form" onSubmit={handleFormSubmit}>
          <input
            placeholder="image"
            type="text"
            onChange={(e) => setImageUrl(e.target.value)}
            value={imageUrl}
            className="user-input"
          />

          <input
          placeholder="quote"
            type="text"
            onChange={(e) => setQuote(e.target.value)}
            value={quote}
            className="user-input"
          />
          <button className="submit-button" type="submit">Create</button>
        </form>
    </div>
  );
}

export default AddPosts;