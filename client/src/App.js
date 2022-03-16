import TopBar from "./Components/TopBar/TopBar.jsx";
import Home from "./Pages/Home/Home.jsx";
import Single from "./Pages/Single/Single.jsx";
import Write from "./Pages/Write/Write.jsx";
import Settings from "./Pages/Settings/Settings.jsx";
import Login from "./Pages/Login/Login.jsx";
import Register from "./Pages/Register/Register.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./Context/Context.js";
function App() {
  const { user } = useContext(Context);
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route
          path="/register"
          element={user ? <Home /> : <Register />}
          exact
        />
        <Route path="/login" element={user ? <Home /> : <Login />} exact />
        <Route path="/post/:postId" element={<Single />} exact />
        <Route path="/write" element={user ? <Write /> : <Register />} exact />
        <Route
          path="/settings"
          element={user ? <Settings /> : <Register />}
          exact
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
