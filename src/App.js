import React from "react";
import "./styles/app.css"
import PostList from "./components/PostList";
import {useState} from "react"
import PostForm from "./components/PostForm";

import { useMemo } from "react";
import PostFilter from "./components/PostFilter";

function App() {
  
  const [posts, setPosts] = useState([
    {id:1, title: "JavaScript", body:"Description" },
    {id:2, title: "JavaScript 2", body:"Description" },
    {id:3, title: "JavaScript 3", body:"Description" },
    {id:4, title: "JavaScript 4", body:"Description" },
  ])

  const [filter, setFilter] = useState({sort: "", query: ""})

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
  }
  
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }
  
  return (
    <div className="App">
        <PostForm create = {createPost} />
        <hr  style = {{margin: "15px 0"}}/>
        <PostFilter filter = {filter} setFilter = {setFilter} />
        {sortedAndSearchedPosts.length
          ? 
            <PostList remove = {removePost} posts = {sortedAndSearchedPosts} title = "JavaScript Posts" />
          : 
            <h1 style = {{textAlign: "center"}}> Posts are not exist</h1>
        }
        
    </div>
  );
}

export default App;
