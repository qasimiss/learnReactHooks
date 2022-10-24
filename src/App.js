import React, { useEffect } from "react";
import "./styles/app.css"
import PostList from "./components/PostList";
import {useState} from "react"
import PostForm from "./components/PostForm";
import MyButton from "./components/UI/button/MyButton";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import { usePosts } from "./hooks/usePosts";
import PostService from "./API/PostService";

function App() {
  
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort: "", query: ""})
  const [modal, setModal] = useState(false)
  const [isPostsLoading, setIsPostsLoading] = useState(false)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

  useEffect( ()=> {
    fetchPost()
  }, [])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }
  
  async function fetchPost() {
    setIsPostsLoading(true)
    setTimeout( async () => {
      const posts = await PostService.getAll()
      setPosts(posts)
      setIsPostsLoading(false)
    }, 1000)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }
  
  return (
    <div className="App">
        <button style={{display: "block", margin: "50px auto 0"}} onClick={fetchPost}>REST API</button>
        <MyButton  style = {{marginTop: "25px"}} onClick = { () => setModal(true)}> 
          Write a Post
        </MyButton>
        <MyModal visible = {modal} setVisible = {setModal}>
          <PostForm create = {createPost} />
        </MyModal>
        
        <hr  style = {{margin: "15px 0"}}/>
        <PostFilter 
          filter = {filter} 
          setFilter = {setFilter} 
        />
        {isPostsLoading 
        ? <h1> Loading posts...</h1>
        : <PostList remove = {removePost} posts = {sortedAndSearchedPosts} title = "JavaScript Posts" />

        }
        
    </div>
  );
}

export default App;
