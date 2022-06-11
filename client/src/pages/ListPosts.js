import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useStateContext } from '../context/ContextProvider';
import PostsService from "../middleware/postsService";
import { ToastRunner } from "../middleware/toastHandler";

const PostItem = (props) => {
  const navigate = useNavigate();
  const { hasToken } = useStateContext();
  const { id, title, content } = props.post;
  const summary = content.slice(0, 100) + "..."

  const deletePost = () => {
    PostsService.deletePost(id)
      .then(res=>{
        ToastRunner('warning', res.data.message);
        setTimeout(()=>navigate('/blog'), 3500);
      })
  }

  return (
    <div className="flex flex-col bg-white rounded-md shadow-sm p-4">
      <h3 className="text-2xl text-slate-900 font-semibold mb-4">{title}</h3>
      <p className="text-slate-700 mb-4 flex-grow">{summary}</p>
      <div className="flex justify-between">
        <Link className="text-blue-600 mr-4" to={`/post/${id}`}>Read More...</Link>
        {hasToken && (
          <div>
            <Link className="text-green-600" to={`/edit/${id}`}>Edit</Link>
            <button type="button" className="text-red-800 ml-4" onClick={deletePost} >Delete</button>
          </div>
        )}
      </div>
    </div>
  )
}

const PostItems = (props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {props.posts.map((post,idx)=><PostItem key={idx} post={post} />)}
    </div>
  )
}

const ListPosts = () => {
  const { hasToken } = useStateContext();
  const [posts, setPosts] = useState([])

  useEffect(() => {
    setInterval(()=>(PostsService.getAllPosts()
        .then(posts=>setPosts(posts.data))
        .catch(err=>console.error(err))
      ), 1000)

    return ()=>clearInterval(()=>(PostsService.getAllPosts()
        .then(posts=>setPosts(posts.data))
        .catch(err=>console.error(err))
      ), 1000);
  }, [setPosts]);

  return (
    <>
      <h2 className="text-3xl mt-8 mb-4">Blog</h2>
      {hasToken && (
        <div className="flex flex-row w-full mb-4">
          <Link className="bg-green-900 text-white shadow-lg rounded-md p-4" to="/create-post">Add New Post</Link>
        </div>
      )}
      <PostItems posts={posts} />
    </>
  )
}

export default ListPosts;
