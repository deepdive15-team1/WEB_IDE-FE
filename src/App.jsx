import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from './stores/useAuthStore';
import AuthPage from './pages/AuthPage';
import PostCreate from './pages/PostCreate';
import PostDetail from './pages/PostDetail';
import PostList from './pages/PostList';

import './App.css';
import PasswordResetVerifyPage from './components/auth/accountrecovery/PasswordResetVerifyPage';
import PasswordResetFormPage from './components/auth/accountrecovery/PasswordResetFormPage';
import MyPage from './pages/MyPage';

function App() {
  const { Logout, user } = useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if(!token && user) {
      Logout();
    }
  }, [user, Logout]);

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />  
      <Route path="/post-create" element={<PostCreate />} />
      <Route path="/post-detail/me/:postId" element={<PostDetail isMypost={true}/>} />
      <Route path="/post-detail/:postId" element={<PostDetail isMypost={false}/>} />
      <Route path="/post-list" element={<PostList />} />
      <Route path="/reset-password" element={<PasswordResetVerifyPage />} />
      <Route path="/reset-password/update" element={<PasswordResetFormPage />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  )
}

export default App
