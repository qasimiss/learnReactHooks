import axios from "axios"

export default class PostService {
    static async getAll(limit = 10, page = 1) {
        const responce = await axios.get("https://jsonplaceholder.typicode.com/posts", { 
            params: {
                _limit: limit,
                _page: page
            }
        })
        return responce
        // try {
            // const responce = await axios.get("https://jsonplaceholder.typicode.com/posts")
            // return responce.data
        // } catch(e) {
        //     console.log(e)
        // }
        
    }
}