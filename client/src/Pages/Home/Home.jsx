import "./Home.css";
import Header from "../../Components/Header/Header";
import SideBar from "../../Components/SideBar/SideBar";
import Posts from "../../Components/Posts/Posts";
import axios from "axios";
import React from "react";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };
  }

  async componentDidMount() {
    const { search } = window.location;
    // console.log(pathname);

    const { data } = await axios.get("/post" + search);
    // console.log(data);
    this.setState({ posts: data });
  }

  render() {
    return (
      <>
        <Header />
        <div className="home">
          <Posts posts={this.state.posts} />
          <SideBar />
        </div>
      </>
    );
  }
}

export default Home;
