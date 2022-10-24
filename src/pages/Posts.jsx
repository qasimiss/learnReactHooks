import React, {useEffect, useState} from "react"
import PostList from "../components/PostList"
import PostForm from "../components/PostForm" 
import PostFilter from "../components/PostFilter"
import MyButton from "../components/UI/button/MyButton"
import MyModal from "../components/UI/MyModal/MyModal"
import Loader from "../components/UI/Loader/Loader"
import Pagination from "../components/UI/paginatition/Pagination"
import {usePosts} from "../hooks/usePosts"
import { useFetching } from "../hooks/useFetching"
import { getPageCount } from "../utils/pages"
import PostService from "../API/PostService"

const Posts = () => {

  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort: "", query: ""})
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit] = useState(10)
  const [page, setPage] = useState(1)
  const [fetchPosts, isPostsLoading, postError] = useFetching( async () => {
      const responce = await PostService.getAll(limit, page)
      setPosts(responce.data)
      const totalCount = responce.headers["x-total-count"]
      setTotalPages(getPageCount(totalCount, limit))
  })
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  useEffect( ()=> {
    fetchPosts()
  // eslint-disable-next-line
  }, [page])
 

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }
  

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
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
        : <PostList remove = {removePost} posts = {sortedAndSearchedPosts} title = "JavaScript Posts" />}
        <Pagination 
          page = {page} 
          changePage = {changePage} 
          totalPages = {totalPages} 
        />
        
        
    </div>
  );
}

export default Posts;