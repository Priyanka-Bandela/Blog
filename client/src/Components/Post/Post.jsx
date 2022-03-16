import React from "react";
import { Link } from "react-router-dom";
import "./Post.css";

class Post extends React.Component {
  render() {
    const { photo, title, createdAt, desc, _id, categories } = this.props.post;
    console.log("photo", photo);
    const PF = "http://localhost:5000/images/";
    return (
      <div className="post">
        {photo && <img className="postImg" src={PF + photo} alt="" />}
        <div className="postInfo">
          <div className="postCats">
            {categories.map((c) => (
              <span className="postCat">{c.name}</span>
            ))}
          </div>
          <Link className="link" to={`/post/${_id}`}>
            <span className="postTitle">{title}</span>
          </Link>
          <hr />
          <span className="postDate">{new Date(createdAt).toDateString()}</span>
        </div>
        <p className="postDesc">{desc}</p>
      </div>
    );
  }
}

export default Post;
