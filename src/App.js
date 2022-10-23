import React from "react";
import "./styles/app.css"
import PostList from "./components/PostList";
import {useState} from "react"
import PostForm from "./components/PostForm";
import MyButton from "./components/UI/button/MyButton";
import { useMemo } from "react";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";

function App() {
  
  const [posts, setPosts] = useState([
    {id:1, title: "JavaScript", body:"Description" },
    {id:2, title: "JavaScript 2", body:"Description" },
    {id:3, title: "JavaScript 3", body:"Description" },
    {id:4, title: "JavaScript 4", body:"Description" },
  ])

  const [filter, setFilter] = useState({sort: "", query: ""})
  const [modal, setModal] = useState(false)


  const sortedPosts = useMemo(() => {
    if (filter.sort) {
      return [...posts].sort((a,b) => a[filter.sort].localeCompare((b[filter.sort])))
    }
    return posts
  }, [filter.sort, posts])

  const sortedAndSearchedPosts = useMemo( () => {
    return sortedPosts.filter( post => post.title.toLowerCase().includes(filter.query))
  }, [filter.query, sortedPosts])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }
  
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }
  
  return (
    <div className="App">
        <MyButton  style = {{marginTop: "25px"}} onClick = { () => setModal(true)}> 
          Write a Post
        </MyButton>
        <MyModal visible = {modal} setVisible = {setModal}>
          <PostForm create = {createPost} />
        </MyModal>
        
        <hr  style = {{margin: "15px 0"}}/>
        <PostFilter filter = {filter} setFilter = {setFilter} />
        <PostList remove = {removePost} posts = {sortedAndSearchedPosts} title = "JavaScript Posts" />
        
    </div>
  );
}

export default App;
