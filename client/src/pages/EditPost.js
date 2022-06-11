import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ImSpinner9 } from 'react-icons/im';
import PostsService from '../middleware/postsService';
import { ToastRunner } from '../middleware/toastHandler';

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ title: false, content: false });
  const navigate = useNavigate();
  const postId = useParams().id;

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch(name) {
      case 'title':
        errors.title && setErrors(state=>({ ...state, title: false }));
        return setTitle(value);
      case 'content':
        errors.content && setErrors(state=>({ ...state, content: false }));
        return setContent(value);
      default:
        return;
    }
  }

  const handleSubmit = () => {
    setLoading(true);
    if (title.length > 0 && content.length > 0 && !errors.title && !errors.content) {
      PostsService.updatePost(postId, { title, content })
        .then(res=>{
          ToastRunner('success', res.data.message);
          setLoading(false);
          setTimeout(()=>navigate(`/post/${res.data.post.id}`), 3000);
          return;
        }).catch(error=>{
          const err = (error?.response && error?.response?.data && error?.response?.data?.message ) || error?.message || error.toString()
          ToastRunner('error', err);
          setLoading(false);
          return;
        });
    } else {
      (title.length <= 0) && setErrors(state =>({ ...state, title: true }));
      (content.length <= 0) && setErrors(state =>({ ...state, content: true }));
      setLoading(false);
    }
  }

  useEffect(()=>{
    PostsService.getPost(postId)
      .then(res=>{
        setTitle(res.data.title)
        setContent(res.data.content)
      }).catch(err=>console.error(err))
  }, [postId, setTitle, setContent])

  return (
    <>
      <h2 className="text-3xl mt-8 mb-4">Edit Post</h2>
      <form className="flex flex-col w-full rounded-lg bg-white shadow-lg p-4">
        <div className="flex flex-col w-full mb-4">
          <label htmlFor="title">Title</label>
          <input className="text-base text-gray-700 p-2 border-2 border-white bg-gray-100 rounded-md focus:border-gray-300 focus:outline-none" type="text" name="title" id="title" value={title} onChange={handleChange} />
        </div>
        <div className="flex flex-col w-full mb-4">
          <label htmlFor="content">Content</label>
          <textarea className="text-base text-gray-700 p-2 border-2 border-white bg-gray-100 rounded-md focus:border-gray-300 focus:outline-none" type="text" name="content" id="content" rows="20" value={content} onChange={handleChange} />
        </div>
        <button type="button" onClick={handleSubmit} className="bg-slate-900 text-white p-3 w-32 text-center rounded-md shadow-lg mr-4">
          {loading
            ? <span className="flex justify-center items-center text-slate-300">
                <ImSpinner9 className="animate-spin mr-4" />Saving...
              </span>
            : <span className="text-slate-300">Save</span>
          }
        </button>
      </form>
    </>
  )
}

export default EditPost;
