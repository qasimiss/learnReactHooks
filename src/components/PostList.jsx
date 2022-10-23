// import { useState } from "react"
import PostItem from "./PostItem"

const PostList = ({posts, title, remove}) => {
    if (!posts.length) {
        return (
            <h1 style = {{textAlign: "center"}}> Posts are not exist</h1>
        )
    }
    return (
        <>
            <h1 style = {{textAlign: "center", marginTop: "20px"}}> {title}</h1>
            {posts.map( (post, index) => 
                <PostItem remove = {remove} number = {index+1} post = {post} key = {post.id} />
            )}
        </>
    )
}

export default PostList;