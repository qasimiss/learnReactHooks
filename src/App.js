import React from "react";
import "./styles/app.css"
import PostList from "./components/PostList";
import {useState} from "react"
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import MyInput from "./components/UI/input/MyInput";
import { useMemo } from "react";

function App() {
  
  const [posts, setPosts] = useState([
    {id:1, title: "JavaScript", body:"Description" },
    {id:2, title: "JavaScript 2", body:"Description" },
    {id:3, title: "JavaScript 3", body:"Description" },
    {id:4, title: "JavaScript 4", body:"Description" },
  ])

  const [selectedSort, setSelectedSort] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const sortedPosts = useMemo(() => {
    if (selectedSort) {
      return [...posts].sort((a,b) => a[selectedSort].localeCompare((b[selectedSort])))
    }
    return posts
  }, [selectedSort, posts])

  const sortedAndSearchedPosts = useMemo( () => {
    return sortedPosts.filter( post => post.title.includes(searchQuery))
  }, [searchQuery, sortedPosts])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }
  
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }
  
  const sortPosts = (sort) => {
    setSelectedSort(sort)
  }

  return (
    <div className="App">
        <PostForm create = {createPost} />
        <hr  style = {{margin: "15px 0"}}/>
        <div>
          <MyInput 
          value = {searchQuery}
          onChange = { e => setSearchQuery(e.target.value)}
          placeholder="Search..."
          />
          <MySelect 
          value = {selectedSort}
          onChange = {sortPosts}
          defaultValue = {"Sort by"}
          options = {[
            {value: "title",
            name: "Name"},
            {value: "body", 
            name: "Description"}
          ]}
          />
        </div>
        {posts.length
          ? 
            <PostList remove = {removePost} posts = {sortedAndSearchedPosts} title = "JavaScript Posts" />
          : 
            <h1 style = {{textAlign: "center"}}> Posts are not exist</h1>
        }
        
    </div>
  );
}

export default App;
