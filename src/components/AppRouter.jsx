import About from "../pages/About";
import Posts from "../pages/Posts";
import NotFound from "../pages/NotFound"
import PostPage from "../pages/PostPage";
import { Route, Routes } from "react-router-dom";

const AppRouter = () => {
    return (
      <Routes>
            <Route path = "/about" element = {<About />} />
            <Route path = "/posts" element = {<Posts />} />
            <Route path = "/posts/:id" element = {<PostPage/>} />
            <Route path = "*" element = {<NotFound />} />
      </Routes>
    )
}

export default AppRouter