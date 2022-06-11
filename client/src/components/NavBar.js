import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex flex-col w-full max-w-200">
      <Link to="/posts" className={({ isActive }) => isActive ? 'bg-slate-900 text-white py-2 px-6 border-0 border-b border-slate-200' : 'text-slate-900 py-2 px-6 border-0 border-b border-slate-200'} >AllPosts</Link>
      <Link to={'/create-post'} className={({ isActive }) => isActive ? 'bg-slate-900 text-white py-2 px-6 border-0 border-b border-slate-200' : 'text-slate-900 py-2 px-6 border-0 border-b border-slate-200'} >Create Post</Link>
    </nav>
  )
}

export default Navbar;
