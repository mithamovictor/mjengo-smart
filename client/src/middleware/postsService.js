import axios from "axios";
import { AuthHeader } from "./authHeader";

const headers = AuthHeader();

class PostsService {
  createPost(title, content, author) {
    return axios.post(
      '/api/createPost',
      { title, content, author },
      { headers }
    )
  }

  getAllPosts() {
    return axios.get('/api/getAllPosts', { headers })
  }

  getPost(id) {
    return axios.get(`/api/getPost/${id}`, { headers })
  }

  updatePost(id, updateItems) {
    return axios.put(
      `/api/updatePost/${id}`,
      updateItems,
      { headers }
    )
  }

  deletePost(id) {
    return axios.delete(`/api/deletePost/${id}`, {}, {headers})
  }
}


export default new PostsService();
