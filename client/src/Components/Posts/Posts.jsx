import React from "react";
import Post from "../Post/Post";
import "./Posts.css";

class Posts extends React.Component {
  render() {
    return (
      <div className="posts">
        {this.props.posts.map((p) => (
          // console.log(p)
          <Post post={p} key={p._id} />
        ))}
      </div>
    );
  }
}

export default Posts;
