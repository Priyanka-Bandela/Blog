import axios from "axios";
import React, { useContext, useState } from "react";
import { Context } from "../../Context/Context";
import "./Write.css";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      username: user.username,
      title,
      desc,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (e) {}
    }
    try {
      const res = await axios.post("/post/", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (e) {}
  };
  return (
    <div className="write">
      {file && (
        <img src={URL.createObjectURL(file)} alt="" className="writeImg" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            type="text"
            placeholder="Tell your story...."
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}

// class Write extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       title: "",
//       desc: "",
//       file: null,
//     };
//   }

//   handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await axios.post("  ");
//   };

//   render() {
//     return (
//       <div className="write">
//         <img
//           src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
//           alt=""
//           className="writeImg"
//         />
//         <form className="writeForm" onSubmit={this.handleSubmit}>
//           <div className="writeFormGroup">
//             <label htmlFor="fileInput">
//               <i className="writeIcon fas fa-plus"></i>
//             </label>
//             <input type="file" id="fileInput" style={{ display: "none" }} />
//             <input
//               type="text"
//               placeholder="Title"
//               className="writeInput"
//               autoFocus={true}
//             />
//           </div>
//           <div className="writeFormGroup">
//             <textarea
//               className="writeInput writeText"
//               type="text"
//               placeholder="Tell your story...."
//             ></textarea>
//           </div>
//           <button className="writeSubmit" type="submit">
//             Publish
//           </button>
//         </form>
//       </div>
//     );
//   }
// }

// export default Write;
