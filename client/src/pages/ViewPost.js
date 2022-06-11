import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Moment from 'react-moment';

import PostsService from '../middleware/postsService';
import { useStateContext } from '../context/ContextProvider';
import { ToastRunner } from '../middleware/toastHandler';


const ViewPost = () => {
  const navigate = useNavigate();
  const { hasToken } = useStateContext();
  const { id } = useParams();
  const [post, setPost] = useState({});

  const deletePost = () => {
    PostsService.deletePost(id)
      .then(res=>{
        ToastRunner('warning', res.data.message);
        setTimeout(()=>navigate('/blog'), 3500);
      })
  }

  useEffect(()=>{
    PostsService.getPost(id)
      .then(post=>{
        setPost(post.data);
      }).catch(err=>console.error(err))
  }, [setPost])

  return (
    <>
      <h2 className="text-3xl font-semibold text-slate-900 mt-8 mb-2">{post.title}</h2>
      <p className="text-sm font-semibold text-slate-600 mb-4">Posted on: <Moment format="DD MMM Y H:m">{post.createdAt}</Moment></p>
      {hasToken && (
        <div className="flex flex-row w-full mb-4">
          <Link className="bg-blue-600 text-white p-4 w-32 text-center rounded-md shadow-lg mr-4" to="/create-post">Add New</Link>
          <Link className="bg-green-600 text-white p-4 w-32 text-center rounded-md shadow-lg mr-4" to={`/edit-post/${id}`}>Edit</Link>
          <button className="bg-red-800 text-white p-4 w-32 text-center rounded-md shadow-lg mr-4" onClick={deletePost}>Delete</button>
        </div>
      )}
      <p>{post.content}</p>
    </>
  )
}

export default ViewPost
