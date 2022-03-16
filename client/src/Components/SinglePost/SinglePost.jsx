import { Link, useLocation } from "react-router-dom";
import axios, { Axios } from "axios";
import React, { useContext, useEffect, useState } from "react";

import "./SinglePost.css";
import { Context } from "../../Context/Context";

export default function SinglePost() {
  const location = useLocation();
  // console.log(location.pathname.split("/")[2]);
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("http://localhost:5000/post/" + path);
      // console.log(res);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const PF = "http://localhost:5000/images/";

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/post/${post._id}`, {
        data: {
          username: user.username,
        },
      });
      window.location.replace("/");
    } catch (e) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/post/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      // window.location.reload();
      setUpdateMode(false);
    } catch (e) {
      console.log(e);
    }
  };

  // console.log(post.username === user.username);
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
      </div>

      {updateMode && (
        <button className="singlePostButton" onClick={handleUpdate}>
          Update
        </button>
      )}
    </div>
  );
}

// class SinglePost extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       post: {},
//       title: "",
//       desc: "",
//       // updateMode: false,
//     };
//   }

//   async componentDidMount() {
//     const pathname = window.location.pathname;
//     // console.log(pathname);
//     const path = pathname.split("/")[2];
//     // console.log(pathname.split("/")[2]);

//     const res = await axios.get("http://localhost:5000/post/" + path);
//     // console.log(res);
//     this.setState({ post: res.data });
//   }

//   render() {
//     const PF = "http://localhost:5000/images/";

//     return (
//       <div className="singlePost">
//         <div className="singlePostWrapper">
//           {this.state.post.photo && (
//             <img
//               className="singlePostImg"
//               src={PF + this.state.post.photo}
//               alt=""
//             />
//           )}
//           <h1 className="singlePostTitle">
//             {this.state.post.title}

//             <div className="singlePostEdit">
//               <i className="singlePostIcon far fa-edit"></i>
//               <i className="singlePostIcon far fa-trash-alt"></i>
//             </div>
//           </h1>
//           <div className="singlePostInfo">
//             <span className="singlePostAuthor">
//               Author:
//               <Link to={`/?user=${this.state.post.username}`} className="link">
//                 <b>{this.state.post.username}</b>
//               </Link>
//             </span>
//             <span className="singlePostDate">
//               {new Date(this.state.post.createdAt).toDateString()}
//             </span>
//           </div>
//           <p className="singlePostDesc">{this.state.post.desc}</p>
//         </div>
//       </div>
//     );
//   }
// }

// export default SinglePost;
