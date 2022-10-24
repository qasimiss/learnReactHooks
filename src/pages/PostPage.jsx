import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/UI/Loader/Loader";
import { useFetching } from "../hooks/useFetching";
import PostService from "../API/PostService";

const PostPage = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [fetchPostById, isLoading, error] = useFetching( async () => {
        const responce = await PostService.getById(params.id)
        setPost(responce.data)
    })

    const [fetchComments, isCommentsLoading, comentsError] = useFetching( async () => {
        const responce = await PostService.getCommentsByPostId(params.id)
        setComments(responce.data)
    })

    useEffect( ()=> {
        fetchPostById()
        fetchComments()
    }, [])
    return(
        <div> 
            <h1> You opened page post with ID {params.id}</h1>
            {isLoading 
                ? <Loader />
                : <div>{post.id}. {post.title}</div>
            }
            <h1>
                Comments
            </h1>
            {isCommentsLoading
                ? <Loader />
                : <div>
                    {comments.map((comm, index) => 
                        <div key = {index + 1} style ={{marginTop: "20px"}}>
                            <h5>{comm.email}</h5>
                            <div>{comm.body}</div>
                        </div>
                    )}
                </div>
            
            }
        </div>
    )
}
export default PostPage;