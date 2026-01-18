import { Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import PostCreate from './pages/PostCreate';
import PostDetail from './pages/PostDetail';
// import PostList from './pages/PostList';

import './App.css';
import PasswordResetVerifyPage from './components/auth/accountrecovery/PasswordResetVerifyPage';
import PasswordResetFormPage from './components/auth/accountrecovery/PasswordResetFormPage';
import MyPage from './pages/MyPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />  
      <Route path="/post-create" element={<PostCreate />} />
      <Route path="/post-detail" element={<PostDetail />} />
      {/* <Route path="/post-detail/:postId" element={<PostDetail />} /> */}
      {/* <Route path="/post-list" element={<PostList />} /> */}
      <Route path="/reset-password" element={<PasswordResetVerifyPage />} />
      <Route path="/reset-password/update" element={<PasswordResetFormPage />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  )
}

export default App
