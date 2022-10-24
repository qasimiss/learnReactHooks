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
import Loader from "./components/UI/Loader/Loader";
import { useFetching } from "./hooks/useFetching";

function App() {
  
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort: "", query: ""})
  const [modal, setModal] = useState(false)
  
  const [fetchPosts, isPostsLoading, postError] = useFetching( async () => {
      const posts = await PostService.getAll()
      setPosts(posts)
  })

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

  useEffect( ()=> {
    fetchPosts()
  }, [])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }
  

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }
  
  return (
    <div className="App">
        <button style={{display: "block", margin: "50px auto 0"}} onClick={fetchPosts}>REST API</button>
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
        {postError && 
          <h1>Error! {postError}</h1>
        }
        {isPostsLoading 
        ? <div style={{display: "flex", justifyContent: "center", marginTop: "25px"}}> <Loader/> </div> 
        : <PostList remove = {removePost} posts = {sortedAndSearchedPosts} title = "JavaScript Posts" />

        }
        
    </div>
  );
}

export default App;
