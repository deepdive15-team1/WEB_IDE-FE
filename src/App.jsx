import { Routes, Route } from 'react-router-dom';
import Post from './pages/Post';
import AuthPage from './pages/AuthPage';
import PostCreate from './pages/PostCreate';
import PostDetail from './pages/PostDetail';

import './App.css';

function App() {
  return (
    <Routes>
      {/* path="/"에 대한 element={}를 회원가입,로그인 부분으로 바꿔주세요  */}
      <Route path="/" element={<AuthPage />} />  
      <Route path="/post" element={<Post />} />
      <Route path="/post-create" element={<PostCreate />} />
      <Route path="/post-detail" element={<PostDetail />} />
    </Routes>
  )
}

export default App
