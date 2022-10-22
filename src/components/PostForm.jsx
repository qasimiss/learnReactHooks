import { useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";

const PostForm = ({create}) => {

    const [post, setPost] = useState({title:"", body: ""})
    const addNewPost = (e) => {
        e.preventDefault()
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost)
        setPost({title:"", body: ""})
      }
     
    return (
            <form action="">
          { /* Управляемый компонент (юз стейт) + двухстороннее связывание */}
          <MyInput 
            type ="text" 
            placeholder = "Post Description"
            value = {post.title}
            onChange = {(e) => setPost({...post, title: e.target.value})} 
          />
           <MyInput 
            type ="text" 
            placeholder = "Post Description"
            value = {post.body}
            onChange = {(e) => setPost({...post, body: e.target.value})} 
          />
          {/* // Неуправляемый компонент (юз реф)
          <MyInput 
            ref = {bodyInputRef}
            type ="text" 
            placeholder = "Post Description"
           /> */}
          <MyButton onClick={addNewPost}> Create a Post </MyButton>
        </form>
    )
}
export default PostForm;